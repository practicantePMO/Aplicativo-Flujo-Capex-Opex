import { describe, it, expect } from 'vitest';
import { validarYConstruirPayload, type FormSolicitud } from '../../features/solicitud-inversion/hooks/validarSolicitud';
import type { FlujoCaja } from '../../features/solicitud-inversion/types/solicitud.types';

function formValido(cambios: Partial<FormSolicitud> = {}): FormSolicitud {
  return {
    incluyeTradicional: true,
    incluyeNueva: true,
    subprogramaId: 3,
    categoriaId: 2,
    entregablePlaneado: 'Planta',
    tieneEvaluacionFinanciera: true,
    trm: '4000',
    justificacion: '',
    tir: '10',
    vpn: '20',
    payback: '3',
    metas: [{ compromiso: ' Meta ', fecha_inicio: '2026-01-01', indicador: ' Ind ' }],
    aniosFlujo: [2026],
    tiposSeleccionados: { 2026: ['CAPEX'] },
    mesesSeleccionados: { 2026: [1] },
    tiposPorMes: {},
    flujos: [
      { anio: 2026, mes: 1, tipo: 'CAPEX', moneda: 'USD', monto: 100 },
      { anio: 2026, mes: 2, tipo: 'OPEX', monto: 0 },
    ],
    partesInteresadas: [{ id: 7 }],
    linkActa: 'a',
    linkPlan: 'b',
    linkPresentacion: 'c',
    ...cambios,
  } as FormSolicitud;
}

describe('validarYConstruirPayload', () => {
  it('arma el payload con evaluación financiera y ambas clasificaciones', () => {
    const payload = validarYConstruirPayload(formValido(), '2026001');
    expect(payload).toMatchObject({
      proyecto_id: '2026001',
      subprograma_id: 3,
      categoria_id: 2,
      trm: 4000,
      evaluacion_financiera: { tir: 10, vpn: 20, payback: 3 },
      justificacion_sin_evaluacion: undefined,
      metas: [{ compromiso: 'Meta', indicador: 'Ind' }],
      partes_interesadas_ids: [7],
    });
    expect(payload.flujos_caja).toEqual([{ anio: 2026, mes: 1, tipo: 'CAPEX', moneda: 'USD', monto: 100 }]);
  });

  it('arma el payload sin evaluación financiera y con valores vacíos', () => {
    const payload = validarYConstruirPayload(
      formValido({
        incluyeNueva: false,
        tieneEvaluacionFinanciera: false,
        justificacion: ' No aplica ',
        tir: 'x',
        flujos: [{ anio: 2026, mes: 1, tipo: 'CAPEX', monto: 5 } as FlujoCaja],
        linkActa: 'a',
      }),
      '1',
    );
    expect(payload.categoria_id).toBeUndefined();
    expect(payload.evaluacion_financiera).toBeUndefined();
    expect(payload.justificacion_sin_evaluacion).toBe('No aplica');
    expect(payload.flujos_caja[0].moneda).toBe('COP');
  });

  it('usa 0 cuando TIR, VPN o Payback no son números', () => {
    const payload = validarYConstruirPayload(formValido({ tir: 'a', vpn: 'b', payback: 'c', incluyeTradicional: false, entregablePlaneado: 'E' }), '1');
    expect(payload.evaluacion_financiera).toEqual({ tir: 0, vpn: 0, payback: 0 });
    expect(payload.subprograma_id).toBeUndefined();
  });

  it.each<[string, Partial<FormSolicitud>, RegExp]>([
    ['sin clasificación', { incluyeTradicional: false, incluyeNueva: false }, /al menos una clasificación/],
    ['tradicional incompleta', { subprogramaId: '' }, /Subprograma/],
    ['nueva incompleta', { categoriaId: '' }, /Categoría/],
    ['sin entregable', { entregablePlaneado: '  ' }, /entregable planeado/],
    ['sin TIR', { tir: '' }, /TIR, VPN y Payback/],
    ['sin justificación', { tieneEvaluacionFinanciera: false, justificacion: '' }, /justificación/],
    ['sin metas', { metas: [{ compromiso: '', fecha_inicio: '', indicador: '' }] }, /al menos una meta/],
    ['sin TRM', { trm: ' ' }, /TRM/],
    ['año sin meses', { mesesSeleccionados: {} }, /Marca al menos un mes/],
    ['mes sin tipos', { tiposPorMes: { '2026_1': [] } }, /Elige al menos un tipo/],
    ['mes sin valor', { flujos: [{ anio: 2026, mes: 1, tipo: 'CAPEX', moneda: 'COP', monto: 0 }] }, /Falta ingresar el valor de CAPEX/],
    ['sin montos', { aniosFlujo: [], flujos: [] }, /al menos un monto/],
    ['sin partes interesadas', { partesInteresadas: [] }, /parte interesada/],
    ['sin links', { linkPlan: '' }, /3 links/],
  ])('rechaza el formulario %s', (_caso, cambios, mensaje) => {
    expect(() => validarYConstruirPayload(formValido(cambios), '1')).toThrow(mensaje);
  });

  it('tolera listas ausentes', () => {
    const form = formValido({
      aniosFlujo: undefined as unknown as number[],
      tiposSeleccionados: {},
    });
    expect(validarYConstruirPayload(form, '1').flujos_caja).toHaveLength(1);
    expect(() => validarYConstruirPayload(formValido({ metas: undefined as unknown as [] }), '1')).toThrow(/meta/);
    expect(() => validarYConstruirPayload(formValido({ partesInteresadas: undefined as unknown as [] }), '1')).toThrow(/parte/);
    expect(() =>
      validarYConstruirPayload(formValido({ aniosFlujo: [], flujos: undefined as unknown as [] }), '1'),
    ).toThrow(/monto/);
  });
});
