import { Injectable } from '@nestjs/common';
import { SolicitudInversionConsultaService } from '../solicitud-inversion/solicitud-inversion-consulta.service';
import { OrdenesInternasConsultaService } from '../ordenes-internas/ordenes-internas-consulta.service';
import { ControlCambiosConsultaService } from '../control-cambios/control-cambios-consulta.service';

@Injectable()
export class PendientesService {
  constructor(
    private readonly solicitudInversionConsulta: SolicitudInversionConsultaService,
    private readonly ordenesInternasConsulta: OrdenesInternasConsultaService,
    private readonly controlCambiosConsulta: ControlCambiosConsultaService,
  ) {}

  async obtenerMisPendientes(usuarioId: number) {
    const [pendientesSi, pendientesOi, pendientesCc] = await Promise.all([
      this.solicitudInversionConsulta.obtenerMisPendientes(usuarioId),
      this.ordenesInternasConsulta.obtenerMisPendientes(usuarioId),
      this.controlCambiosConsulta.obtenerMisPendientes(usuarioId),
    ]);

    const pendientesOiNormalizados = pendientesOi.map((oi) => ({
      id: oi.proceso_id,
      tipo_proceso: 'ORDEN_INTERNA',
      estado_actual: oi.procesos.estado_actual,
      fecha_creacion: oi.fecha_creacion,
      proyectos: oi.grupos_ordenes_internas.proyectos,
      historico_aprobaciones: oi.procesos.historico_aprobaciones,
      orden_interna_id: oi.id,
      numero_oi: oi.numero_oi,
      nombre_descriptivo: oi.nombre_descriptivo,
    }));

    return [...pendientesSi, ...pendientesOiNormalizados, ...pendientesCc].sort((a: any, b: any) => {
      const fechaA = a.historico_aprobaciones?.[0]?.fecha_registro || a.fecha_creacion;
      const fechaB = b.historico_aprobaciones?.[0]?.fecha_registro || b.fecha_creacion;
      return new Date(fechaB).getTime() - new Date(fechaA).getTime();
    });
  }
}
