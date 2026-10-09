import { separarRolesUsuario } from './roles-usuario';

describe('separarRolesUsuario', () => {
  it('separa los roles globales de los roles por compañía', () => {
    const resultado = separarRolesUsuario([
      { compania_id: null, roles: { codigo: 'ADMIN' } },
      { compania_id: 2, roles: { codigo: 'PMO' } },
      { compania_id: 3, roles: { codigo: 'PM' } },
    ]);

    expect(resultado.codigosGlobales).toEqual(['ADMIN']);
    expect(resultado.rolesPorCompania).toEqual([
      { rol: 'PMO', companiaId: 2 },
      { rol: 'PM', companiaId: 3 },
    ]);
  });

  it('ignora los registros que no tienen rol', () => {
    const resultado = separarRolesUsuario([
      { compania_id: null, roles: null },
      { compania_id: 2, roles: null },
    ]);

    expect(resultado.codigosGlobales).toEqual([]);
    expect(resultado.rolesPorCompania).toEqual([]);
  });

  it('devuelve listas vacías si el usuario no tiene roles', () => {
    expect(separarRolesUsuario([])).toEqual({ codigosGlobales: [], rolesPorCompania: [] });
  });
});