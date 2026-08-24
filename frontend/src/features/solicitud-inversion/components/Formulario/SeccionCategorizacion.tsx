import {
  Card, CardContent, Typography, TextField, MenuItem, Alert,
  FormControlLabel, Checkbox, FormGroup, Box
} from '@mui/material';
import type { Grupo, Programa, Subprograma, Categoria } from '../../types/solicitud.types';

interface Props {
  incluyeTradicional: boolean;
  incluyeNueva: boolean;
  onChangeIncluyeTradicional: (val: boolean) => void;
  onChangeIncluyeNueva: (val: boolean) => void;

  // Tradicional
  grupoId: number | '';
  programaId: number | '';
  subprogramaId: number | '';
  grupos: Grupo[];
  programas: Programa[];
  subprogramas: Subprograma[];
  subprogramaSeleccionado?: Subprograma;
  onChangeGrupo: (id: number | '') => void;
  onChangePrograma: (id: number | '') => void;
  onChangeSubprograma: (id: number | '') => void;

  // Nueva
  categoriaId: number | '';
  categorias: Categoria[];
  categoriaSeleccionada?: Categoria;
  onChangeCategoria: (id: number | '') => void;
}

export function SeccionCategorizacion({
  incluyeTradicional, incluyeNueva, onChangeIncluyeTradicional, onChangeIncluyeNueva,
  grupoId, programaId, subprogramaId, grupos, programas, subprogramas,
  subprogramaSeleccionado, onChangeGrupo, onChangePrograma, onChangeSubprograma,
  categoriaId, categorias, categoriaSeleccionada, onChangeCategoria,
}: Props) {
  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          Categorización del Proyecto *
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1 }}>
          Marca las que apliquen — un proyecto puede tener clasificación Tradicional, Nueva, o ambas a la vez.
        </Typography>

        <FormGroup row sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="secondary"
                checked={incluyeTradicional}
                onChange={(e) => onChangeIncluyeTradicional(e.target.checked)}
              />
            }
            label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Tradicional (Grupo / Programa / Subprograma)</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="secondary"
                checked={incluyeNueva}
                onChange={(e) => onChangeIncluyeNueva(e.target.checked)}
              />
            }
            label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Nueva Clasificación (Categoría Directa)</Typography>}
          />
        </FormGroup>

        {incluyeTradicional && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 2,
              width: '100%',
              mb: 2,
            }}
          >
            <TextField
              select
              label="Grupo *"
              fullWidth
              value={grupoId}
              onChange={(e) => {
                const val = e.target.value;
                onChangeGrupo(val === '' ? '' : Number(val));
              }}
            >
              <MenuItem value="" disabled>
                <em>Seleccione un grupo...</em>
              </MenuItem>
              {grupos.map((g) => (
                <MenuItem key={g.id} value={g.id}>{g.nombre}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Programa *"
              fullWidth
              value={programaId}
              disabled={!grupoId}
              onChange={(e) => {
                const val = e.target.value;
                onChangePrograma(val === '' ? '' : Number(val));
              }}
            >
              <MenuItem value="" disabled>
                <em>Seleccione un programa...</em>
              </MenuItem>
              {programas.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Subprograma *"
              fullWidth
              value={subprogramaId}
              disabled={!programaId}
              onChange={(e) => {
                const val = e.target.value;
                onChangeSubprograma(val === '' ? '' : Number(val));
              }}
            >
              <MenuItem value="" disabled>
                <em>Seleccione un subprograma...</em>
              </MenuItem>
              {subprogramas.map((s) => (
                <MenuItem key={s.id} value={s.id}>{s.nombre}</MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        {incluyeNueva && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 2,
              width: '100%',
              mb: 2,
            }}
          >
            <TextField
              select
              label="Categoría *"
              fullWidth
              value={categoriaId}
              onChange={(e) => {
                const val = e.target.value;
                onChangeCategoria(val === '' ? '' : Number(val));
              }}
            >
              <MenuItem value="" disabled>
                <em>Seleccione una categoría...</em>
              </MenuItem>
              {categorias.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        {incluyeTradicional && subprogramaSeleccionado?.requiere_evaluacion_obligatoria && (
          <Alert severity="info" sx={{ mt: 1 }}>
            Este subprograma exige evaluación financiera obligatoria.
          </Alert>
        )}

        {incluyeNueva && categoriaSeleccionada?.requiere_evaluacion_obligatoria && (
          <Alert severity="info" sx={{ mt: 1 }}>
            Esta categoría (Crecimiento Estratégico / Productividad y Mejora) exige evaluación financiera obligatoria.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}