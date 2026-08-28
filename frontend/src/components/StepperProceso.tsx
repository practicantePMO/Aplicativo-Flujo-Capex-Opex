import { Stepper, Step, StepLabel, Box, Typography, Chip } from '@mui/material';

export interface EtapaProceso {
  key: string;
  label: string;
}

interface Props {
  etapas: EtapaProceso[];
  etapaActual: string;
  estadoFinal?: string; // ej. 'APROBADO_FINAL' o 'CERRADA' — significa "completado con éxito"
  estadoCancelado?: string; // ej. 'CANCELADO' — significa "terminó, pero no se completó"
}

export function StepperProceso({ etapas, etapaActual, estadoFinal, estadoCancelado }: Props) {
  if (estadoCancelado && etapaActual === estadoCancelado) {
    return (
      <Box sx={{ mb: 4 }}>
        <Chip label="Proceso cancelado" color="error" sx={{ fontWeight: 700 }} />
      </Box>
    );
  }

  const esFinal = !!estadoFinal && etapaActual === estadoFinal;
  const indiceActual = etapas.findIndex((e) => e.key === etapaActual);
  const activeStep = esFinal ? etapas.length : indiceActual === -1 ? 0 : indiceActual;

  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {etapas.map((etapa) => (
          <Step key={etapa.key}>
            <StepLabel>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {etapa.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}