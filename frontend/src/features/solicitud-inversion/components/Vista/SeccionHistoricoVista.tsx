import {
  Card, CardContent, Typography, TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody, Chip
} from '@mui/material';

interface ItemHistorico {
  id: number;
  fecha_registro: string;
  etapa_origen: string;
  etapa_destino: string;
  accion: string;
  razon_rechazo?: string | null;
  observaciones?: string | null;
  usuarios?: {
    nombre: string;
    area?: string | null;
  } | null;
}

interface Props {
  historico: ItemHistorico[];
}

export function SeccionHistoricoVista({ historico }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          Histórico de Aprobaciones
        </Typography>
        
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Usuario / Responsable</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Etapa Origen</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Etapa Destino</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Acción</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Razón / Comentario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historico.map((h) => (
                <TableRow key={h.id}>
                  <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                    {new Date(h.fecha_registro).toLocaleString()}
                  </TableCell>
                  
                  {/* Muestra el Nombre y Área de la persona que actuó */}
                  <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem', fontWeight: 600 }}>
                    {h.usuarios?.nombre || '—'}
                    {h.usuarios?.area && (
                      <Typography component="span" variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {h.usuarios.area}
                      </Typography>
                    )}
                  </TableCell>

                  
                  <TableCell sx={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {h.etapa_origen.replace(/_/g, ' ')}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', color: '#0e381e', fontWeight: 600 }}>
                    {h.etapa_destino.replace(/_/g, ' ')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={h.accion.replace(/_/g, ' ')}
                      color={h.accion === 'RECHAZADO' || h.accion === 'CANCELADO' ? 'error' : 'success'}
                      sx={{ fontWeight: 700, fontSize: '0.72rem' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.8rem', wordBreak: 'break-word' }}>
                    {h.razon_rechazo || h.observaciones || '—'}
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}