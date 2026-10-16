import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { ControlCambiosHelpersService, REGLA_POR_ETAPA } from './control-cambios-helpers.service';
import { CrearControlCambioDto } from './dto/crear-control-cambio.dto';
import { AprobarControlCambioDto, RechazarControlCambioDto } from './dto/cambiar-estado-control-cambio.dto';
import { ActualizarPartesInteresadasCcDto } from './dto/actualizar-partes-interesadas-cc.dto';

type ProcesoConCompania = Awaited<ReturnType<ControlCambiosHelpersService['obtenerProcesoConCompania']>>;

@Injectable()
export class ControlCambiosService {
  private readonly logger = new Logger(ControlCambiosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly permisos: PermisosService,
    private readonly notificaciones: NotificacionesService,
    private readonly helpers: ControlCambiosHelpersService,
  ) {}

  private async validarProyectoNoCancelado(proyectoId: string) {
    const procesoCancelado = await this.prisma.procesos.findFirst({
      where: {
        proyecto_id: proyectoId,
        eliminado_el: null,
        OR: [{ estado_actual: 'CANCELADO' }, { tipo_proceso: 'ACTA_CIERRE', estado_actual: 'CERRADO' }],
      },
    });
    if (procesoCancelado) {
      throw new BadRequestException('No se puede avanzar este Control de Cambios: el proyecto está cancelado o su Acta de Cierre ya se cerró.');
    }
  }


  private async validarCreacionPermitida(proyectoId: string) {
    const siAprobada = await this.prisma.procesos.findFirst({
      where: { proyecto_id: proyectoId, tipo_proceso: 'SOLICITUD_INVERSION', estado_actual: 'APROBADO_FINAL', eliminado_el: null },
    });
    if (!siAprobada) {
      throw new BadRequestException('Los Control de Cambios solo se habilitan cuando la Solicitud de Inversión del proyecto llegó a Aprobado Final.');
    }

    const procesoCancelado = await this.prisma.procesos.findFirst({
      where: {
        proyecto_id: proyectoId,
        eliminado_el: null,
        OR: [{ estado_actual: 'CANCELADO' }, { tipo_proceso: 'ACTA_CIERRE', estado_actual: 'CERRADO' }],
      },
    });
    if (procesoCancelado) {
      throw new BadRequestException('No se puede crear un Control de Cambios en un proyecto cancelado o en proceso de cancelación.');
    }

    const grupoOi = await this.prisma.grupos_ordenes_internas.findUnique({ where: { proyecto_id: proyectoId } });
    if (grupoOi?.estado === 'CERRADO') {
      throw new BadRequestException('No se puede crear un Control de Cambios: el grupo de Órdenes Internas de este proyecto ya está cerrado.');
    }
  }

  // Crear (BORRADOR)
  async crear(usuarioId: number, dto: CrearControlCambioDto) {
    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: dto.proyecto_id, eliminado_el: null } });
    if (!proyecto) throw new NotFoundException('El proyecto no existe.');

    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esAdmin && proyecto.creado_por !== usuarioId) {
      throw new ForbiddenException('Solo el PM dueño de este proyecto (o un Administrador) puede crear un Control de Cambios aquí.');
    }

    await this.validarCreacionPermitida(dto.proyecto_id);

    return this.prisma.$transaction(async (tx) => {
      const proceso = await tx.procesos.create({
        data: { proyecto_id: dto.proyecto_id, tipo_proceso: 'CONTROL_CAMBIO', estado_actual: 'BORRADOR' },
      });

      const controlCambio = await tx.controles_cambio.create({
        data: {
          proceso_id: proceso.id,
          proyecto_id: dto.proyecto_id,
          responsable_pm_id: usuarioId,
          requiere_orden_interna: dto.requiere_orden_interna,
          descripcion_cambio: dto.descripcion_cambio,
          antecedentes: dto.antecedentes,
          justificacion: dto.justificacion,
          impacto_alcance: dto.impacto_alcance,
          impacto_tiempo: dto.impacto_tiempo,
          tipo_control_cambio: dto.tipo_control_cambio || 'GENERAL',
          anio_nuevo_propuesto: dto.tipo_control_cambio === 'APLAZAMIENTO' ? dto.anio_nuevo_propuesto : null,
        },
      });

      if (dto.anexos?.length) {
        await tx.control_cambio_anexos.createMany({
          data: dto.anexos.map((a) => ({ ...a, control_cambio_id: controlCambio.id })),
        });
      }

      return { proceso_id: proceso.id, control_cambio_id: controlCambio.id, mensaje: 'Control de Cambios guardado en Borrador.' };
    });
  }

  //Editar mientras está en BORRADOR 
  async actualizarBorrador(procesoId: number, usuarioId: number, dto: CrearControlCambioDto) {
    const { proceso } = await this.helpers.obtenerProcesoConCompania(procesoId);
    if (proceso.estado_actual !== 'BORRADOR') {
      throw new BadRequestException('Solo se puede editar un Control de Cambios mientras está en Borrador.');
    }

    const controlCambio = proceso.controles_cambio;
    if (!controlCambio) throw new NotFoundException('No existe el Control de Cambios asociado a este proceso.');

    const esDueno = controlCambio.responsable_pm_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esDueno && !esAdmin) throw new ForbiddenException('No eres el responsable de este Control de Cambios.');

    return this.prisma.$transaction(async (tx) => {
      await tx.controles_cambio.update({
        where: { id: controlCambio.id },
        data: {
          requiere_orden_interna: dto.requiere_orden_interna,
          descripcion_cambio: dto.descripcion_cambio,
          antecedentes: dto.antecedentes,
          justificacion: dto.justificacion,
          impacto_alcance: dto.impacto_alcance,
          impacto_tiempo: dto.impacto_tiempo,
          tipo_control_cambio: dto.tipo_control_cambio || 'GENERAL',
          anio_nuevo_propuesto: dto.tipo_control_cambio === 'APLAZAMIENTO' ? dto.anio_nuevo_propuesto : null,
        },
      });

      await tx.control_cambio_anexos.deleteMany({ where: { control_cambio_id: controlCambio.id } });
      if (dto.anexos?.length) {
        await tx.control_cambio_anexos.createMany({
          data: dto.anexos.map((a) => ({ ...a, control_cambio_id: controlCambio.id })),
        });
      }

      return { procesoId, mensaje: 'Control de Cambios actualizado.' };
    });
  }

  //Enviar a revisión — BORRADOR -> PENDIENTE_PMO
  async enviarARevision(procesoId: number, usuarioId: number) {
    const { proceso, proyecto, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);
    if (proceso.estado_actual !== 'BORRADOR') {
      throw new BadRequestException('Solo se pueden enviar Control de Cambios en estado BORRADOR.');
    }
    await this.validarProyectoNoCancelado(proyecto.id);

    const controlCambio = proceso.controles_cambio;
    const esDueno = controlCambio?.responsable_pm_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esDueno && !esAdmin) throw new ForbiddenException('No eres el responsable de este Control de Cambios.');

    await this.permisos.exigirPartesInteresadasAsignadas(procesoId);

    const estadoDestino = 'PENDIENTE_PMO';

    const resultado = await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.procesos.updateMany({
        where: { id: procesoId, estado_actual: 'BORRADOR' },
        data: { estado_actual: estadoDestino },
      });
      if (count === 0) throw new BadRequestException('El Control de Cambios ya cambió de estado. Refresca la pantalla.');

      await tx.historico_aprobaciones.create({
        data: { proceso_id: procesoId, etapa_origen: 'BORRADOR', etapa_destino: estadoDestino, accion: 'ENVIADO', usuario_id: usuarioId },
      });
      return { procesoId, estado_actual: estadoDestino, mensaje: 'Enviado a revisión PMO.' };
    });

    try {
      const destinatariosPmo = await this.helpers.obtenerEmailsPorRol(['PMO', 'ADMIN'], companiaId);
      if (destinatariosPmo.length) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'CC_NUEVA_ETAPA',
          destinatarios: destinatariosPmo,
          datos: {
            nombreUsuario: 'Equipo PMO',
            etapaActual: 'Pendiente Revisión PMO',
            codigoProyecto: proyecto.id.toString(),
            nombreProyecto: proyecto.nombre,
            nombrePM: controlCambio?.usuarios?.nombre || 'Project Manager',
          },
        });
      }
    } catch (error) {
      this.logger.error('Error al notificar (enviarARevision CC)', error);
    }

    return resultado;
  }

  // Aprobar la etapa actual — avanza según en qué etapa esté
  async aprobarEtapa(procesoId: number, usuarioId: number, dto: AprobarControlCambioDto) {
    const { proceso, proyecto, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);
    const estadoOrigen = proceso.estado_actual;

    await this.validarProyectoNoCancelado(proyecto.id);
    await this.helpers.validarPermisoParaEtapa(usuarioId, procesoId, companiaId, estadoOrigen);
    // El Administrador puede aprobar en cualquier etapa, aunque no esté asignado:
    // en ese caso resuelve las asignaciones pendientes de la etapa en nombre de los asignados.
    const filtroAsignado = (await this.permisos.esAdminGlobal(usuarioId)) ? {} : { usuario_id: usuarioId };

    const { estadoDestino, gerenteElegidoId } = await this.calcularDestinoAprobacion(estadoOrigen, dto, companiaId);

    const resultado = await this.prisma.$transaction(async (tx) => {
      if (estadoOrigen === 'VERIFICACION_PARTES_INTERESADAS') {
        return this.aprobarComoParteInteresada(tx, procesoId, usuarioId, filtroAsignado, dto);
      }

      const { count } = await tx.procesos.updateMany({
        where: { id: procesoId, estado_actual: estadoOrigen },
        data: { estado_actual: estadoDestino },
      });
      if (count === 0) {
        throw new BadRequestException('El proceso fue modificado por otro usuario. Refresca la pantalla.');
      }

      await this.actualizarAsignacionesAlAprobar(tx, procesoId, filtroAsignado, estadoOrigen, estadoDestino, gerenteElegidoId);

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

      if (estadoDestino === 'APROBADO_FINAL') {
        await this.aplicarAplazamientoAprobado(tx, proceso.controles_cambio, proyecto.id, procesoId, usuarioId);
      }

      return { procesoId, estado_anterior: estadoOrigen, estado_actual: estadoDestino, mensaje: 'Aprobado exitosamente.' };
    });

    try {
      await this.notificarAprobacion(proceso, proyecto, companiaId, procesoId, usuarioId, resultado.estado_actual);
    } catch (error) {
      this.logger.error('Error al notificar (aprobarEtapa CC)', error);
    }

    return resultado;
  }

  // A qué etapa avanza el proceso al aprobar, según la etapa en la que está.
  private async calcularDestinoAprobacion(estadoOrigen: string, dto: AprobarControlCambioDto, companiaId: number) {
    switch (estadoOrigen) {
      case 'PENDIENTE_PMO':
        return { estadoDestino: 'VERIFICACION_PARTES_INTERESADAS', gerenteElegidoId: undefined };
      case 'VERIFICACION_PARTES_INTERESADAS':
        return { estadoDestino: 'DIRECCION_PMO', gerenteElegidoId: undefined };
      case 'DIRECCION_PMO': {
        if (!dto.gerente_id) {
          throw new BadRequestException('Debes elegir a qué gerente enviar el proceso (hay varias gerencias).');
        }
        const gerenteValido = await this.permisos.tieneRolParaCompania(dto.gerente_id, ['GERENCIA'], companiaId);
        if (!gerenteValido) {
          throw new BadRequestException('El usuario seleccionado no tiene el rol GERENCIA en esta compañía.');
        }
        return { estadoDestino: 'GERENCIA', gerenteElegidoId: dto.gerente_id };
      }
      case 'GERENCIA':
        if (dto.enviar_a_presidencia === undefined) {
          throw new BadRequestException(
            'Debes indicar si el proceso continúa a Presidencia (enviar_a_presidencia: true) o si finaliza aquí (false).',
          );
        }
        return { estadoDestino: dto.enviar_a_presidencia ? 'PRESIDENCIA' : 'APROBADO_FINAL', gerenteElegidoId: undefined };
      case 'PRESIDENCIA':
        return { estadoDestino: 'APROBADO_FINAL', gerenteElegidoId: undefined };
      default:
        throw new BadRequestException(`No se puede aprobar un Control de Cambios en estado "${estadoOrigen}".`);
    }
  }

  // Aprobación de una parte interesada: el proceso avanza solo cuando todas aprobaron.
  private async aprobarComoParteInteresada(
    tx: Prisma.TransactionClient,
    procesoId: number,
    usuarioId: number,
    filtroAsignado: { usuario_id?: number },
    dto: AprobarControlCambioDto,
  ) {
    const estadoOrigen = 'VERIFICACION_PARTES_INTERESADAS';
    const res = await tx.asignaciones_proceso.updateMany({
      where: { proceso_id: procesoId, etapa: estadoOrigen, ...filtroAsignado, estado_asignacion: 'PENDIENTE' },
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

    const estadoDestino = 'DIRECCION_PMO';
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

  // Reabre, crea o resuelve las asignaciones de las etapas involucradas en la aprobación.
  private async actualizarAsignacionesAlAprobar(
    tx: Prisma.TransactionClient,
    procesoId: number,
    filtroAsignado: { usuario_id?: number },
    estadoOrigen: string,
    estadoDestino: string,
    gerenteElegidoId: number | undefined,
  ) {
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
        where: { proceso_id: procesoId, etapa: estadoOrigen, ...filtroAsignado, estado_asignacion: 'PENDIENTE' },
        data: { estado_asignacion: 'RESUELTA', fecha_resolucion: new Date() },
      });
    }
  }

  // Si el cambio aprobado es un aplazamiento, mueve el proyecto al año nuevo propuesto.
  private async aplicarAplazamientoAprobado(
    tx: Prisma.TransactionClient,
    controlCambio: { tipo_control_cambio: string | null; anio_nuevo_propuesto: number | null } | null | undefined,
    proyectoId: string,
    procesoId: number,
    usuarioId: number,
  ) {
    const anioNuevo = controlCambio?.tipo_control_cambio === 'APLAZAMIENTO' ? controlCambio.anio_nuevo_propuesto : null;
    if (!anioNuevo) return;

    const proyectoActual = await tx.proyectos.findUnique({ where: { id: proyectoId }, select: { anio_asignado: true } });
    if (!proyectoActual || proyectoActual.anio_asignado === anioNuevo) return;

    await tx.proyectos_aplazamientos.create({
      data: {
        proyecto_id: proyectoId,
        anio_anterior: proyectoActual.anio_asignado,
        anio_nuevo: anioNuevo,
        motivo: `Aplazamiento aprobado vía Control de Cambios #${procesoId}.`,
        usuario_id: usuarioId,
      },
    });
    await tx.proyectos.update({ where: { id: proyectoId }, data: { anio_asignado: anioNuevo } });
  }

  // Avisa al PM de la aprobación y a los responsables de la siguiente etapa.
  private async notificarAprobacion(
    proceso: ProcesoConCompania['proceso'],
    proyecto: ProcesoConCompania['proyecto'],
    companiaId: number,
    procesoId: number,
    usuarioId: number,
    nuevoEstado: string,
  ) {
    const nombrePM = proceso.controles_cambio?.usuarios?.nombre || 'Project Manager';
    const pmEmail = proceso.controles_cambio?.usuarios?.email;
    const usuarioAprobador = await this.prisma.usuarios.findUnique({ where: { id: usuarioId }, select: { nombre: true } });

    if (pmEmail) {
      await this.notificaciones.encolarNotificacion({
        tipo: 'CC_APROBADO',
        destinatarios: [pmEmail],
        datos: {
          nombrePM: proceso.controles_cambio?.usuarios?.nombre,
          codigoProyecto: proyecto.id.toString(),
          nombreProyecto: proyecto.nombre,
          nuevoEstado,
          nombreAprobador: usuarioAprobador?.nombre || 'Aprobador',
        },
      });
    }

    const etapasConAsignados: Record<string, string> = {
      VERIFICACION_PARTES_INTERESADAS: 'Verificación de Partes Interesadas',
      GERENCIA: 'Gerencia',
    };
    const datosEtapa = { codigoProyecto: proyecto.id.toString(), nombreProyecto: proyecto.nombre, nombrePM };

    if (etapasConAsignados[nuevoEstado]) {
      const asignados = await this.helpers.obtenerAsignados(procesoId, nuevoEstado);
      for (const asignado of asignados) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'CC_NUEVA_ETAPA',
          destinatarios: [asignado.email],
          datos: { nombreUsuario: asignado.nombre, etapaActual: etapasConAsignados[nuevoEstado], ...datosEtapa },
        });
      }
      return;
    }

    const roles = REGLA_POR_ETAPA[nuevoEstado]?.roles;
    if (!roles) return;
    const destinatariosSiguiente = await this.helpers.obtenerEmailsPorRol(roles, companiaId);
    if (destinatariosSiguiente.length) {
      await this.notificaciones.encolarNotificacion({
        tipo: 'CC_NUEVA_ETAPA',
        destinatarios: destinatariosSiguiente,
        datos: { nombreUsuario: 'Equipo responsable', etapaActual: nuevoEstado.replace(/_/g, ' '), ...datosEtapa },
      });
    }
  }

  // Rechazar la etapa actual — vuelve a BORRADOR
  async rechazarEtapa(procesoId: number, usuarioId: number, dto: RechazarControlCambioDto) {
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
      const pmEmail = proceso.controles_cambio?.usuarios?.email;
      const usuarioRechazador = await this.prisma.usuarios.findUnique({ where: { id: usuarioId }, select: { nombre: true } });

      const destinatariosPmo = await this.helpers.obtenerEmailsPorRol(['PMO', 'ADMIN'], companiaId);
      const destinatarios = Array.from(new Set([...(pmEmail ? [pmEmail] : []), ...destinatariosPmo]));

      if (destinatarios.length) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'CC_RECHAZADO',
          destinatarios,
          datos: {
            nombrePM: proceso.controles_cambio?.usuarios?.nombre,
            codigoProyecto: proyecto.id.toString(),
            nombreProyecto: proyecto.nombre,
            nombreRechazador: usuarioRechazador?.nombre || 'Revisor',
            razonRechazo: dto.razon_rechazo,
          },
        });
      }
    } catch (error) {
      this.logger.error('Error al notificar (rechazarEtapa CC)', error);
    }

    return resultado;
  }

  async actualizarPartesInteresadas(procesoId: number, usuarioId: number, dto: ActualizarPartesInteresadasCcDto) {
    const { proceso, companiaId } = await this.helpers.obtenerProcesoConCompania(procesoId);

    if (!['BORRADOR', 'PENDIENTE_PMO'].includes(proceso.estado_actual)) {
      throw new BadRequestException('Solo se pueden actualizar partes interesadas antes de la etapa de verificación.');
    }

    const controlCambio = proceso.controles_cambio;
    const esDueno = controlCambio?.responsable_pm_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esDueno && !esAdmin) {
      throw new ForbiddenException('Solo el responsable de este Control de Cambios o un Administrador pueden modificar las partes interesadas.');
    }

    await this.permisos.validarPartesInteresadas(dto.partes_interesadas_ids, companiaId, controlCambio?.responsable_pm_id ?? null);

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