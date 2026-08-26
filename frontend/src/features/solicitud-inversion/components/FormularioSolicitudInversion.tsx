import { Box, Typography, Button, Alert, CircularProgress, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Proyecto } from '../../proyectos/types/proyecto.types';
import type { SolicitudInversionDetalle, FlujoCaja } from '../types/solicitud.types';
import { useSolicitudForm } from '../hooks/useSolicitudForm';

import { SeccionCategorizacion } from './Formulario/SeccionCategorizacion';
import { SeccionEvaluacionFinanciera } from './Formulario/SeccionEvaluacionFinanciera';
import { SeccionMetas } from './Formulario/SeccionMetas';
import { SeccionValorProyecto } from './Formulario/SeccionValorProyecto';
import { SeccionFlujoCaja } from './Formulario/SeccionFlujoCaja';
import { SeccionPartesInteresadas } from './Formulario/SeccionPartesInteresadas';
import { SeccionDocumentosLinks } from './Formulario/SeccionDocumentosLinks';

interface Props {
  proyecto: Proyecto;
  solicitudExistente?: SolicitudInversionDetalle;
  onCancelar: () => void;
  onCreada: (procesoId: number) => void;
}

export function FormularioSolicitudInversion({ proyecto, solicitudExistente, onCancelar, onCreada }: Props) {
  const {
    form, updateForm, grupos, programas, subprogramas, subprogramaSeleccionado,
    categorias, categoriaSeleccionada, usuarios, cargandoCatalogos, guardando, error, guardar,
    activoUsd, activoCop, gastoUsd, gastoCop,
  } = useSolicitudForm(proyecto, solicitudExistente, onCreada);

  const handleSetAniosFlujo = (val: React.SetStateAction<number[]>) => {
    const nuevoValor = typeof val === 'function' ? val(form.aniosFlujo || []) : val;
    updateForm({ aniosFlujo: nuevoValor });
  };

  const handleSetTiposSeleccionados = (val: React.SetStateAction<Record<number, ('CAPEX' | 'GCAPEX' | 'OPEX')[]>>) => {
    const nuevoValor = typeof val === 'function' ? val(form.tiposSeleccionados || {}) : val;
    updateForm({ tiposSeleccionados: nuevoValor });
  };

    const handleSetMesesSeleccionados = (val: React.SetStateAction<Record<number, number[]>>) => {
    const nuevoValor = typeof val === 'function' ? val(form.mesesSeleccionados || {}) : val;
    updateForm({ mesesSeleccionados: nuevoValor });
  };

  const handleSetTiposPorMes = (val: React.SetStateAction<Record<string, ('CAPEX' | 'GCAPEX' | 'OPEX')[]>>) => {
    const nuevoValor = typeof val === 'function' ? val(form.tiposPorMes || {}) : val;
    updateForm({ tiposPorMes: nuevoValor });
  };

  const handleSetMonedaPorColumna = (val: React.SetStateAction<Record<string, 'USD' | 'COP'>>) => {
    const nuevoValor = typeof val === 'function' ? val(form.monedaPorColumna || {}) : val;
    updateForm({ monedaPorColumna: nuevoValor });
  };

  const handleSetFlujos = (val: React.SetStateAction<FlujoCaja[]>) => {
    const nuevoValor = typeof val === 'function' ? val(form.flujos || []) : val;
    updateForm({ flujos: nuevoValor });
  };

  const handleSetMetas = (val: React.SetStateAction<typeof form.metas>) => {
    const nuevoValor = typeof val === 'function' ? (val as (prev: typeof form.metas) => typeof form.metas)(form.metas || []) : val;
    updateForm({ metas: nuevoValor });
  };

  if (cargandoCatalogos) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress color="secondary" /></Box>;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={onCancelar} sx={{ mb: 2, color: '#64748b' }}>
        Cancelar y volver
      </Button>

      <Typography variant="h5" sx={{ fontWeight: 800, color: '#0e381e', mb: 0.5 }}>
        {solicitudExistente ? 'Editar Solicitud' : 'Nueva Solicitud de Inversión'} — {proyecto.nombre}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Proyecto {proyecto.id}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <SeccionCategorizacion
        incluyeTradicional={form.incluyeTradicional}
        incluyeNueva={form.incluyeNueva}
        onChangeIncluyeTradicional={(val) => updateForm({ incluyeTradicional: val, ...(val ? {} : { grupoId: '', programaId: '', subprogramaId: '' }) })}
        onChangeIncluyeNueva={(val) => updateForm({ incluyeNueva: val, ...(val ? {} : { categoriaId: '' }) })}
        grupoId={form.grupoId}
        programaId={form.programaId}
        subprogramaId={form.subprogramaId}
        grupos={grupos}
        programas={programas}
        subprogramas={subprogramas}
        subprogramaSeleccionado={subprogramaSeleccionado}
        onChangeGrupo={(id) => updateForm({ grupoId: id, programaId: '', subprogramaId: '' })}
        onChangePrograma={(id) => updateForm({ programaId: id, subprogramaId: '' })}
        onChangeSubprograma={(id) => updateForm({ subprogramaId: id })}
        categoriaId={form.categoriaId}
        categorias={categorias || []}
        categoriaSeleccionada={categoriaSeleccionada}
        onChangeCategoria={(id) => updateForm({ categoriaId: id })}
      />

      <SeccionEvaluacionFinanciera
        entregablePlaneado={form.entregablePlaneado} setEntregablePlaneado={(v) => updateForm({ entregablePlaneado: v })}
        tieneEvaluacionFinanciera={form.tieneEvaluacionFinanciera} setTieneEvaluacionFinanciera={(v) => updateForm({ tieneEvaluacionFinanciera: v })}
        requiereObligatoria={Boolean(
          (form.incluyeTradicional && subprogramaSeleccionado?.requiere_evaluacion_obligatoria) ||
          (form.incluyeNueva && categoriaSeleccionada?.requiere_evaluacion_obligatoria),
        )}
        justificacion={form.justificacion} setJustificacion={(v) => updateForm({ justificacion: v })}
        tir={form.tir} setTir={(v) => updateForm({ tir: v })} vpn={form.vpn} setVpn={(v) => updateForm({ vpn: v })} payback={form.payback} setPayback={(v) => updateForm({ payback: v })}
      />

      <SeccionMetas metas={form.metas} setMetas={handleSetMetas} />

      <SeccionFlujoCaja
        aniosFlujo={form.aniosFlujo} setAniosFlujo={handleSetAniosFlujo}
        tiposSeleccionados={form.tiposSeleccionados} setTiposSeleccionados={handleSetTiposSeleccionados}
        mesesSeleccionados={form.mesesSeleccionados} setMesesSeleccionados={handleSetMesesSeleccionados}
        tiposPorMes={form.tiposPorMes} setTiposPorMes={handleSetTiposPorMes}
        monedaPorColumna={form.monedaPorColumna} setMonedaPorColumna={handleSetMonedaPorColumna}
        flujos={form.flujos} setFlujos={handleSetFlujos}
      />

      {/* 🧮 Va DESPUÉS del flujo de caja porque ahora se calcula a partir de él */}
      <SeccionValorProyecto
        trm={form.trm} setTrm={(v) => updateForm({ trm: v })}
        activoUsd={activoUsd} activoCop={activoCop} gastoUsd={gastoUsd} gastoCop={gastoCop}
      />

      <SeccionPartesInteresadas
        usuarios={usuarios}
        partesInteresadas={form.partesInteresadas}
        setPartesInteresadas={(v) => updateForm({ partesInteresadas: v })}
      />

      <SeccionDocumentosLinks
        linkActa={form.linkActa} setLinkActa={(v) => updateForm({ linkActa: v })}
        linkPlan={form.linkPlan} setLinkPlan={(v) => updateForm({ linkPlan: v })}
        linkPresentacion={form.linkPresentacion} setLinkPresentacion={(v) => updateForm({ linkPresentacion: v })}
      />

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancelar} disabled={guardando}>Cancelar</Button>
        <Button variant="contained" color="secondary" onClick={guardar} disabled={guardando}>
          {guardando ? <CircularProgress size={22} color="inherit" /> : 'Guardar Cambios'}
        </Button>
      </Box>
    </Box>
  );
}