// frontend/src/features/backup/components/BotonBackupExcel.tsx
//
// Botón visible solo para ADMIN, PMO y DIRECTOR_PMO. Al hacer clic, descarga
// el Excel con el backup completo de todos los proyectos.

import { useState } from 'react';
import { Button, CircularProgress, Alert } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useAuth } from '../../../auth/AuthContext';
import { descargarBackupExcel } from '../services/backup.service';

export function BotonBackupExcel() {
  const { tieneRol } = useAuth();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tienePermiso = tieneRol('ADMIN') || tieneRol('PMO') || tieneRol('DIRECTOR_PMO');

  if (!tienePermiso) {
    return null;
  }

  const handleClick = async () => {
    setCargando(true);
    setError(null);
    try {
      await descargarBackupExcel();
    } catch {
      setError('No se pudo generar el backup. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={cargando ? <CircularProgress size={18} /> : <DownloadIcon />}
        onClick={handleClick}
        disabled={cargando}
      >
        {cargando ? 'Generando backup...' : 'Backup a Excel'}
      </Button>
      {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
    </>
  );
}
