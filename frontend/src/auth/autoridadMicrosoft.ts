// Con un inquilino se inicia sesión en ese inquilino. Con varios (separados por comas) se usa
// 'organizations' (cualquier cuenta corporativa de Microsoft) y el backend solo acepta los configurados.
export function autoridadMicrosoft(tenantId: string) {
  return `https://login.microsoftonline.com/${tenantId.includes(',') ? 'organizations' : tenantId.trim()}`;
}
