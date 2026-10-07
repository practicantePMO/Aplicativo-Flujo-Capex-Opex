// Forma mínima de un registro de usuario_roles_compania con su rol incluido
// (lo que devuelve findMany({ include: { roles: true } })).
interface RolUsuarioCompania {
  compania_id: number | null;
  roles: { codigo: string } | null;
}

// Separa los roles de un usuario en:
// - codigosGlobales: roles sin compañía (aplican a todas), ej. ['ADMIN']
// - rolesPorCompania: roles atados a una compañía, ej. [{ rol: 'PMO', companiaId: 2 }]
// Los registros sin rol se ignoran.
export function separarRolesUsuario(rolesUsuario: RolUsuarioCompania[]) {
  const codigosGlobales: string[] = [];
  const rolesPorCompania: { rol: string; companiaId: number }[] = [];

  for (const r of rolesUsuario) {
    if (!r.roles) continue;

    if (r.compania_id === null) {
      codigosGlobales.push(r.roles.codigo);
    } else {
      rolesPorCompania.push({ rol: r.roles.codigo, companiaId: r.compania_id });
    }
  }

  return { codigosGlobales, rolesPorCompania };
}