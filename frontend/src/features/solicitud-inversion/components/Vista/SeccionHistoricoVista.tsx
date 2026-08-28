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
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Histórico de Aprobaciones
        </Typography>

        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Fecha</TableCell>
                <TableCell>Usuario / Responsable</TableCell>
                <TableCell>Etapa Origen</TableCell>
                <TableCell>Etapa Destino</TableCell>
                <TableCell>Acción</TableCell>
                <TableCell>Razón / Comentario</TableCell>
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
                  <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
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