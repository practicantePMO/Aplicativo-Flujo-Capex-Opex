import { Autocomplete, TextField, Chip, Card, CardContent, Typography } from '@mui/material';

interface Props {
  usuarios: any[];
  partesInteresadas: any[];
  setPartesInteresadas: (val: any[]) => void;
}

export function SeccionPartesInteresadas({ usuarios, partesInteresadas, setPartesInteresadas }: Props) {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Partes Interesadas
        </Typography>
        <Autocomplete
          multiple
          options={usuarios || []}
          getOptionLabel={(option) => option.nombre || option.email || ''}
          value={partesInteresadas || []}
          onChange={(_, newValue) => setPartesInteresadas(newValue)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return <Chip key={key} label={option.nombre} size="small" {...tagProps} />;
            })
          }
          renderInput={(params) => (
            <TextField {...params} label="Seleccionar partes interesadas" placeholder="Buscar usuario..." />
          )}
        />
      </CardContent>
    </Card>
  );
}