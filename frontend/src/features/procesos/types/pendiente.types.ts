import type { Proyecto } from '../../proyectos/types/proyecto.types';

// Un proceso de la bandeja "Mis pendientes" (Solicitud, OI, Control de Cambios o Acta)
export interface Pendiente {
  id: number;
  tipo_proceso: string;
  estado_actual: string;
  proyectos: Proyecto;
  historico_aprobaciones?: { fecha_registro: string }[];
}