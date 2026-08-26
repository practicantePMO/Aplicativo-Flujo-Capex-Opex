import { Injectable } from '@nestjs/common';
import { SolicitudInversionConsultaService } from '../solicitud-inversion/solicitud-inversion-consulta.service';
import { OrdenesInternasConsultaService } from '../ordenes-internas/ordenes-internas-consulta.service';

// 🎯 Este módulo NO tiene lógica propia de negocio — solo JUNTA lo que cada
// proceso ya sabe calcular sobre "qué le falta hacer a este usuario", para
// que "Mis Pendientes" sea de verdad general y no solo de un proceso.
// Cuando se agregue un proceso nuevo (Acta de Cierre, etc.), solo hay que
// sumar su propio "obtenerMisPendientes" aquí.
@Injectable()
export class PendientesService {
  constructor(
    private readonly solicitudInversionConsulta: SolicitudInversionConsultaService,
    private readonly ordenesInternasConsulta: OrdenesInternasConsultaService,
  ) {}

  async obtenerMisPendientes(usuarioId: number) {
    const [pendientesSi, pendientesOi] = await Promise.all([
      this.solicitudInversionConsulta.obtenerMisPendientes(usuarioId),
      this.ordenesInternasConsulta.obtenerMisPendientes(usuarioId),
    ]);

    // 🔀 Normalizamos las Órdenes Internas a la MISMA forma que ya usa el
    // frontend para Solicitud de Inversión (proceso.proyectos / .historico_aprobaciones),
    // así la pantalla "Mis Pendientes" no necesita saber la diferencia.
    const pendientesOiNormalizados = pendientesOi.map((oi) => ({
      id: oi.proceso_id,
      tipo_proceso: 'ORDEN_INTERNA',
      estado_actual: oi.procesos.estado_actual,
      fecha_creacion: oi.fecha_creacion,
      proyectos: oi.grupos_ordenes_internas.proyectos,
      historico_aprobaciones: oi.procesos.historico_aprobaciones,
      // 👈 Extra útil para que el frontend pueda mostrar el número/nombre de la OI
      orden_interna_id: oi.id,
      numero_oi: oi.numero_oi,
      nombre_descriptivo: oi.nombre_descriptivo,
    }));

    return [...pendientesSi, ...pendientesOiNormalizados].sort((a: any, b: any) => {
      const fechaA = a.historico_aprobaciones?.[0]?.fecha_registro || a.fecha_creacion;
      const fechaB = b.historico_aprobaciones?.[0]?.fecha_registro || b.fecha_creacion;
      return new Date(fechaB).getTime() - new Date(fechaA).getTime();
    });
  }
}