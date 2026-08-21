import { Card, CardContent, Typography, TextField, FormControlLabel, Switch, Grid } from '@mui/material';

interface Props {
  entregablePlaneado: string;
  setEntregablePlaneado: (val: string) => void;
  tieneEvaluacionFinanciera: boolean;
  setTieneEvaluacionFinanciera: (val: boolean) => void;
  requiereObligatoria?: boolean;
  justificacion: string;
  setJustificacion: (val: string) => void;
  tir: string;
  setTir: (val: string) => void;
  vpn: string;
  setVpn: (val: string) => void;
  payback: string;
  setPayback: (val: string) => void;
}

export function SeccionEvaluacionFinanciera({
  entregablePlaneado, setEntregablePlaneado, tieneEvaluacionFinanciera,
  setTieneEvaluacionFinanciera, requiereObligatoria, justificacion,
  setJustificacion, tir, setTir, vpn, setVpn, payback, setPayback,
}: Props) {
  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Entregable y Evaluación Financiera</Typography>
        <TextField
          label="Entregable Planeado" fullWidth multiline minRows={2}
          value={entregablePlaneado} onChange={(e) => setEntregablePlaneado(e.target.value)}
          sx={{ mb: 2.5 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={tieneEvaluacionFinanciera}
              disabled={!!requiereObligatoria}
              onChange={(e) => setTieneEvaluacionFinanciera(e.target.checked)}
            />
          }
          label="¿Tiene evaluación financiera?"
        />

        {tieneEvaluacionFinanciera ? (
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={4}><TextField label="TIR (%)" type="number" fullWidth value={tir} onChange={(e) => setTir(e.target.value)} /></Grid>
            <Grid item xs={4}><TextField label="VPN" type="number" fullWidth value={vpn} onChange={(e) => setVpn(e.target.value)} /></Grid>
            <Grid item xs={4}><TextField label="Payback (meses)" type="number" fullWidth value={payback} onChange={(e) => setPayback(e.target.value)} /></Grid>
          </Grid>
        ) : (
          <TextField
            label="Justificación (obligatoria si no hay evaluación financiera)"
            fullWidth multiline minRows={2} sx={{ mt: 2 }}
            value={justificacion} onChange={(e) => setJustificacion(e.target.value)}
          />
        )}
      </CardContent>
    </Card>
  );
}