import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { ActasCierreHelpersService, REGLA_POR_ETAPA } from './actas-cierre-helpers.service';
import { CrearActaCierreDto } from './dto/crear-acta-cierre.dto';
import { AprobarActaCierreDto, RechazarActaCierreDto } from './dto/cambiar-estado-acta-cierre.dto';
import { ActualizarPartesInteresadasActaCierreDto } from './dto/actualizar-partes-interesadas-acta-cierre.dto';

@Injectable()
export class ActasCierreService {
  private readonly logger = new Logger(ActasCierreService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly permisos: PermisosService,
    private readonly notificaciones: NotificacionesService,
    private readonly helpers: ActasCierreHelpersService,
  ) {}

  // 🔒 SI aprobada, proyecto sin Acta de Cierre previa, y si tiene Órdenes
  // Internas, TODAS deben estar ya cerradas (grupo en estado CERRADO) —
  // si nunca existió ninguna OI, no hay nada que exigir.
  private async validarCreacionPermitida(proyectoId: string) {
    const siAprobada = await this.prisma.procesos.findFirst({
      where: { proyecto_id: proyectoId, tipo_proceso: 'SOLICITUD_INVERSION', estado_actual: 'APROBADO_FINAL', eliminado_el: null },
    });
    if (!siAprobada) {
      throw new BadRequestException('El Acta de Cierre solo se habilita cuando la Solicitud de Inversión del proyecto llegó a Aprobado Final.');
    }

    const actaExistente = await this.prisma.actas_cierre.findUnique({ where: { proyecto_id: proyectoId } });
    if (actaExistente) {
      throw new BadRequestException('Este proyecto ya tiene un Acta de Cierre. Solo se permite una por proyecto.');
    }

    const grupo = await this.prisma.grupos_ordenes_internas.findUnique({
      where: { proyecto_id: proyectoId },
      include: { ordenes_internas: true },
    });
    if (grupo && grupo.ordenes_internas.length > 0 && grupo.estado !== 'CERRADO') {
      throw new BadRequestException(
        'Antes de crear el Acta de Cierre debes solicitar y completar el cierre de todas las Órdenes Internas de este proyecto.',
      );
    }
  }

  // 1️⃣ Crear (BORRADOR)
  async crear(usuarioId: number, dto: CrearActaCierreDto) {
    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: dto.proyecto_id, eliminado_el: null } });
    if (!proyecto) throw new NotFoundException('El proyecto no existe.');

    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esAdmin && proyecto.creado_por !== usuarioId) {
      throw new ForbiddenException('Solo el PM dueño de este proyecto (o un Administrador) puede crear el Acta de Cierre.');
    }

    const tieneRolCG = await this.permisos.tieneAlgunRol(dto.control_gestion_asignado_id, ['CONTROL_GESTION']);
    if (!tieneRolCG) throw new BadRequestException('El usuario seleccionado no tiene el rol Control Gestión.');

    await this.validarCreacionPermitida(dto.proyecto_id);

    return this.prisma.$transaction(async (tx) => {
      const proceso = await tx.procesos.create({
        data: { proyecto_id: dto.proyecto_id, tipo_proceso: 'ACTA_CIERRE', estado_actual: 'BORRADOR' },
      });

      const acta = await tx.actas_cierre.create({
        data: {
          proceso_id: proceso.id,
          proyecto_id: dto.proyecto_id,
          tipo_cierre: dto.tipo_cierre,
          responsable_pm_id: usuarioId,
          control_gestion_asignado_id: dto.control_gestion_asignado_id,
          presentacion_p5_link: dto.presentacion_p5_link,
          entregable_real: dto.entregable_real,
          explicacion_ejecucion: dto.explicacion_ejecucion,
          otros_entregables: dto.otros_entregables,
        },
      });

      await this.guardarSecciones(tx, acta.id, dto);

      return { proceso_id: proceso.id, acta_cierre_id: acta.id, mensaje: 'Acta de Cierre guardada en Borrador.' };
    });
  }

  // ✏️ Editar mientras está en BORRADOR (solo el PM dueño, o ADMIN)
  async actualizarBorrador(procesoId: number, usuarioId: number, dto: CrearActaCierreDto) {
    const { proceso } = await this.helpers.obtenerProcesoConCompania(procesoId);
    if (proceso.estado_actual !== 'BORRADOR') {
      throw new BadRequestException('Solo se puede editar el Acta de Cierre mientras está en Borrador.');
    }

    const acta = proceso.actas_cierre;
    if (!acta) throw new NotFoundException('No existe el Acta de Cierre asociada a este proceso.');

    const esDueno = acta.responsable_pm_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esDueno && !esAdmin) throw new ForbiddenException('No eres el responsable de este Acta de Cierre.');

    if (dto.control_gestion_asignado_id !== acta.control_gestion_asignado_id) {
      const tieneRolCG = await this.permisos.tieneAlgunRol(dto.control_gestion_asignado_id, ['CONTROL_GESTION']);
      if (!tieneRolCG) throw new BadRequestException('El usuario seleccionado no tiene el rol Control Gestión.');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.actas_cierre.update({
        where: { id: acta.id },
        data: {
          tipo_cierre: dto.tipo_cierre,
          control_gestion_asignado_id: dto.control_gestion_asignado_id,
          presentacion_p5_link: dto.presentacion_p5_link,
          entregable_real: dto.entregable_real,
          explicacion_ejecucion: dto.explicacion_ejecucion,
          otros_entregables: dto.otros_entregables,
        },
      });

      await tx.acta_cierre_metas.deleteMany({ where: { acta_cierre_id: acta.id } });
      await tx.acta_cierre_valores.deleteMany({ where: { acta_cierre_id: acta.id } });
      await tx.acta_cierre_flujo_caja.deleteMany({ where: { acta_cierre_id: acta.id } });
      await tx.acta_cierre_entregables.deleteMany({ where: { acta_cierre_id: acta.id } });
      await tx.acta_cierre_oi_valores_reales.deleteMany({ where: { acta_cierre_id: acta.id } });

      await this.guardarSecciones(tx, acta.id, dto);

      return { procesoId, mensaje: 'Acta de Cierre actualizada.' };
    });
  }

  // 🧰 Compartido entre crear() y actualizarBorrador(): guarda las 5 tablas hijas.
  private async guardarSecciones(tx: any, actaCierreId: number, dto: CrearActaCierreDto) {
    if (dto.metas?.length) {
      await tx.acta_cierre_metas.createMany({
        data: dto.metas.map((m) => ({ ...m, acta_cierre_id: actaCierreId })),
      });
    }
    if (dto.valores?.length) {
      await tx.acta_cierre_valores.createMany({
        data: dto.valores.map((v) => ({ ...v, acta_cierre_id: actaCierreId })),
      });
    }
    if (dto.flujo_caja?.length) {
      await tx.acta_cierre_flujo_caja.createMany({
        data: dto.flujo_caja.map((f) => ({ ...f, monto_real: f.monto_real ?? 0, acta_cierre_id: actaCierreId })),
      });
    }
    if (dto.entregables?.length) {
      await tx.acta_cierre_entregables.createMany({
        data: dto.entregables.map((e) => ({ ...e, acta_cierre_id: actaCierreId })),
      });
    }
    if (dto.oi_valores_reales?.length) {
      await tx.acta_cierre_oi_valores_reales.createMany({
        data: dto.oi_valores_reales.map((o) => ({ ...o, acta_cierre_id: actaCierreId })),
      });
    }
  }

  // 2️⃣ Enviar a revisión — BORRADOR -> PENDIENTE_PMO
  async enviarARevision(procesoId: number, usuarioId: number) {
    const { proceso, proyecto, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);
    if (proceso.estado_actual !== 'BORRADOR') {
      throw new BadRequestException('Solo se pueden enviar Actas de Cierre en estado BORRADOR.');
    }

    const acta = proceso.actas_cierre;
    const esDueno = acta?.responsable_pm_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esDueno && !esAdmin) throw new ForbiddenException('No eres el responsable de este Acta de Cierre.');

    const estadoDestino = 'PENDIENTE_PMO';

    const resultado = await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.procesos.updateMany({
        where: { id: procesoId, estado_actual: 'BORRADOR' },
        data: { estado_actual: estadoDestino },
      });
      if (count === 0) throw new BadRequestException('El Acta de Cierre ya cambió de estado. Refresca la pantalla.');

      await tx.historico_aprobaciones.create({
        data: { proceso_id: procesoId, etapa_origen: 'BORRADOR', etapa_destino: estadoDestino, accion: 'ENVIADO', usuario_id: usuarioId },
      });
      return { procesoId, estado_actual: estadoDestino, mensaje: 'Enviado a revisión PMO.' };
    });

    try {
      const destinatariosPmo = await this.helpers.obtenerEmailsPorRol(['PMO', 'ADMIN'], companiaId);
      if (destinatariosPmo.length) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'AC_NUEVA_ETAPA',
          destinatarios: destinatariosPmo,
          datos: {
            nombreUsuario: 'Equipo PMO',
            etapaActual: 'Pendiente Revisión PMO',
            codigoProyecto: proyecto.id.toString(),
            nombreProyecto: proyecto.nombre,
            nombrePM: acta?.pm?.nombre || 'Project Manager',
          },
        });
      }
    } catch (error) {
      this.logger.error('Error al notificar (enviarARevision Acta Cierre)', error);
    }

    return resultado;
  }

  // 3️⃣ Aprobar la etapa actual
  async aprobarEtapa(procesoId: number, usuarioId: number, dto: AprobarActaCierreDto) {
    const { proceso, proyecto, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);
    const estadoOrigen = proceso.estado_actual;

    await this.helpers.validarPermisoParaEtapa(usuarioId, procesoId, companiaId, estadoOrigen);

    let estadoDestino = '';
    let gerenteElegidoId: number | undefined;

    switch (estadoOrigen) {
      case 'PENDIENTE_PMO':
        estadoDestino = 'CONTROL_GESTION';
        break;
      case 'CONTROL_GESTION':
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
        estadoDestino = dto.enviar_a_presidencia ? 'PRESIDENCIA' : 'CERRADO';
        break;
      case 'PRESIDENCIA':
        estadoDestino = 'CERRADO';
        break;
      default:
        throw new BadRequestException(`No se puede aprobar un Acta de Cierre en estado "${estadoOrigen}".`);
    }

    const resultado = await this.prisma.$transaction(async (tx) => {
      if (estadoOrigen === 'VERIFICACION_PARTES_INTERESADAS') {
        const res = await tx.asignaciones_proceso.updateMany({
          where: { proceso_id: procesoId, etapa: estadoOrigen, usuario_id: usuarioId, estado_asignacion: 'PENDIENTE' },
          data: { estado_asignacion: 'RESUELTA', fecha_resolucion: new Date() },
        });

        if (res.count === 0) {
          throw new BadRequestException('No tienes una asignación pendiente para aprobar en esta etapa.');
        }

        const pendientes = await tx.asignaciones_proceso.count({
          where: { proceso_id: procesoId, etapa: estadoOrigen, estado_asignacion: 'PENDIENTE' },
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

      if (estadoDestino === 'CONTROL_GESTION') {
        await tx.asignaciones_proceso.create({
          data: {
            proceso_id: procesoId,
            etapa: 'CONTROL_GESTION',
            usuario_id: proceso.actas_cierre!.control_gestion_asignado_id!,
            estado_asignacion: 'PENDIENTE',
          },
        });
      }

      if (estadoDestino === 'VERIFICACION_PARTES_INTERESADAS') {
        await tx.asignaciones_proceso.updateMany({
          where: { proceso_id: procesoId, etapa: 'VERIFICACION_PARTES_INTERESADAS' },
          data: { estado_asignacion: 'PENDIENTE', fecha_resolucion: null },
        });
      }

      if (estadoDestino === 'GERENCIA' && gerenteElegidoId) {
        await tx.asignaciones_proceso.deleteMany({ where: { proceso_id: procesoId, etapa: 'GERENCIA' } });
        await tx.asignaciones_proceso.create({
          data: { proceso_id: procesoId, etapa: 'GERENCIA', usuario_id: gerenteElegidoId, estado_asignacion: 'PENDIENTE' },
        });
      }

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

      return { procesoId, estado_anterior: estadoOrigen, estado_actual: estadoDestino, mensaje: 'Aprobado exitosamente.' };
    });

    try {
      const pmEmail = proceso.actas_cierre?.pm?.email;
      const usuarioAprobador = await this.prisma.usuarios.findUnique({ where: { id: usuarioId }, select: { nombre: true } });

      if (pmEmail) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'AC_APROBADO',
          destinatarios: [pmEmail],
          datos: {
            nombrePM: proceso.actas_cierre?.pm?.nombre,
            codigoProyecto: proyecto.id.toString(),
            nombreProyecto: proyecto.nombre,
            nuevoEstado: resultado.estado_actual,
            nombreAprobador: usuarioAprobador?.nombre || 'Aprobador',
          },
        });
      }

      const nuevoEstado = resultado.estado_actual;

      if (nuevoEstado === 'CONTROL_GESTION') {
        const cgEmail = proceso.actas_cierre?.control_gestion?.email;
        if (cgEmail) {
          await this.notificaciones.encolarNotificacion({
            tipo: 'AC_NUEVA_ETAPA',
            destinatarios: [cgEmail],
            datos: {
              nombreUsuario: proceso.actas_cierre?.control_gestion?.nombre || 'Control Gestión',
              etapaActual: 'Control Gestión',
              codigoProyecto: proyecto.id.toString(),
              nombreProyecto: proyecto.nombre,
              nombrePM: proceso.actas_cierre?.pm?.nombre || 'Project Manager',
            },
          });
        }
      } else if (nuevoEstado === 'VERIFICACION_PARTES_INTERESADAS') {
        const asignadosPartes = await this.helpers.obtenerAsignados(procesoId, 'VERIFICACION_PARTES_INTERESADAS');
        for (const asignado of asignadosPartes) {
          await this.notificaciones.encolarNotificacion({
            tipo: 'AC_NUEVA_ETAPA',
            destinatarios: [asignado.email],
            datos: {
              nombreUsuario: asignado.nombre,
              etapaActual: 'Verificación de Partes Interesadas',
              codigoProyecto: proyecto.id.toString(),
              nombreProyecto: proyecto.nombre,
              nombrePM: proceso.actas_cierre?.pm?.nombre || 'Project Manager',
            },
          });
        }
      } else if (nuevoEstado === 'GERENCIA') {
        const asignadosGerencia = await this.helpers.obtenerAsignados(procesoId, 'GERENCIA');
        for (const asignado of asignadosGerencia) {
          await this.notificaciones.encolarNotificacion({
            tipo: 'AC_NUEVA_ETAPA',
            destinatarios: [asignado.email],
            datos: {
              nombreUsuario: asignado.nombre,
              etapaActual: 'Gerencia',
              codigoProyecto: proyecto.id.toString(),
              nombreProyecto: proyecto.nombre,
              nombrePM: proceso.actas_cierre?.pm?.nombre || 'Project Manager',
            },
          });
        }
      } else if (REGLA_POR_ETAPA[nuevoEstado]?.roles) {
        const destinatariosSiguiente = await this.helpers.obtenerEmailsPorRol(REGLA_POR_ETAPA[nuevoEstado].roles!, companiaId);
        if (destinatariosSiguiente.length) {
          await this.notificaciones.encolarNotificacion({
            tipo: 'AC_NUEVA_ETAPA',
            destinatarios: destinatariosSiguiente,
            datos: {
              nombreUsuario: 'Equipo responsable',
              etapaActual: nuevoEstado.replace(/_/g, ' '),
              codigoProyecto: proyecto.id.toString(),
              nombreProyecto: proyecto.nombre,
              nombrePM: proceso.actas_cierre?.pm?.nombre || 'Project Manager',
            },
          });
        }
      }
    } catch (error) {
      this.logger.error('Error al notificar (aprobarEtapa Acta Cierre)', error);
    }

    return resultado;
  }

  // ❌ Rechazar la etapa actual — vuelve a BORRADOR
  async rechazarEtapa(procesoId: number, usuarioId: number, dto: RechazarActaCierreDto) {
    const { proceso, proyecto, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);
    if (proceso.estado_actual === 'BORRADOR' || proceso.estado_actual === 'CERRADO') {
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
      const pmEmail = proceso.actas_cierre?.pm?.email;
      const usuarioRechazador = await this.prisma.usuarios.findUnique({ where: { id: usuarioId }, select: { nombre: true } });

      const destinatariosPmo = await this.helpers.obtenerEmailsPorRol(['PMO', 'ADMIN'], companiaId);
      const destinatarios = Array.from(new Set([...(pmEmail ? [pmEmail] : []), ...destinatariosPmo]));

      if (destinatarios.length) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'AC_RECHAZADO',
          destinatarios,
          datos: {
            nombrePM: proceso.actas_cierre?.pm?.nombre,
            codigoProyecto: proyecto.id.toString(),
            nombreProyecto: proyecto.nombre,
            nombreRechazador: usuarioRechazador?.nombre || 'Revisor',
            razonRechazo: dto.razon_rechazo,
          },
        });
      }
    } catch (error) {
      this.logger.error('Error al notificar (rechazarEtapa Acta Cierre)', error);
    }

    return resultado;
  }

  // 🔁 Actualizar partes interesadas (antes de que verifiquen)
  async actualizarPartesInteresadas(procesoId: number, usuarioId: number, dto: ActualizarPartesInteresadasActaCierreDto) {
    const { proceso } = await this.helpers.obtenerProcesoConCompania(procesoId);

    if (!['BORRADOR', 'PENDIENTE_PMO', 'CONTROL_GESTION'].includes(proceso.estado_actual)) {
      throw new BadRequestException('Solo se pueden actualizar partes interesadas antes de la etapa de verificación.');
    }

    const acta = proceso.actas_cierre;
    const esDueno = acta?.responsable_pm_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esDueno && !esAdmin) {
      throw new ForbiddenException('Solo el responsable de este Acta de Cierre o un Administrador pueden modificar las partes interesadas.');
    }

    return this.prisma.$transaction(async (tx) => {
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
}