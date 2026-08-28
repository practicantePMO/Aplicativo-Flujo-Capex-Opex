import { Card, CardContent, Typography, Box, Button, Grid, Alert } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface Props {
  linkActa?: string | null;
  linkPlan?: string | null;
  linkPresentacion?: string | null;
}

export function SeccionDocumentosLinksVista({ linkActa, linkPlan, linkPresentacion }: Props) {
  const tieneDocumentos = linkActa || linkPlan || linkPresentacion;

  const documento = (titulo: string, link: string) => (
    <Grid item xs={12} sm={4}>
      <Box sx={{ p: 2, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', display: 'block', mb: 1 }}>
          {titulo}
        </Typography>
        <Button
          variant="outlined" size="small" endIcon={<OpenInNewIcon />}
          href={link} target="_blank" rel="noopener noreferrer" fullWidth
        >
          Abrir Documento
        </Button>
      </Box>
    </Grid>
  );

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
          <InsertDriveFileOutlinedIcon sx={{ color: '#64748b' }} />
          <Typography variant="h6">
            Documentos Adjuntos
          </Typography>
        </Box>

        {tieneDocumentos ? (
          <Grid container spacing={2}>
            {linkActa && documento('Acta de Aprobación', linkActa)}
            {linkPlan && documento('Plan de Proyecto', linkPlan)}
            {linkPresentacion && documento('Presentación Puerta 3', linkPresentacion)}
          </Grid>
        ) : (
          <Alert severity="info">
            No se adjuntaron enlaces de documentos a esta solicitud.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}