import { Box, Typography, Button, Alert, CircularProgress, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Proyecto } from '../../proyectos/types/proyecto.types';
import type { SolicitudInversionDetalle, FlujoCaja } from '../types/solicitud.types';
import { useSolicitudForm } from '../hooks/useSolicitudForm';

import { SeccionCategorizacion } from './formulario/SeccionCategorizacion';
import { SeccionEvaluacionFinanciera } from './formulario/SeccionEvaluacionFinanciera';
import { SeccionMetas } from './formulario/SeccionMetas';
import { SeccionValorProyecto } from './formulario/SeccionValorProyecto';
import { SeccionFlujoCaja } from './formulario/SeccionFlujoCaja';
import { SeccionPartesInteresadas } from './formulario/SeccionPartesInteresadas';
import { SeccionDocumentosLinks } from './formulario/SeccionDocumentosLinks';

interface Props {
  proyecto: Proyecto;
  solicitudExistente?: SolicitudInversionDetalle;
  onCancelar: () => void;
  onCreada: (procesoId: number) => void;
}

export function FormularioSolicitudInversion({ proyecto, solicitudExistente, onCancelar, onCreada }: Props) {
  const {
    form, updateForm, grupos, programas, subprogramas, subprogramaSeleccionado,
    categorias, usuarios, cargandoCatalogos, guardando, error, guardar
  } = useSolicitudForm(proyecto, solicitudExistente, onCreada);

  const handleSetAniosFlujo = (val: React.SetStateAction<number[]>) => {
    const nuevoValor = typeof val === 'function' ? val(form.aniosFlujo || []) : val;
    updateForm({ aniosFlujo: nuevoValor });
  };

  const handleSetTiposSeleccionados = (val: React.SetStateAction<Record<number, ('CAPEX' | 'GCAPEX' | 'OPEX')[]>>) => {
    const nuevoValor = typeof val === 'function' ? val(form.tiposSeleccionados || {}) : val;
    updateForm({ tiposSeleccionados: nuevoValor });
  };

  const handleSetTrimestresAbiertos = (val: React.SetStateAction<Record<number, number[]>>) => {
    const nuevoValor = typeof val === 'function' ? val(form.trimestresAbiertos || {}) : val;
    updateForm({ trimestresAbiertos: nuevoValor });
  };

  const handleSetFlujos = (val: React.SetStateAction<FlujoCaja[]>) => {
    const nuevoValor = typeof val === 'function' ? val(form.flujos || []) : val;
    updateForm({ flujos: nuevoValor });
  };

  if (cargandoCatalogos) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress color="secondary" /></Box>;

  const totalUsd = (Number(form.valoresProyecto.activoUsd) || 0) + (Number(form.valoresProyecto.gastoUsd) || 0);
  const totalCop = (Number(form.valoresProyecto.activoCop) || 0) + (Number(form.valoresProyecto.gastoCop) || 0);

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
        tipoClasificacion={form.tipoClasificacion || 'TRADICIONAL'}
        onChangeTipoClasificacion={(tipo) => {
          if (tipo === 'NUEVA') {
            updateForm({ tipoClasificacion: 'NUEVA', grupoId: '', programaId: '', subprogramaId: '' });
          } else {
            updateForm({ tipoClasificacion: 'TRADICIONAL', categoriaId: '' });
          }
        }}
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
        onChangeCategoria={(id) => updateForm({ categoriaId: id })}
      />

      <SeccionEvaluacionFinanciera
        entregablePlaneado={form.entregablePlaneado} setEntregablePlaneado={(v) => updateForm({ entregablePlaneado: v })}
        tieneEvaluacionFinanciera={form.tieneEvaluacionFinanciera} setTieneEvaluacionFinanciera={(v) => updateForm({ tieneEvaluacionFinanciera: v })}
        requiereObligatoria={subprogramaSeleccionado?.requiere_evaluacion_obligatoria}
        justificacion={form.justificacion} setJustificacion={(v) => updateForm({ justificacion: v })}
        tir={form.tir} setTir={(v) => updateForm({ tir: v })} vpn={form.vpn} setVpn={(v) => updateForm({ vpn: v })} payback={form.payback} setPayback={(v) => updateForm({ payback: v })}
      />

      <SeccionMetas metas={form.metas} setMetas={(v) => updateForm({ metas: v })} />

      <SeccionValorProyecto
        valoresProyecto={form.valoresProyecto} setValoresProyecto={(v) => updateForm({ valoresProyecto: v })}
        trm={form.trm} setTrm={(v) => updateForm({ trm: v })}
        totalUsd={totalUsd} totalCop={totalCop}
      />

      <SeccionFlujoCaja
        aniosFlujo={form.aniosFlujo} setAniosFlujo={handleSetAniosFlujo}
        tiposSeleccionados={form.tiposSeleccionados} setTiposSeleccionados={handleSetTiposSeleccionados}
        trimestresAbiertos={form.trimestresAbiertos} setTrimestresAbiertos={handleSetTrimestresAbiertos}
        flujos={form.flujos} setFlujos={handleSetFlujos}
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