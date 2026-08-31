import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { SolicitudInversionHelpersService, REGLA_POR_ETAPA } from './solicitud-inversion-helpers.service';
import { CrearSolicitudInversionDto } from './dto/crear-solicitud-inversion.dto';
import { RechazarSolicitudDto, AprobarSolicitudDto } from './dto/cambiar-estado-solicitud.dto';
import { ActualizarPartesInteresadasDto } from './dto/actualizar-partes-interesadas.dto';
import { CancelarSolicitudDto } from './dto/cancelar-solicitud.dto';

// 🔁 La máquina de estados de Solicitud de Inversión: crear, enviar a revisión,
// aprobar/rechazar en cada etapa, cancelar, y editar un borrador. Todo lo que
// SOLO LEE datos (sin cambiar nada) vive en SolicitudInversionConsultaService;
// los helpers compartidos (validar permisos, resolver proceso+compañía) viven
// en SolicitudInversionHelpersService, inyectado aquí abajo.
@Injectable()
export class SolicitudInversionService {
  private readonly logger = new Logger(SolicitudInversionService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly permisos: PermisosService,
    private readonly notificaciones: NotificacionesService,
    private readonly helpers: SolicitudInversionHelpersService,
  ) {}

  async crear(usuarioId: number, dto: CrearSolicitudInversionDto) {
    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: dto.proyecto_id, eliminado_el: null } });
    if (!proyecto) throw new NotFoundException('El proyecto no existe.');

    // 🛡️ Solo el PM dueño de este proyecto (o un Administrador) puede crear su
    // Solicitud de Inversión — antes cualquier PM de la compañía podía crearla
    // en un proyecto ajeno con solo adivinar el ID (mismo bug que encontraste en
    // Control de Cambios).
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esAdmin && proyecto.creado_por !== usuarioId) {
      throw new ForbiddenException('Solo el PM dueño de este proyecto (o un Administrador) puede crear su Solicitud de Inversión.');
    }

    const procesoExistente = await this.prisma.procesos.findFirst({
      where: {
        proyecto_id: dto.proyecto_id,
        tipo_proceso: 'SOLICITUD_INVERSION',
        eliminado_el: null,
      },
    });

    if (procesoExistente) {
      throw new BadRequestException(
        `El proyecto ${dto.proyecto_id} ya cuenta con una Solicitud de Inversión (Proceso ID: ${procesoExistente.id}).`,
      );
    }

    // Validaciones condicionales según clasificación (Tradicional, Nueva, o ambas)
    const { tipoClasificacion } = await this.helpers.validarClasificacion(this.prisma, dto);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const proceso = await tx.procesos.create({
          data: { proyecto_id: dto.proyecto_id, tipo_proceso: 'SOLICITUD_INVERSION', estado_actual: 'BORRADOR' },
        });

        const solicitud = await tx.solicitudes_inversion.create({
          data: {
            proceso_id: proceso.id,
            tipo_clasificacion: tipoClasificacion,
            subprograma_id: dto.incluye_tradicional ? dto.subprograma_id : null,
            categoria_id: dto.incluye_nueva ? dto.categoria_id : null,
            entregable_planeado: dto.entregable_planeado,
            tiene_evaluacion_financiera: dto.tiene_evaluacion_financiera,
            trm: dto.trm,
            justificacion_sin_evaluacion: dto.tiene_evaluacion_financiera ? null : dto.justificacion_sin_evaluacion,
            responsable_pm_id: usuarioId,
            link_acta_aprobacion: dto.link_acta_aprobacion,
            link_plan_proyecto: dto.link_plan_proyecto,
            link_presentacion_puertas_3: dto.link_presentacion_puertas_3,
          },
        });

        if (dto.tiene_evaluacion_financiera && dto.evaluacion_financiera) {
          await tx.solicitud_evaluacion_financiera.create({
            data: { ...dto.evaluacion_financiera, solicitud_id: solicitud.id },
          });
        }
        if (dto.metas?.length) {
          await tx.solicitud_metas.createMany({
            data: dto.metas.map((m) => ({ ...m, fecha_inicio: new Date(m.fecha_inicio), solicitud_id: solicitud.id })),
          });
        }
        if (dto.flujos_caja?.length) {
          await tx.solicitud_flujo_caja.createMany({
            data: dto.flujos_caja.map((f) => ({ ...f, solicitud_id: solicitud.id })),
          });
          // 🧮 "Valor Total del Proyecto" se calcula solo, sumando el flujo de caja.
          await tx.solicitud_valores.createMany({
            data: this.helpers
              .calcularValoresDesdeFlujo(dto.flujos_caja)
              .map((v) => ({ ...v, solicitud_id: solicitud.id })),
          });
        }
        if (dto.partes_interesadas_ids?.length) {
          await tx.asignaciones_proceso.createMany({
            data: dto.partes_interesadas_ids.map((piId) => ({
              proceso_id: proceso.id,
              etapa: 'VERIFICACION_PARTES_INTERESADAS',
              usuario_id: piId,
              estado_asignacion: 'PENDIENTE',
            })),
          });
        }
        return { proceso_id: proceso.id, estado_actual: proceso.estado_actual, mensaje: 'Solicitud guardada en BORRADOR.' };
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Este proyecto ya tiene una Solicitud de Inversión activa.');
      }
      this.logger.error('Error guardando la solicitud', error.stack);
      throw new InternalServerErrorException('Error al guardar la solicitud en la base de datos.');
    }
  }

  async enviarARevision(procesoId: number, usuarioId: number) {
    const { proceso, proyecto, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);
    if (proceso.tipo_proceso !== 'SOLICITUD_INVERSION') throw new NotFoundException('Proceso no válido.');
    if (proceso.estado_actual !== 'BORRADOR') throw new BadRequestException('Solo enviar solicitudes en estado BORRADOR.');

    const solicitud = proceso.solicitudes_inversion;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);

    if (solicitud?.responsable_pm_id !== usuarioId && !esAdmin) {
      throw new BadRequestException('Solo el PM responsable puede enviar esta solicitud.');
    }

    const estadoDestino = 'PENDIENTE_PMO';

    const resultado = await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.procesos.updateMany({
        where: { id: procesoId, estado_actual: 'BORRADOR' },
        data: { estado_actual: estadoDestino },
      });
      if (count === 0) throw new BadRequestException('La solicitud ya cambió de estado. Refresca la pantalla.');

      await tx.historico_aprobaciones.create({
        data: { proceso_id: procesoId, etapa_origen: 'BORRADOR', etapa_destino: estadoDestino, accion: 'ENVIADO', usuario_id: usuarioId },
      });
      return { procesoId, estado_actual: estadoDestino, mensaje: 'Enviada a revisión PMO.' };
    });

    try {
      const destinatariosPmo = await this.helpers.obtenerEmailsPorRol(['PMO', 'ADMIN'], companiaId);
      if (destinatariosPmo.length) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'NUEVA_SOLICITUD',
          destinatarios: destinatariosPmo,
          datos: {
            nombreUsuario: 'Equipo PMO',
            etapaActual: 'Pendiente Revisión PMO',
            codigoProyecto: proyecto.id.toString(),
            nombreProyecto: proyecto.nombre,
            nombrePM: solicitud?.usuarios?.nombre || 'Project Manager',
          },
        });
      }
    } catch (error) {
      this.logger.error('Error al notificar (enviarARevision)', error);
    }

    return resultado;
  }

  async aprobarEtapa(procesoId: number, usuarioId: number, dto: AprobarSolicitudDto) {
    const { proceso, proyecto, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);
    const estadoOrigen = proceso.estado_actual;

    await this.helpers.validarPermisoParaEtapa(usuarioId, procesoId, companiaId, estadoOrigen);

    let estadoDestino = '';
    let gerenteElegidoId: number | undefined;

    switch (estadoOrigen) {
      case 'PENDIENTE_PMO':
        estadoDestino = 'VERIFICACION_PARTES_INTERESADAS';
        break;
      case 'VERIFICACION_PARTES_INTERESADAS':
        break;
      case 'DIRECCION_PMO':
        if (!dto.gerente_id) {
          throw new BadRequestException('Debes elegir a qué gerente enviar el proceso (hay varias gerencias).');
        }
        {
          const gerenteValido = await this.permisos.tieneRolParaCompania(dto.gerente_id, ['GERENCIA'], companiaId);
          if (!gerenteValido) {
            throw new BadRequestException('El usuario seleccionado no tiene el rol GERENCIA en esta compañía.');
          }
        }
        gerenteElegidoId = dto.gerente_id;
        estadoDestino = 'GERENCIA';
        break;
      case 'GERENCIA':
        if (dto.enviar_a_presidencia === undefined) {
          throw new BadRequestException(
            'Debes indicar si el proceso continúa a Presidencia (enviar_a_presidencia: true) o si finaliza aquí (false).',
          );
        }
        estadoDestino = dto.enviar_a_presidencia ? 'PRESIDENCIA' : 'APROBADO_FINAL';
        break;
      case 'PRESIDENCIA':
        estadoDestino = 'APROBADO_FINAL';
        break;
      default:
        throw new BadRequestException(`No se puede aprobar una solicitud en estado "${estadoOrigen}".`);
    }

    const resultado = await this.prisma.$transaction(async (tx) => {
      if (estadoOrigen === 'VERIFICACION_PARTES_INTERESADAS') {
        const res = await tx.asignaciones_proceso.updateMany({
          where: {
            proceso_id: procesoId,
            etapa: estadoOrigen,
            usuario_id: usuarioId,
            estado_asignacion: 'PENDIENTE',
          },
          data: { estado_asignacion: 'RESUELTA', fecha_resolucion: new Date() },
        });

        if (res.count === 0) {
          throw new BadRequestException('No tienes una asignación pendiente para aprobar en esta etapa.');
        }

        const pendientes = await tx.asignaciones_proceso.count({
          where: {
            proceso_id: procesoId,
            etapa: estadoOrigen,
            estado_asignacion: 'PENDIENTE',
          },
        });

        await tx.historico_aprobaciones.create({
          data: {
            proceso_id: procesoId,
            etapa_origen: estadoOrigen,
            etapa_destino: pendientes === 0 ? 'DIRECCION_PMO' : estadoOrigen,
            accion: pendientes === 0 ? 'APROBADO' : 'APROBADO_PARCIAL',
            observaciones: dto.comentarios,
            usuario_id: usuarioId,
          },
        });

        if (pendientes > 0) {
          return {
            procesoId,
            estado_anterior: estadoOrigen,
            estado_actual: estadoOrigen,
            mensaje: `Aprobación registrada correctamente. Faltan ${pendientes} parte(s) interesada(s) por verificar.`,
          };
        }

        estadoDestino = 'DIRECCION_PMO';
        const { count } = await tx.procesos.updateMany({
          where: { id: procesoId, estado_actual: estadoOrigen },
          data: { estado_actual: estadoDestino },
        });
        if (count === 0) {
          throw new BadRequestException('El proceso fue modificado por otro usuario. Refresca la pantalla.');
        }

        return {
          procesoId,
          estado_anterior: estadoOrigen,
          estado_actual: estadoDestino,
          mensaje: 'Todas las partes interesadas han verificado. El proceso avanza a Dirección PMO.',
        };
      }

      const { count } = await tx.procesos.updateMany({
        where: { id: procesoId, estado_actual: estadoOrigen },
        data: { estado_actual: estadoDestino },
      });
      if (count === 0) {
        throw new BadRequestException('El proceso fue modificado por otro usuario. Refresca la pantalla.');
      }

      // 🔁 Si el proceso está ENTRANDO a Verificación de Partes Interesadas, reiniciamos
      // todas sus asignaciones a PENDIENTE — sin importar si venían de RESUELTA (ya
      // habían aprobado una versión anterior) o CANCELADA (habían rechazado antes).
      // Así se les vuelve a pedir verificar la versión actual de la solicitud.
      if (estadoDestino === 'VERIFICACION_PARTES_INTERESADAS') {
        await tx.asignaciones_proceso.updateMany({
          where: { proceso_id: procesoId, etapa: 'VERIFICACION_PARTES_INTERESADAS' },
          data: { estado_asignacion: 'PENDIENTE', fecha_resolucion: null },
        });
      }

      // 👤 Dirección PMO acaba de elegir a un gerente puntual: le creamos su
      // asignación individual pendiente en la nueva etapa GERENCIA.
      if (estadoDestino === 'GERENCIA' && gerenteElegidoId) {
        await tx.asignaciones_proceso.deleteMany({ where: { proceso_id: procesoId, etapa: 'GERENCIA' } });
        await tx.asignaciones_proceso.create({
          data: { proceso_id: procesoId, etapa: 'GERENCIA', usuario_id: gerenteElegidoId, estado_asignacion: 'PENDIENTE' },
        });
      }

      // ✅ Si la etapa que se acaba de aprobar era de asignación individual
      // (hoy, GERENCIA), marcamos esa asignación puntual como resuelta.
      if (REGLA_POR_ETAPA[estadoOrigen]?.tipo === 'ASIGNACION_INDIVIDUAL') {
        await tx.asignaciones_proceso.updateMany({
          where: { proceso_id: procesoId, etapa: estadoOrigen, usuario_id: usuarioId, estado_asignacion: 'PENDIENTE' },
          data: { estado_asignacion: 'RESUELTA', fecha_resolucion: new Date() },
        });
      }

      await tx.historico_aprobaciones.create({
        data: {
          proceso_id: procesoId,
          etapa_origen: estadoOrigen,
          etapa_destino: estadoDestino,
          accion: 'APROBADO',
          observaciones: dto.comentarios,
          usuario_id: usuarioId,
        },
      });

      // 🆕 Cuando la Solicitud de Inversión llega a APROBADO_FINAL, se habilita
      // automáticamente el panel de Órdenes Internas (se crea el "grupo"
      // contenedor, todavía sin nombre — lo pone Control Gestión después).
      if (estadoDestino === 'APROBADO_FINAL') {
        await tx.grupos_ordenes_internas.upsert({
          where: { proyecto_id: proyecto.id },
          update: {},
          create: { proyecto_id: proyecto.id },
        });
      }

      return {
        procesoId,
        estado_anterior: estadoOrigen,
        estado_actual: estadoDestino,
        mensaje: 'Aprobado exitosamente.',
      };
    });

    try {
      const pmEmail = proceso.solicitudes_inversion?.usuarios?.email;
      const usuarioAprobador = await this.prisma.usuarios.findUnique({
        where: { id: usuarioId },
        select: { nombre: true },
      });

      // 1) El PM SIEMPRE se entera de cómo va su propio proceso
      if (pmEmail) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'SOLICITUD_APROBADA',
          destinatarios: [pmEmail],
          datos: {
            nombrePM: proceso.solicitudes_inversion?.usuarios?.nombre,
            codigoProyecto: proyecto.id.toString(),
            nombreProyecto: proyecto.nombre,
            nuevoEstado: resultado.estado_actual,
            nombreAprobador: usuarioAprobador?.nombre || 'Parte Interesada / Aprobador',
          },
        });
      }

      // 2) Y a quien le toca actuar AHORA (la etapa nueva) se le avisa que ya
      // tiene algo pendiente — reutilizamos REGLA_POR_ETAPA, la misma fuente
      // de verdad que ya usa el sistema para decidir "quién puede aprobar aquí".
      const nuevoEstado = resultado.estado_actual;

            if (nuevoEstado === 'VERIFICACION_PARTES_INTERESADAS') {
        const asignadosPartes = await this.helpers.obtenerAsignados(procesoId, 'VERIFICACION_PARTES_INTERESADAS');
        for (const asignado of asignadosPartes) {
          await this.notificaciones.encolarNotificacion({
            tipo: 'NUEVA_SOLICITUD',
            destinatarios: [asignado.email],
            datos: {
              nombreUsuario: asignado.nombre,
              etapaActual: 'Verificación de Partes Interesadas',
              codigoProyecto: proyecto.id.toString(),
              nombreProyecto: proyecto.nombre,
              nombrePM: proceso.solicitudes_inversion?.usuarios?.nombre || 'Project Manager',
            },
          });
        }
      } else if (nuevoEstado === 'GERENCIA') {
        const asignadosGerencia = await this.helpers.obtenerAsignados(procesoId, 'GERENCIA');
        for (const asignado of asignadosGerencia) {
          await this.notificaciones.encolarNotificacion({
            tipo: 'NUEVA_SOLICITUD',
            destinatarios: [asignado.email],
            datos: {
              nombreUsuario: asignado.nombre,
              etapaActual: 'Gerencia',
              codigoProyecto: proyecto.id.toString(),
              nombreProyecto: proyecto.nombre,
              nombrePM: proceso.solicitudes_inversion?.usuarios?.nombre || 'Project Manager',
            },
          });
        }
      } else if (REGLA_POR_ETAPA[nuevoEstado]?.roles) {
        const destinatariosSiguiente = await this.helpers.obtenerEmailsPorRol(REGLA_POR_ETAPA[nuevoEstado].roles!, companiaId);
        if (destinatariosSiguiente.length) {
          await this.notificaciones.encolarNotificacion({
            tipo: 'NUEVA_SOLICITUD',
            destinatarios: destinatariosSiguiente,
            datos: {
              nombreUsuario: 'Equipo responsable',
              etapaActual: nuevoEstado.replace(/_/g, ' '),
              codigoProyecto: proyecto.id.toString(),
              nombreProyecto: proyecto.nombre,
              nombrePM: proceso.solicitudes_inversion?.usuarios?.nombre || 'Project Manager',
            },
          });
        }
      }
      // Si nuevoEstado es APROBADO_FINAL, no hay "siguiente" a quien avisar — correcto, se queda solo con el aviso al PM.
    } catch (error) {
      this.logger.error('Error al notificar (aprobarEtapa)', error);
    }

    return resultado;
  }

  async rechazarEtapa(procesoId: number, usuarioId: number, dto: RechazarSolicitudDto) {
    const { proceso, proyecto, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);
    if (proceso.estado_actual === 'BORRADOR' || proceso.estado_actual === 'APROBADO_FINAL') {
      throw new BadRequestException('No se puede rechazar en este estado.');
    }

    const estadoOrigen = proceso.estado_actual;
    await this.helpers.validarPermisoParaEtapa(usuarioId, procesoId, companiaId, estadoOrigen);
    const estadoDestino = 'BORRADOR';

    const resultado = await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.procesos.updateMany({
        where: { id: procesoId, estado_actual: estadoOrigen },
        data: { estado_actual: estadoDestino },
      });
      if (count === 0) throw new BadRequestException('El proceso fue modificado. Refresca la pantalla.');

      if (REGLA_POR_ETAPA[estadoOrigen]?.tipo === 'ASIGNACION_INDIVIDUAL') {
        await tx.asignaciones_proceso.updateMany({
          where: { proceso_id: procesoId, etapa: estadoOrigen, estado_asignacion: 'PENDIENTE' },
          data: { estado_asignacion: 'CANCELADA', fecha_resolucion: new Date() },
        });
      }

      // 🆕 Sin importar en qué etapa se rechazó, al volver a BORRADOR reiniciamos
      // TODAS las asignaciones de Verificación de Partes Interesadas a PENDIENTE.
      // Así, apenas el proceso vuelve a BORRADOR, ya no quedan mostrando "Resuelta"
      // de una vuelta anterior — no hace falta esperar a que se reenvíe.
      await tx.asignaciones_proceso.updateMany({
        where: { proceso_id: procesoId, etapa: 'VERIFICACION_PARTES_INTERESADAS' },
        data: { estado_asignacion: 'PENDIENTE', fecha_resolucion: null },
      });

      await tx.historico_aprobaciones.create({
        data: {
          proceso_id: procesoId,
          etapa_origen: estadoOrigen,
          etapa_destino: estadoDestino,
          accion: 'RECHAZADO',
          razon_rechazo: dto.razon_rechazo,
          usuario_id: usuarioId,
        },
      });

      return { procesoId, estado_anterior: estadoOrigen, estado_actual: estadoDestino, mensaje: 'Rechazado y devuelto a BORRADOR.' };
    });

    try {
      const pmEmail = proceso.solicitudes_inversion?.usuarios?.email;
      const usuarioRechazador = await this.prisma.usuarios.findUnique({ where: { id: usuarioId }, select: { nombre: true } });

      // El PM y el PMO/ADMIN de la compañía se enteran juntos del rechazo
      const destinatariosPmo = await this.helpers.obtenerEmailsPorRol(['PMO', 'ADMIN'], companiaId);
      const destinatarios = Array.from(new Set([...(pmEmail ? [pmEmail] : []), ...destinatariosPmo]));

      if (destinatarios.length) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'SOLICITUD_RECHAZADA',
          destinatarios,
          datos: {
            nombrePM: proceso.solicitudes_inversion?.usuarios?.nombre,
            codigoProyecto: proyecto.id.toString(),
            nombreProyecto: proyecto.nombre,
            nombreRechazador: usuarioRechazador?.nombre || 'Revisor',
            razonRechazo: dto.razon_rechazo,
          },
        });
      }
    } catch (error) {
      this.logger.error('Error al notificar (rechazarEtapa)', error);
    }

    return resultado;
  }

  async cancelarDefinitivamente(procesoId: number, usuarioId: number, dto: CancelarSolicitudDto) {
    const { proceso, proyecto, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);
    const estadoOrigen = proceso.estado_actual;

    if (['BORRADOR', 'APROBADO_FINAL', 'CANCELADO'].includes(estadoOrigen)) {
      throw new BadRequestException(`No se puede cancelar una solicitud en estado "${estadoOrigen}".`);
    }

    await this.permisos.exigirRolParaCompania(usuarioId, ['PMO', 'DIRECTOR_PMO', 'ADMIN'], companiaId);

    const estadoDestino = 'CANCELADO';

    const resultado = await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.procesos.updateMany({
        where: { id: procesoId, estado_actual: estadoOrigen },
        data: { estado_actual: estadoDestino },
      });
      if (count === 0) throw new BadRequestException('El proceso fue modificado por otro usuario. Refresca la pantalla.');

      await tx.asignaciones_proceso.updateMany({
        where: { proceso_id: procesoId, estado_asignacion: 'PENDIENTE' },
        data: { estado_asignacion: 'CANCELADA', fecha_resolucion: new Date() },
      });

      await tx.historico_aprobaciones.create({
        data: {
          proceso_id: procesoId,
          etapa_origen: estadoOrigen,
          etapa_destino: estadoDestino,
          accion: 'CANCELADO',
          razon_rechazo: dto.razon_cancelacion,
          usuario_id: usuarioId,
        },
      });

      return { procesoId, estado_anterior: estadoOrigen, estado_actual: estadoDestino, mensaje: 'Solicitud cancelada definitivamente.' };
    });

    try {
      const pmEmail = proceso.solicitudes_inversion?.usuarios?.email;
      const usuarioQueCancela = await this.prisma.usuarios.findUnique({ where: { id: usuarioId }, select: { nombre: true } });
      if (pmEmail) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'SOLICITUD_RECHAZADA',
          destinatarios: [pmEmail],
          datos: {
            nombrePM: proceso.solicitudes_inversion?.usuarios?.nombre,
            codigoProyecto: proyecto.id.toString(),
            nombreProyecto: proyecto.nombre,
            nombreRechazador: usuarioQueCancela?.nombre || 'Administrador',
            razonRechazo: `[CANCELACIÓN DEFINITIVA] ${dto.razon_cancelacion}`,
          },
        });
      }
    } catch (error) {
      this.logger.error('Error al notificar cancelación', error);
    }

    return resultado;
  }

  async actualizarPartesInteresadas(procesoId: number, usuarioId: number, dto: ActualizarPartesInteresadasDto) {
    const { proceso, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);

    if (!['BORRADOR', 'PENDIENTE_PMO'].includes(proceso.estado_actual)) {
      throw new BadRequestException('Solo se pueden actualizar partes interesadas antes de la etapa de verificación.');
    }

    const esPM = proceso.solicitudes_inversion?.responsable_pm_id === usuarioId;
    const esAdminOrPMO = await this.permisos.tieneRolParaCompania(usuarioId, ['PMO', 'ADMIN'], companiaId);

    if (!esPM && !esAdminOrPMO) {
      throw new ForbiddenException('Solo el PM responsable o un miembro de la PMO pueden modificar las partes interesadas.');
    }

    return await this.prisma.$transaction(async (tx) => {
      await tx.asignaciones_proceso.deleteMany({
        where: { proceso_id: procesoId, etapa: 'VERIFICACION_PARTES_INTERESADAS', estado_asignacion: 'PENDIENTE' },
      });
      await tx.asignaciones_proceso.createMany({
        data: dto.partes_interesadas_ids.map((id: number) => ({
          proceso_id: procesoId,
          etapa: 'VERIFICACION_PARTES_INTERESADAS',
          usuario_id: id,
          estado_asignacion: 'PENDIENTE',
        })),
      });
      return { procesoId, mensaje: 'Partes interesadas actualizadas exitosamente.' };
    });
  }

  async actualizarBorrador(procesoId: number, usuarioId: number, dto: CrearSolicitudInversionDto) {
    const { proceso, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);

    if (proceso.estado_actual !== 'BORRADOR') {
      throw new BadRequestException('Solo se pueden actualizar solicitudes en estado BORRADOR.');
    }

    const solicitud = proceso.solicitudes_inversion;
    if (!solicitud) {
      throw new NotFoundException('No existe la solicitud asociada a este proceso.');
    }

    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    const esPMO = await this.permisos.tieneRolParaCompania(usuarioId, ['PMO'], companiaId);
    if (solicitud.responsable_pm_id !== usuarioId && !esAdmin && !esPMO) {
      throw new ForbiddenException('No tienes permisos para modificar este borrador.');
    }

    // Validaciones condicionales según clasificación (Tradicional, Nueva, o ambas)
    const { tipoClasificacion } = await this.helpers.validarClasificacion(this.prisma, dto);

    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.solicitudes_inversion.update({
          where: { id: solicitud.id },
          data: {
            tipo_clasificacion: tipoClasificacion,
            subprograma_id: dto.incluye_tradicional ? dto.subprograma_id : null,
            categoria_id: dto.incluye_nueva ? dto.categoria_id : null,
            entregable_planeado: dto.entregable_planeado,
            tiene_evaluacion_financiera: dto.tiene_evaluacion_financiera,
            trm: dto.trm,
            justificacion_sin_evaluacion: dto.tiene_evaluacion_financiera ? null : dto.justificacion_sin_evaluacion,
            link_acta_aprobacion: dto.link_acta_aprobacion,
            link_plan_proyecto: dto.link_plan_proyecto,
            link_presentacion_puertas_3: dto.link_presentacion_puertas_3,
          },
        });

        await tx.solicitud_evaluacion_financiera.deleteMany({ where: { solicitud_id: solicitud.id } });
        if (dto.tiene_evaluacion_financiera && dto.evaluacion_financiera) {
          await tx.solicitud_evaluacion_financiera.create({
            data: { ...dto.evaluacion_financiera, solicitud_id: solicitud.id },
          });
        }

        await tx.solicitud_metas.deleteMany({ where: { solicitud_id: solicitud.id } });
        if (dto.metas?.length) {
          await tx.solicitud_metas.createMany({
            data: dto.metas.map((m) => ({ ...m, fecha_inicio: new Date(m.fecha_inicio), solicitud_id: solicitud.id })),
          });
        }

        await tx.solicitud_flujo_caja.deleteMany({ where: { solicitud_id: solicitud.id } });
        await tx.solicitud_valores.deleteMany({ where: { solicitud_id: solicitud.id } });
        if (dto.flujos_caja?.length) {
          await tx.solicitud_flujo_caja.createMany({
            data: dto.flujos_caja.map((f) => ({ ...f, solicitud_id: solicitud.id })),
          });
          // 🧮 "Valor Total del Proyecto" se recalcula solo, sumando el flujo de caja.
          await tx.solicitud_valores.createMany({
            data: this.helpers
              .calcularValoresDesdeFlujo(dto.flujos_caja)
              .map((v) => ({ ...v, solicitud_id: solicitud.id })),
          });
        }

        if (dto.partes_interesadas_ids !== undefined) {
          await tx.asignaciones_proceso.deleteMany({
            where: { proceso_id: procesoId, etapa: 'VERIFICACION_PARTES_INTERESADAS' },
          });

          if (dto.partes_interesadas_ids.length) {
            await tx.asignaciones_proceso.createMany({
              data: dto.partes_interesadas_ids.map((piId) => ({
                proceso_id: procesoId,
                etapa: 'VERIFICACION_PARTES_INTERESADAS',
                usuario_id: piId,
                estado_asignacion: 'PENDIENTE',
              })),
            });
          }
        }

        return { proceso_id: procesoId, mensaje: 'Borrador actualizado exitosamente.' };
      });
    } catch (error) {
      this.logger.error('Error actualizando borrador de la solicitud', error.stack);
      throw new InternalServerErrorException('Error al actualizar el borrador en la base de datos.');
    }
  }
}