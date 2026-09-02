import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { CrearOrdenInternaDto } from './dto/crear-orden-interna.dto';
import { EnviarOrdenInternaDto } from './dto/enviar-orden-interna.dto';
import { AprobarOrdenInternaDto, RechazarOrdenInternaDto } from './dto/cambiar-estado-orden.dto';
import { SolicitarCierreGrupoDto } from './dto/solicitar-cierre-grupo.dto';

// 🎯 Solo PM (dueño) y Control Gestión (asignado puntual) actúan en este
// proceso. PMO/Director PMO/Admin pueden VER, pero no aprobar ni rechazar
// (según lo pedido) — ADMIN sí conserva la capacidad de actuar, como en el
// resto del sistema, para casos de soporte/urgencia.
@Injectable()
export class OrdenesInternasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permisos: PermisosService,
    private readonly notificaciones: NotificacionesService,
  ) {}

  // 📦 Se llama automáticamente cuando la Solicitud de Inversión llega a
  // APROBADO_FINAL (ver solicitud-inversion.service.ts). La dejamos también
  // aquí como "red de seguridad" por si algún día se necesita crear a mano.
  private async obtenerOCrearGrupo(proyectoId: string) {
    return this.prisma.grupos_ordenes_internas.upsert({
      where: { proyecto_id: proyectoId },
      update: {},
      create: { proyecto_id: proyectoId },
    });
  }

  private async validarSiAprobadaFinal(proyectoId: string) {
    const siAprobada = await this.prisma.procesos.findFirst({
      where: { proyecto_id: proyectoId, tipo_proceso: 'SOLICITUD_INVERSION', estado_actual: 'APROBADO_FINAL', eliminado_el: null },
    });
    if (!siAprobada) {
      throw new BadRequestException('Las Órdenes Internas solo se habilitan cuando la Solicitud de Inversión del proyecto llegó a Aprobado Final.');
    }

    const actaCerrada = await this.prisma.procesos.findFirst({
      where: { proyecto_id: proyectoId, tipo_proceso: 'ACTA_CIERRE', estado_actual: 'CERRADO', eliminado_el: null },
    });
    if (actaCerrada) {
      throw new BadRequestException('No se puede crear una Orden Interna: este proyecto ya tiene su Acta de Cierre cerrada.');
    }
  }
  // 🔒 Que una OI "por Control de Cambios" de verdad tenga un CC real detrás
  // — de este mismo proyecto, y que ese CC realmente diga que necesita OI.
  private async validarControlCambioVinculado(proyectoId: string, controlCambioId?: number) {
    if (!controlCambioId) {
      throw new BadRequestException('Debes indicar a qué Control de Cambios corresponde esta Orden Interna.');
    }
    const controlCambio = await this.prisma.controles_cambio.findUnique({ where: { id: controlCambioId } });
    if (!controlCambio || controlCambio.proyecto_id !== proyectoId) {
      throw new BadRequestException('El Control de Cambios seleccionado no existe o no pertenece a este proyecto.');
    }
    if (!controlCambio.requiere_orden_interna) {
      throw new BadRequestException('Ese Control de Cambios no está marcado como que requiera Orden Interna.');
    }
  }

  private mapearDatosOi(dto: CrearOrdenInternaDto) {
    return {
      nombre_descriptivo: dto.nombre_descriptivo,
      tipo_orden: dto.tipo_orden,
      es_control_cambios: Boolean(dto.es_control_cambios),
      control_cambio_id: dto.es_control_cambios ? dto.control_cambio_id : null,
      centro_costos: dto.centro_costos,
      oficina_ventas: dto.oficina_ventas,
      linea_marca: dto.linea_marca,
      cliente: dto.cliente,
      ramo: dto.ramo,
      porcentaje_1: dto.porcentaje_1,
      activo_fijo_curso: dto.tipo_orden === 'ACTIVO' ? dto.activo_fijo_curso : null,
      tipo_activo: dto.tipo_orden === 'ACTIVO' ? dto.tipo_activo : null,
      porcentaje_2: dto.tipo_orden === 'ACTIVO' ? dto.porcentaje_2 : null,
      presupuesto: dto.presupuesto,
      presupuesto_moneda: dto.presupuesto_moneda || 'COP',
      activo_real_productivo: dto.tipo_orden === 'ACTIVO' ? dto.activo_real_productivo : null,
      observaciones_pm: dto.observaciones_pm,
    };
  }

  // 1️⃣ Crear (BORRADOR)
  async crear(usuarioId: number, dto: CrearOrdenInternaDto) {
    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: dto.proyecto_id, eliminado_el: null } });
    if (!proyecto) throw new NotFoundException('El proyecto no existe o fue eliminado.');

    const esAdminCrear = await this.permisos.esAdminGlobal(usuarioId);
    if (!esAdminCrear && proyecto.creado_por !== usuarioId) {
      throw new ForbiddenException('Solo el PM dueño de este proyecto (o un Administrador) puede crear una Orden Interna aquí.');
    }

    await this.validarSiAprobadaFinal(dto.proyecto_id);
    const grupo = await this.obtenerOCrearGrupo(dto.proyecto_id);

    if (grupo.estado !== 'ABIERTO') {
      throw new BadRequestException('El grupo de Órdenes Internas ya no admite nuevas órdenes (está en proceso de cierre o cerrado).');
    }

    if (dto.es_control_cambios) {
      await this.validarControlCambioVinculado(dto.proyecto_id, dto.control_cambio_id);
    }

    return this.prisma.$transaction(async (tx) => {
      const proceso = await tx.procesos.create({
        data: { proyecto_id: dto.proyecto_id, tipo_proceso: 'ORDEN_INTERNA', estado_actual: 'BORRADOR' },
      });

      const orden = await tx.ordenes_internas.create({
        data: {
          grupo_id: grupo.id,
          proceso_id: proceso.id,
          responsable_pm_id: usuarioId,
          ...this.mapearDatosOi(dto),
        },
      });

      if (dto.es_control_cambios && dto.valores?.length) {
        await tx.oi_valores.createMany({
          data: dto.valores.map((v) => ({ ...v, orden_interna_id: orden.id })),
        });
      }

      return { orden_interna_id: orden.id, proceso_id: proceso.id, mensaje: 'Orden Interna guardada en Borrador.' };
    });
  }

  // ✏️ Editar mientras está en BORRADOR (solo el PM dueño, o ADMIN)
  async actualizarBorrador(ordenInternaId: number, usuarioId: number, dto: CrearOrdenInternaDto) {
    const orden = await this.obtenerOrdenConProceso(ordenInternaId);
    if (orden.procesos.estado_actual !== 'BORRADOR') {
      throw new BadRequestException('Solo se puede editar una Orden Interna mientras está en Borrador.');
    }

    const esDueno = orden.responsable_pm_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esDueno && !esAdmin) throw new ForbiddenException('No eres el responsable de esta Orden Interna.');

    if (dto.es_control_cambios) {
      await this.validarControlCambioVinculado(dto.proyecto_id, dto.control_cambio_id);
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.ordenes_internas.update({
        where: { id: ordenInternaId },
        data: this.mapearDatosOi(dto),
      });

      await tx.oi_valores.deleteMany({ where: { orden_interna_id: ordenInternaId } });
      if (dto.es_control_cambios && dto.valores?.length) {
        await tx.oi_valores.createMany({
          data: dto.valores.map((v) => ({ ...v, orden_interna_id: ordenInternaId })),
        });
      }

      return { orden_interna_id: ordenInternaId, mensaje: 'Orden Interna actualizada.' };
    });
  }

  // 2️⃣ Enviar (Sección 5: elegir a quién de Control Gestión) — BORRADOR -> PENDIENTE
  async enviar(ordenInternaId: number, usuarioId: number, dto: EnviarOrdenInternaDto) {
    const orden = await this.obtenerOrdenConProceso(ordenInternaId);
    if (orden.procesos.estado_actual !== 'BORRADOR') {
      throw new BadRequestException('Esta Orden Interna ya fue enviada.');
    }

    const esDueno = orden.responsable_pm_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esDueno && !esAdmin) throw new ForbiddenException('No eres el responsable de esta Orden Interna.');

    const proyectoParaCg = await this.prisma.proyectos.findUnique({ where: { id: orden.grupos_ordenes_internas.proyecto_id } });
    const tieneRolCG = proyectoParaCg?.compania_id
      ? await this.permisos.tieneRolParaCompania(dto.control_gestion_id, ['CONTROL_GESTION'], proyectoParaCg.compania_id)
      : await this.permisos.tieneAlgunRol(dto.control_gestion_id, ['CONTROL_GESTION']);
    if (!tieneRolCG) throw new BadRequestException('El usuario seleccionado no tiene el rol Control Gestión.');

    await this.prisma.$transaction(async (tx) => {
      // 🔒 Bloqueo optimista: si otro request ya movió el proceso fuera de
      // BORRADOR (doble clic, dos pestañas, etc.), este update no toca nada.
      const { count } = await tx.procesos.updateMany({
        where: { id: orden.proceso_id, estado_actual: 'BORRADOR' },
        data: { estado_actual: 'PENDIENTE' },
      });
      if (count === 0) {
        throw new BadRequestException('Esta Orden Interna ya fue enviada. Refresca la pantalla.');
      }

      await tx.ordenes_internas.update({
        where: { id: ordenInternaId },
        data: { control_gestion_asignado_id: dto.control_gestion_id },
      });
      await tx.asignaciones_proceso.create({
        data: { proceso_id: orden.proceso_id, etapa: 'CONTROL_GESTION', usuario_id: dto.control_gestion_id, estado_asignacion: 'PENDIENTE' },
      });
      await tx.historico_aprobaciones.create({
        data: { proceso_id: orden.proceso_id, etapa_origen: 'BORRADOR', etapa_destino: 'PENDIENTE', accion: 'ENVIADO', usuario_id: usuarioId },
      });
    });

    const cg = await this.prisma.usuarios.findUnique({ where: { id: dto.control_gestion_id } });
    const proyecto = await this.prisma.proyectos.findUnique({ where: { id: orden.grupos_ordenes_internas.proyecto_id } });
    if (cg?.email) {
      await this.notificaciones.encolarNotificacion({
        tipo: 'OI_PENDIENTE',
        destinatarios: [cg.email],
        datos: {
          nombreUsuario: cg.nombre,
          nombrePM: orden.pm?.nombre || 'Project Manager',          
          numeroOi: orden.numero_oi || '(pendiente de asignar)',
          nombreOi: orden.nombre_descriptivo,
          nombreProyecto: proyecto?.nombre || '',
          codigoProyecto: proyecto?.id || '',
        },
      });
    }

    return { orden_interna_id: ordenInternaId, mensaje: 'Orden Interna enviada a Control Gestión.' };
  }
  // 3️⃣ Aprobar (Sección 4: grupo + observaciones) — PENDIENTE -> APROBADA
    async aprobar(ordenInternaId: number, usuarioId: number, dto: AprobarOrdenInternaDto) {
    const orden = await this.obtenerOrdenConProceso(ordenInternaId);
    if (orden.procesos.estado_actual !== 'PENDIENTE') {
      throw new BadRequestException('Esta Orden Interna no está pendiente de aprobación.');
    }

    const esCgAsignado = orden.control_gestion_asignado_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esCgAsignado && !esAdmin) throw new ForbiddenException('No fuiste asignado como Control Gestión de esta Orden Interna.');

    // 🏷️ El nombre del grupo solo se pide la primera vez. Si el grupo ya
    // tiene nombre, se reutiliza aunque venga vacío en el dto; si no lo
    // tiene, es obligatorio que esta aprobación lo traiga.
    const nombreGrupoExistente = orden.grupos_ordenes_internas.nombre;
    if (!nombreGrupoExistente && !dto.grupo_texto?.trim()) {
      throw new BadRequestException('El grupo de Órdenes Internas es obligatorio: es la primera Orden Interna de este proyecto.');
    }
    const grupoTextoFinal = nombreGrupoExistente || dto.grupo_texto!.trim();

    await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.procesos.updateMany({
        where: { id: orden.proceso_id, estado_actual: 'PENDIENTE' },
        data: { estado_actual: 'APROBADA' },
      });
      if (count === 0) {
        throw new BadRequestException('Esta Orden Interna ya cambió de estado. Refresca la pantalla.');
      }

      // 🔒 Bloqueo optimista al nombrar el grupo: si dos Control Gestión
      // aprueban casi al mismo tiempo dos OI del mismo grupo sin nombre,
      // solo la primera transacción que llega lo bautiza — la otra detecta
      // que ya tiene nombre y usa ESE (no lo pisa, no falla).
      let grupoTextoDefinitivo = grupoTextoFinal;
      if (!nombreGrupoExistente) {
        const { count: grupoNombrado } = await tx.grupos_ordenes_internas.updateMany({
          where: { id: orden.grupo_id, nombre: null },
          data: { nombre: grupoTextoFinal },
        });
        if (grupoNombrado === 0) {
          const grupoActual = await tx.grupos_ordenes_internas.findUnique({ where: { id: orden.grupo_id } });
          grupoTextoDefinitivo = grupoActual!.nombre!;
        }
      }

      await tx.ordenes_internas.update({
        where: { id: ordenInternaId },
        data: { numero_oi: dto.numero_oi, grupo_texto: grupoTextoDefinitivo, observaciones_cg: dto.observaciones },
      });
      await tx.asignaciones_proceso.updateMany({
        where: { proceso_id: orden.proceso_id, etapa: 'CONTROL_GESTION', usuario_id: usuarioId, estado_asignacion: 'PENDIENTE' },
        data: { estado_asignacion: 'RESUELTA', fecha_resolucion: new Date() },
      });
      await tx.historico_aprobaciones.create({
        data: { proceso_id: orden.proceso_id, etapa_origen: 'PENDIENTE', etapa_destino: 'APROBADA', accion: 'APROBADO', observaciones: dto.observaciones, usuario_id: usuarioId },
      });
    });
    
    const proyecto = await this.prisma.proyectos.findUnique({ where: { id: orden.grupos_ordenes_internas.proyecto_id } });
    if (orden.pm?.email) {
      await this.notificaciones.encolarNotificacion({
        tipo: 'OI_APROBADA',
        destinatarios: [orden.pm.email],
        datos: {
          nombreUsuario: orden.pm.nombre,
          numeroOi: dto.numero_oi,
          nombreOi: orden.nombre_descriptivo,
          nombreProyecto: proyecto?.nombre || '',
          codigoProyecto: proyecto?.id || '',
        },
      });
    }

    return { orden_interna_id: ordenInternaId, mensaje: 'Orden Interna aprobada.' };
  }

  // ❌ Rechazar — PENDIENTE -> BORRADOR (vuelve al PM con observación)
  async rechazar(ordenInternaId: number, usuarioId: number, dto: RechazarOrdenInternaDto) {
    const orden = await this.obtenerOrdenConProceso(ordenInternaId);
    if (orden.procesos.estado_actual !== 'PENDIENTE') {
      throw new BadRequestException('Esta Orden Interna no está pendiente de aprobación.');
    }

    const esCgAsignado = orden.control_gestion_asignado_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esCgAsignado && !esAdmin) throw new ForbiddenException('No fuiste asignado como Control Gestión de esta Orden Interna.');

    await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.procesos.updateMany({
        where: { id: orden.proceso_id, estado_actual: 'PENDIENTE' },
        data: { estado_actual: 'BORRADOR' },
      });
      if (count === 0) {
        throw new BadRequestException('Esta Orden Interna ya cambió de estado. Refresca la pantalla.');
      }

      await tx.asignaciones_proceso.updateMany({
        where: { proceso_id: orden.proceso_id, etapa: 'CONTROL_GESTION', usuario_id: usuarioId, estado_asignacion: 'PENDIENTE' },
        data: { estado_asignacion: 'CANCELADA', fecha_resolucion: new Date() },
      });
      await tx.historico_aprobaciones.create({
        data: { proceso_id: orden.proceso_id, etapa_origen: 'PENDIENTE', etapa_destino: 'BORRADOR', accion: 'RECHAZADO', razon_rechazo: dto.observaciones, usuario_id: usuarioId },
      });
    });

    const proyecto = await this.prisma.proyectos.findUnique({ where: { id: orden.grupos_ordenes_internas.proyecto_id } });
    if (orden.pm?.email) {
      await this.notificaciones.encolarNotificacion({
        tipo: 'OI_RECHAZADA',
        destinatarios: [orden.pm.email],
        datos: {
          nombreUsuario: orden.pm.nombre,
          numeroOi: orden.numero_oi || '(pendiente de asignar)',
          nombreOi: orden.nombre_descriptivo,
          nombreProyecto: proyecto?.nombre || '',
          codigoProyecto: proyecto?.id || '',
          observacion: dto.observaciones,
        },
      });
    }

    return { orden_interna_id: ordenInternaId, mensaje: 'Orden Interna devuelta a Borrador.' };
  }

  // 🔒 PM solicita el cierre del GRUPO completo (bloqueado hasta que todas
  // las OI estén Aprobadas). Esto lo disparará el proceso "Acta de Cierre"
  // más adelante; por ahora el endpoint queda listo para usarse desde ahí.
  async solicitarCierreGrupo(proyectoId: string, usuarioId: number, dto: SolicitarCierreGrupoDto) {
    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: proyectoId, eliminado_el: null } });
    if (!proyecto) throw new NotFoundException('El proyecto no existe o fue eliminado.');

    // El guard de rol del controller solo exige el rol, no que el proyecto
    // sea "suyo" — esta validación es la que faltaba.
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    const esDuenoPM = proyecto.creado_por === usuarioId;
    const esPmoODirector = proyecto.compania_id
      ? await this.permisos.tieneRolParaCompania(usuarioId, ['PMO', 'DIRECTOR_PMO'], proyecto.compania_id)
      : await this.permisos.tieneAlgunRol(usuarioId, ['PMO', 'DIRECTOR_PMO']);
    if (!esAdmin && !esDuenoPM && !esPmoODirector) {
      throw new ForbiddenException('No tienes acceso a este proyecto.');
    }

    const grupo = await this.prisma.grupos_ordenes_internas.findUnique({
      where: { proyecto_id: proyectoId },
      include: { ordenes_internas: { where: { procesos: { eliminado_el: null } }, include: { procesos: true } } },
    });
    if (!grupo) throw new NotFoundException('Este proyecto no tiene Órdenes Internas.');
    if (grupo.estado !== 'ABIERTO') {
      throw new BadRequestException('El cierre de este grupo ya fue solicitado o ya está cerrado.');
    }
    if (grupo.ordenes_internas.length === 0) {
      throw new BadRequestException('No hay ninguna Orden Interna creada todavía.');
    }

    const hayPendientes = grupo.ordenes_internas.some((o) => o.procesos.estado_actual !== 'APROBADA');
    if (hayPendientes) {
      throw new BadRequestException('Todas las Órdenes Internas deben estar Aprobadas antes de poder solicitar el cierre del grupo.');
    }

    await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.grupos_ordenes_internas.updateMany({
        where: { id: grupo.id, estado: 'ABIERTO' },
        data: { estado: 'SOLICITADO_CIERRE' },
      });
      if (count === 0) {
        throw new BadRequestException('El cierre de este grupo ya fue solicitado o ya está cerrado.');
      }
      await tx.grupo_oi_historico_cierre.create({
        data: { grupo_id: grupo.id, accion: 'SOLICITADO', observaciones: dto.observaciones, usuario_id: usuarioId },
      });
    });

    return { grupo_id: grupo.id, mensaje: 'Cierre de Órdenes Internas solicitado. Control Gestión ya puede cerrar cada orden.' };
  }

  // 🔒 Control Gestión cierra UNA orden puntual (solo si el grupo está en
  // SOLICITADO_CIERRE) — APROBADA -> CERRADA. Cuando la última queda
  // cerrada, el grupo completo pasa a CERRADO automáticamente.
  async cerrarOrden(ordenInternaId: number, usuarioId: number) {
    const orden = await this.obtenerOrdenConProceso(ordenInternaId);

    if (orden.grupos_ordenes_internas.estado !== 'SOLICITADO_CIERRE') {
      throw new BadRequestException('Todavía no se ha solicitado el cierre de este grupo de Órdenes Internas.');
    }
    if (orden.procesos.estado_actual !== 'APROBADA') {
      throw new BadRequestException('Solo se pueden cerrar Órdenes Internas que ya estén Aprobadas.');
    }

    const esCgAsignado = orden.control_gestion_asignado_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esCgAsignado && !esAdmin) throw new ForbiddenException('No fuiste asignado como Control Gestión de esta Orden Interna.');

    await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.procesos.updateMany({
        where: { id: orden.proceso_id, estado_actual: 'APROBADA' },
        data: { estado_actual: 'CERRADA' },
      });
      if (count === 0) {
        throw new BadRequestException('Esta Orden Interna ya cambió de estado. Refresca la pantalla.');
      }

      await tx.historico_aprobaciones.create({
        data: { proceso_id: orden.proceso_id, etapa_origen: 'APROBADA', etapa_destino: 'CERRADA', accion: 'CERRADO', usuario_id: usuarioId },
      });

      // ¿Ya quedaron TODAS cerradas? Si sí, el grupo completo pasa a CERRADO.
      const pendientesPorCerrar = await tx.ordenes_internas.count({
        where: { grupo_id: orden.grupo_id, procesos: { estado_actual: { not: 'CERRADA' }, eliminado_el: null } },
      });
      if (pendientesPorCerrar === 0) {
        const { count: grupoCerrado } = await tx.grupos_ordenes_internas.updateMany({
          where: { id: orden.grupo_id, estado: 'SOLICITADO_CIERRE' },
          data: { estado: 'CERRADO' },
        });
        if (grupoCerrado > 0) {
          await tx.grupo_oi_historico_cierre.create({
            data: { grupo_id: orden.grupo_id, accion: 'CERRADO', usuario_id: usuarioId },
          });
        }
      }
    });

    return { orden_interna_id: ordenInternaId, mensaje: 'Orden Interna cerrada.' };
  }

    // 🗑️ Cancela (soft-delete) una OI que sigue en Borrador — para que un
  // borrador abandonado no bloquee el cierre del grupo para siempre.
  async cancelarBorrador(ordenInternaId: number, usuarioId: number) {
    const orden = await this.obtenerOrdenConProceso(ordenInternaId);
    if (orden.procesos.estado_actual !== 'BORRADOR') {
      throw new BadRequestException('Solo se puede cancelar una Orden Interna mientras está en Borrador.');
    }

    const esDueno = orden.responsable_pm_id === usuarioId;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (!esDueno && !esAdmin) throw new ForbiddenException('No eres el responsable de esta Orden Interna.');

    const { count } = await this.prisma.procesos.updateMany({
      where: { id: orden.proceso_id, estado_actual: 'BORRADOR', eliminado_el: null },
      data: { eliminado_el: new Date() },
    });
    if (count === 0) {
      throw new BadRequestException('Esta Orden Interna ya cambió de estado. Refresca la pantalla.');
    }

    return { orden_interna_id: ordenInternaId, mensaje: 'Orden Interna cancelada.' };
  }

  // 🧰 Helper compartido

  // 🧰 Helper compartido
  private async obtenerOrdenConProceso(ordenInternaId: number) {
    const orden = await this.prisma.ordenes_internas.findUnique({
      where: { id: ordenInternaId },
      include: {
        procesos: true,
        grupos_ordenes_internas: true,
        pm: { select: { id: true, nombre: true, email: true } },
        control_gestion: { select: { id: true, nombre: true, email: true } },
      },
    });
    if (!orden) throw new NotFoundException('Orden Interna no encontrada.');
    return orden;
  }
}
