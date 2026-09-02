// frontend/src/features/backup/services/backup.service.ts

import axiosClient from '../../../api/axiosClient';

export async function descargarBackupExcel(): Promise<void> {
  const response = await axiosClient.get('/backup/excel', {
    responseType: 'blob',
  });

  const blob = new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const fecha = new Date().toISOString().slice(0, 10);
  const url = window.URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `backup-proyectos-${fecha}.xlsx`;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  window.URL.revokeObjectURL(url);
}
