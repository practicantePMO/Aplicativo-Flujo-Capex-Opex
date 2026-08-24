import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  Alert, Typography, RadioGroup, FormControlLabel, Radio, Autocomplete, Chip,
} from '@mui/material';
import type { UsuarioActivo } from '../../types/solicitud.types';

interface Props {
  dialogoRechazo: boolean;
  setDialogoRechazo: (val: boolean) => void;
  dialogoCancelacion: boolean;
  setDialogoCancelacion: (val: boolean) => void;
  dialogoGerencia: boolean;
  setDialogoGerencia: (val: boolean) => void;
  dialogoElegirGerente: boolean;
  setDialogoElegirGerente: (val: boolean) => void;
  gerentesDisponibles: UsuarioActivo[];
  gerenteElegido: UsuarioActivo | null;
  setGerenteElegido: (val: UsuarioActivo | null) => void;
  dialogoPartes: boolean;
  setDialogoPartes: (val: boolean) => void;
  razon: string;
  setRazon: (val: string) => void;
  enviarPresidencia: 'si' | 'no';
  setEnviarPresidencia: (val: 'si' | 'no') => void;
  usuariosDisponibles: UsuarioActivo[];
  partesSeleccionadas: UsuarioActivo[];
  setPartesSeleccionadas: (val: UsuarioActivo[]) => void;
  procesando: boolean;
  onConfirmarRechazo: () => void;
  onConfirmarCancelacion: () => void;
  onConfirmarGerencia: () => void;
  onConfirmarElegirGerente: () => void;
  onConfirmarPartes: () => void;
  dialogoAprobar: boolean;
  setDialogoAprobar: (val: boolean) => void;
  onConfirmarAprobar: () => void;
}

export function DialogosAccionVista({
  dialogoRechazo, setDialogoRechazo, dialogoCancelacion, setDialogoCancelacion,
  dialogoGerencia, setDialogoGerencia, dialogoElegirGerente, setDialogoElegirGerente,
  gerentesDisponibles, gerenteElegido, setGerenteElegido,
  dialogoPartes, setDialogoPartes,
  razon, setRazon, enviarPresidencia, setEnviarPresidencia, usuariosDisponibles,
  partesSeleccionadas, setPartesSeleccionadas, procesando,
  onConfirmarRechazo, onConfirmarCancelacion, onConfirmarGerencia, onConfirmarElegirGerente, onConfirmarPartes,
  dialogoAprobar, setDialogoAprobar, onConfirmarAprobar
}: Props) {
  return (
    <>
    {/* Elegir gerente (Dirección PMO -> Gerencia, hay varias gerencias) */}
      <Dialog open={dialogoElegirGerente} onClose={() => setDialogoElegirGerente(false)} fullWidth maxWidth="sm">
        <DialogTitle>Enviar a Gerencia</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={gerentesDisponibles}
            getOptionLabel={(u) => `${u.nombre} (${u.email})`}
            value={gerenteElegido}
            onChange={(_, value) => setGerenteElegido(value)}
            renderInput={(params) => <TextField {...params} label="¿A qué gerente se envía el proceso?" sx={{ mt: 1, mb: 2 }} />}
          />
          <TextField autoFocus fullWidth multiline minRows={3} label="Observación / justificación (obligatoria)"
            value={razon} onChange={(e) => setRazon(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoElegirGerente(false)}>Cancelar</Button>
          <Button variant="contained" color="success" onClick={onConfirmarElegirGerente} disabled={procesando}>Confirmar envío</Button>
        </DialogActions>
      </Dialog>

    {/* Aprobar con observación obligatoria */}
      <Dialog open={dialogoAprobar} onClose={() => setDialogoAprobar(false)} fullWidth maxWidth="sm">
        <DialogTitle>Aprobar etapa</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth multiline minRows={3} label="Observación / justificación (obligatoria)"
            value={razon} onChange={(e) => setRazon(e.target.value)} sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoAprobar(false)}>Cancelar</Button>
          <Button variant="contained" color="success" onClick={onConfirmarAprobar} disabled={procesando}>Confirmar aprobación</Button>
        </DialogActions>
      </Dialog>
      
      {/* Rechazo */}
      <Dialog open={dialogoRechazo} onClose={() => setDialogoRechazo(false)} fullWidth maxWidth="sm">
        <DialogTitle>Rechazar solicitud</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth multiline minRows={3} label="Razón del rechazo (obligatoria)"
            value={razon} onChange={(e) => setRazon(e.target.value)} sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoRechazo(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={onConfirmarRechazo} disabled={procesando}>Confirmar rechazo</Button>
        </DialogActions>
      </Dialog>

      {/* Cancelación Definitiva */}
      <Dialog open={dialogoCancelacion} onClose={() => setDialogoCancelacion(false)} fullWidth maxWidth="sm">
        <DialogTitle>Cancelar definitivamente</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>Esta acción es irreversible: cierra el proyecto por completo.</Alert>
          <TextField autoFocus fullWidth multiline minRows={3} label="Razón de la cancelación (obligatoria)"
            value={razon} onChange={(e) => setRazon(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoCancelacion(false)}>Volver</Button>
          <Button variant="contained" color="error" onClick={onConfirmarCancelacion} disabled={procesando}>Confirmar cancelación</Button>
        </DialogActions>
      </Dialog>

      {/* Bifurcación Gerencia */}
      <Dialog open={dialogoGerencia} onClose={() => setDialogoGerencia(false)} fullWidth maxWidth="sm">
        <DialogTitle>Aprobar en Gerencia</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth multiline minRows={3} label="Observación / justificación (obligatoria)"
            value={razon} onChange={(e) => setRazon(e.target.value)} sx={{ mt: 1, mb: 2 }} />
          <Typography sx={{ mb: 1 }}>¿Este proyecto requiere aprobación de Presidencia?</Typography>
          <RadioGroup value={enviarPresidencia} onChange={(e) => setEnviarPresidencia(e.target.value as 'si' | 'no')}>
            <FormControlLabel value="si" control={<Radio />} label="Sí, enviar a Presidencia" />
            <FormControlLabel value="no" control={<Radio />} label="No, finaliza aquí (Aprobado)" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoGerencia(false)}>Cancelar</Button>
          <Button variant="contained" color="success" onClick={onConfirmarGerencia} disabled={procesando}>Confirmar</Button>
        </DialogActions>
      </Dialog>

      {/* Editar Partes Interesadas */}
      <Dialog open={dialogoPartes} onClose={() => setDialogoPartes(false)} fullWidth maxWidth="sm">
        <DialogTitle>Editar Partes Interesadas</DialogTitle>
        <DialogContent>
          <Autocomplete
            multiple
            options={usuariosDisponibles}
            getOptionLabel={(u) => `${u.nombre} (${u.email})`}
            value={partesSeleccionadas}
            onChange={(_, value) => setPartesSeleccionadas(value)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return <Chip key={option.id || key} label={option.nombre} {...tagProps} />;
              })
            }
            renderInput={(params) => <TextField {...params} label="Selecciona las partes interesadas" sx={{ mt: 1 }} />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoPartes(false)}>Cancelar</Button>
          <Button variant="contained" color="secondary" onClick={onConfirmarPartes} disabled={procesando}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}