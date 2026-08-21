import { Card, CardContent, Typography, TextField } from '@mui/material';

interface Props {
  linkActa: string; setLinkActa: (v: string) => void;
  linkPlan: string; setLinkPlan: (v: string) => void;
  linkPresentacion: string; setLinkPresentacion: (v: string) => void;
}

export function SeccionDocumentosLinks({
  linkActa, setLinkActa, linkPlan, setLinkPlan, linkPresentacion, setLinkPresentacion,
}: Props) {
  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Documentos (links externos)</Typography>
        <TextField label="Link Acta de Aprobación" fullWidth sx={{ mb: 2 }} value={linkActa} onChange={(e) => setLinkActa(e.target.value)} />
        <TextField label="Link Plan de Proyecto" fullWidth sx={{ mb: 2 }} value={linkPlan} onChange={(e) => setLinkPlan(e.target.value)} />
        <TextField label="Link Presentación Puerta 3" fullWidth value={linkPresentacion} onChange={(e) => setLinkPresentacion(e.target.value)} />
      </CardContent>
    </Card>
  );
}