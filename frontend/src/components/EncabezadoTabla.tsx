import { TableHead, TableRow, TableCell } from '@mui/material';
import type { TableCellProps } from '@mui/material';

export interface ColumnaEncabezado {
  titulo: string;
  align?: TableCellProps['align'];
  sx?: TableCellProps['sx'];
}

export function EncabezadoTabla({ columnas }: { columnas: ColumnaEncabezado[] }) {
  return (
    <TableHead>
      <TableRow>
        {columnas.map((c) => (
          <TableCell key={c.titulo} align={c.align} sx={c.sx}>{c.titulo}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
