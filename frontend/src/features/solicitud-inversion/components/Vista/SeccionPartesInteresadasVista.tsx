import { Card, CardContent, Box, Typography, Button, Chip } from '@mui/material';

interface Asignacion {
  id: number;
  etapa: string;
  estado_asignacion: string;
  usuarios?: { nombre: string };
}

interface Props {
  asignaciones: Asignacion[];
  puedeEditar: boolean;
  onEditar: () => void;
}

export function SeccionPartesInteresadasVista({ asignaciones, puedeEditar, onEditar }: Props) {
  const partesFiltradas = asignaciones.filter((a) => a.etapa === 'VERIFICACION_PARTES_INTERESADAS');

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Partes Interesadas
          </Typography>
          {puedeEditar && (
            <Button size="small" variant="outlined" onClick={onEditar}>
              Editar
            </Button>
          )}
        </Box>

        {partesFiltradas.length ? (
          partesFiltradas.map((a) => (
            <Chip key={a.id} label={`${a.usuarios?.nombre} (${a.estado_asignacion})`} sx={{ mr: 1, mb: 1 }} />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">Sin partes interesadas asignadas.</Typography>
        )}
      </CardContent>
    </Card>
  );
}