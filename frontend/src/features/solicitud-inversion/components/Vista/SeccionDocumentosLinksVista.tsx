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

  return (
    <Card sx={{ mb: 3, borderRadius: 3, p: 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
          <InsertDriveFileOutlinedIcon sx={{ color: '#0e381e' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0e381e' }}>
            Documentos Adjuntos
          </Typography>
        </Box>

        {tieneDocumentos ? (
          <Grid container spacing={2}>
            {linkActa && (
              <Grid item xs={12} sm={4}>
                <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', display: 'block', mb: 1 }}>
                    Acta de Aprobación
                  </Typography>
                  <Button
                    variant="outlined" size="small" endIcon={<OpenInNewIcon />}
                    href={linkActa} target="_blank" rel="noopener noreferrer" fullWidth
                  >
                    Abrir Documento
                  </Button>
                </Box>
              </Grid>
            )}

            {linkPlan && (
              <Grid item xs={12} sm={4}>
                <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', display: 'block', mb: 1 }}>
                    Plan de Proyecto
                  </Typography>
                  <Button
                    variant="outlined" size="small" endIcon={<OpenInNewIcon />}
                    href={linkPlan} target="_blank" rel="noopener noreferrer" fullWidth
                  >
                    Abrir Documento
                  </Button>
                </Box>
              </Grid>
            )}

            {linkPresentacion && (
              <Grid item xs={12} sm={4}>
                <Box sx={{ p: 2, borderRadius: 2.5, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', display: 'block', mb: 1 }}>
                    Presentación Puerta 3
                  </Typography>
                  <Button
                    variant="outlined" size="small" endIcon={<OpenInNewIcon />}
                    href={linkPresentacion} target="_blank" rel="noopener noreferrer" fullWidth
                  >
                    Abrir Documento
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            No se adjuntaron enlaces de documentos a esta solicitud.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}