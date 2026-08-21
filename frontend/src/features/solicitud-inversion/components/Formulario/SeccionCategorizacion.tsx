import {
  Card, CardContent, Typography, TextField, MenuItem, Alert,
  RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Box
} from '@mui/material';
import type { Grupo, Programa, Subprograma } from '../../types/solicitud.types';

export interface CategoriaSimple {
  id: number;
  nombre: string;
}

interface Props {
  tipoClasificacion: 'TRADICIONAL' | 'NUEVA';
  onChangeTipoClasificacion: (tipo: 'TRADICIONAL' | 'NUEVA') => void;

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
  categorias: CategoriaSimple[];
  onChangeCategoria: (id: number | '') => void;
}

export function SeccionCategorizacion({
  tipoClasificacion, onChangeTipoClasificacion,
  grupoId, programaId, subprogramaId, grupos, programas, subprogramas,
  subprogramaSeleccionado, onChangeGrupo, onChangePrograma, onChangeSubprograma,
  categoriaId, categorias, onChangeCategoria,
}: Props) {
  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          Categorización del Proyecto *
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#64748b', mb: 1 }}>
            Tipo de Clasificación
          </FormLabel>
          <RadioGroup
            row
            value={tipoClasificacion}
            onChange={(e) => onChangeTipoClasificacion(e.target.value as 'TRADICIONAL' | 'NUEVA')}
          >
            <FormControlLabel
              value="TRADICIONAL"
              control={<Radio size="small" color="secondary" />}
              label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Tradicional (Grupo / Programa / Subprograma)</Typography>}
            />
            <FormControlLabel
              value="NUEVA"
              control={<Radio size="small" color="secondary" />}
              label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Nueva Clasificación (Categoría Directa)</Typography>}
            />
          </RadioGroup>
        </FormControl>

        {tipoClasificacion === 'TRADICIONAL' ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 2,
              width: '100%',
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
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 2,
              width: '100%',
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

        {tipoClasificacion === 'TRADICIONAL' && subprogramaSeleccionado?.requiere_evaluacion_obligatoria && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Este subprograma exige evaluación financiera obligatoria.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}