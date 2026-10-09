import {
  crearAppDePruebas,
  AppDePruebas,
  crearProyectoConSiAprobada,
  USUARIOS,
} from '../../test/utilidades/app-pruebas';
import { ProyectosService } from '../proyectos/proyectos.service';
import { UsuariosService } from '../usuarios/usuarios.service';

// Administración: usuarios y roles, proyectos (listado, filtros, aplazar), catálogos,
// autenticación, pendientes y backup a Excel.
describe('Flujo: administración, catálogos y consultas', () => {
  let t: AppDePruebas;

  beforeAll(async () => {
    t = await crearAppDePruebas();
  }, 120000);

  afterAll(async () => {
    await t.cerrar();
  });

  describe('autenticación', () => {
    it('perfil del usuario autenticado y sin token', async () => {
      expect((await t.llamar('pm', 'get', '/auth/me')).status).toBe(200);
      expect((await t.llamar(null, 'get', '/auth/me')).status).toBe(401);
    });

    it('login SSO con un token inválido responde 401', async () => {
      const r = await t.llamar(null, 'post', '/auth/login-sso', {
        idToken: 'token-falso',
        proveedor: 'google',
      });
      expect(r.status).toBe(401);
    });

    it('login-dev se cierra si ALLOW_DEV_LOGIN no es true', async () => {
      process.env.ALLOW_DEV_LOGIN = 'false';
      expect(
        (await t.llamar(null, 'post', '/auth/login-dev', { usuarioId: 1 }))
          .status,
      ).toBe(404);
      process.env.ALLOW_DEV_LOGIN = 'true';
    });
  });

  describe('catálogos y compañías', () => {
    it('responde los catálogos', async () => {
      for (const ruta of [
        '/companias',
        '/catalogos/jerarquia',
        '/catalogos/grupos',
        '/catalogos/empresas',
        '/catalogos/programas/grupo/1',
        '/catalogos/subprogramas/programa/1',
      ]) {
        expect((await t.llamar('pm', 'get', ruta)).status).toBe(200);
      }
    });
  });

  describe('usuarios y roles', () => {
    let rolPmId: number;

    it('lista usuarios, pendientes, activos, roles y por rol', async () => {
      expect((await t.llamar('admin', 'get', '/usuarios')).status).toBe(200);
      expect((await t.llamar('pmo', 'get', '/usuarios')).status).toBe(200);
      expect(
        (await t.llamar('admin', 'get', '/usuarios/pendientes')).status,
      ).toBe(200);
      expect((await t.llamar('pm', 'get', '/usuarios/activos')).status).toBe(
        200,
      );
      expect(
        (
          await t.llamar(
            'admin',
            'get',
            '/usuarios/por-rol?rol=GERENCIA&companiaId=1',
          )
        ).status,
      ).toBe(200);
      const roles = await t.llamar(
        'admin',
        'get',
        '/usuarios/roles-disponibles',
      );
      expect(roles.status).toBe(200);
      rolPmId = roles.body.find(
        (r: { codigo: string }) => r.codigo === 'PM',
      ).id;
      expect((await t.llamar('pm', 'get', '/usuarios')).status).toBe(403);
    });

    it('asigna y quita un rol', async () => {
      const asignar = await t.llamar('admin', 'post', '/usuarios/asignar-rol', {
        usuario_id: USUARIOS.sinRol,
        rol_id: rolPmId,
        compania_id: 1,
      });
      expect(asignar.status).toBe(201);
      expect(
        (
          await t.llamar('admin', 'post', '/usuarios/asignar-rol', {
            usuario_id: USUARIOS.sinRol,
            rol_id: rolPmId,
            compania_id: 1,
          })
        ).status,
      ).toBe(409);
      expect(
        (
          await t.llamar('admin', 'post', '/usuarios/asignar-rol', {
            usuario_id: 99999,
            rol_id: rolPmId,
          })
        ).status,
      ).toBe(404);
      expect(
        (
          await t.llamar('admin', 'post', '/usuarios/asignar-rol', {
            usuario_id: USUARIOS.sinRol,
            rol_id: 99999,
          })
        ).status,
      ).toBe(404);
      const roles = await t.llamar(
        'admin',
        'get',
        '/usuarios/roles-disponibles',
      );
      const rolAdminId = roles.body.find(
        (r: { codigo: string }) => r.codigo === 'ADMIN',
      )?.id;
      if (rolAdminId) {
        expect(
          (
            await t.llamar('pmo', 'post', '/usuarios/asignar-rol', {
              usuario_id: USUARIOS.sinRol,
              rol_id: rolAdminId,
            })
          ).status,
        ).toBe(403);
      }

      const usuarios = await t.llamar('admin', 'get', '/usuarios');
      const usuario = usuarios.body.find(
        (u: { id: number }) => u.id === USUARIOS.sinRol,
      );
      const asignacionId = usuario.usuario_roles_compania[0].id;
      expect(
        (await t.llamar('admin', 'delete', `/usuarios/roles/${asignacionId}`))
          .status,
      ).toBe(200);
      expect(
        (await t.llamar('admin', 'delete', `/usuarios/roles/${asignacionId}`))
          .status,
      ).toBe(404);
    });

    it('activa, desactiva y edita área y empresa', async () => {
      expect(
        (
          await t.llamar('admin', 'patch', `/usuarios/${USUARIOS.pm2}/activo`, {
            activo: false,
          })
        ).status,
      ).toBe(200);
      expect(
        (
          await t.llamar('admin', 'patch', `/usuarios/${USUARIOS.pm2}/activo`, {
            activo: true,
          })
        ).status,
      ).toBe(200);
      expect(
        (
          await t.llamar(
            'admin',
            'patch',
            `/usuarios/${USUARIOS.admin}/activo`,
            { activo: false },
          )
        ).status,
      ).toBe(400);
      expect(
        (
          await t.llamar('admin', 'patch', '/usuarios/99999/activo', {
            activo: false,
          })
        ).status,
      ).toBe(404);
      expect(
        (
          await t.llamar('pmo', 'patch', `/usuarios/${USUARIOS.admin}/activo`, {
            activo: false,
          })
        ).status,
      ).toBe(403);

      expect(
        (
          await t.llamar('admin', 'patch', `/usuarios/${USUARIOS.pm2}/area`, {
            area: 'Proyectos',
          })
        ).status,
      ).toBe(200);
      expect(
        (
          await t.llamar('admin', 'patch', '/usuarios/99999/area', {
            area: 'X',
          })
        ).status,
      ).toBe(404);
      expect(
        (
          await t.llamar('pmo', 'patch', `/usuarios/${USUARIOS.admin}/area`, {
            area: 'X',
          })
        ).status,
      ).toBe(403);

      const empresas = await t.llamar('admin', 'get', '/catalogos/empresas');
      const empresaId = empresas.body[0].id;
      expect(
        (
          await t.llamar(
            'admin',
            'patch',
            `/usuarios/${USUARIOS.pm2}/empresa`,
            { empresa_id: empresaId },
          )
        ).status,
      ).toBe(200);
      expect(
        (
          await t.llamar(
            'admin',
            'patch',
            `/usuarios/${USUARIOS.pm2}/empresa`,
            { empresa_id: null },
          )
        ).status,
      ).toBe(200);
      expect(
        (
          await t.llamar(
            'admin',
            'patch',
            `/usuarios/${USUARIOS.pm2}/empresa`,
            { empresa_id: 99999 },
          )
        ).status,
      ).toBe(404);
      expect(
        (
          await t.llamar('admin', 'patch', '/usuarios/99999/empresa', {
            empresa_id: null,
          })
        ).status,
      ).toBe(404);
      expect(
        (
          await t.llamar(
            'pmo',
            'patch',
            `/usuarios/${USUARIOS.admin}/empresa`,
            { empresa_id: null },
          )
        ).status,
      ).toBe(403);
    });

    it('crea un usuario nuevo al entrar por SSO y avisa a PMO/Admin', async () => {
      const usuarios = t.app.get(UsuariosService);
      const nuevo = await usuarios.findOrCreateSSOUser({
        email: 'nuevo@empresa.com',
        nombre: 'Nuevo',
        proveedor_auth: 'GOOGLE',
      });
      expect(nuevo?.email).toBe('nuevo@empresa.com');
      const existente = await usuarios.findOrCreateSSOUser({
        email: 'nuevo@empresa.com',
        nombre: 'Nuevo',
      });
      expect(existente?.id).toBe(nuevo?.id);
    });
  });

  describe('proyectos', () => {
    it('crea proyectos con PM asignado (solo PMO/Admin) y valida permisos', async () => {
      expect(
        (
          await t.llamar('pmo', 'post', '/proyectos', {
            nombre: 'Asignado',
            compania_id: 1,
            fecha_proyecto: '2026-07-31',
            pm_asignado_id: USUARIOS.pm,
          })
        ).status,
      ).toBe(201);
      expect(
        (
          await t.llamar('pm', 'post', '/proyectos', {
            nombre: 'X',
            compania_id: 1,
            fecha_proyecto: '2026-07-31',
            pm_asignado_id: USUARIOS.pm,
          })
        ).status,
      ).toBe(403);
      expect(
        (
          await t.llamar('admin', 'post', '/proyectos', {
            nombre: 'X',
            compania_id: 1,
            fecha_proyecto: '2026-07-31',
            pm_asignado_id: USUARIOS.interesada,
          })
        ).status,
      ).toBe(400);
      expect(
        (
          await t.llamar('gerencia', 'post', '/proyectos', {
            nombre: 'X',
            compania_id: 1,
            fecha_proyecto: '2026-07-31',
          })
        ).status,
      ).toBe(403);
    });

    it('lista proyectos con filtros y según el rol', async () => {
      await crearProyectoConSiAprobada(t);
      for (const usuario of [
        'pm',
        'pm2',
        'pmo',
        'admin',
        'gerencia',
        'interesada',
        'controlGestion',
      ] as const) {
        expect((await t.llamar(usuario, 'get', '/proyectos')).status).toBe(200);
      }
      for (const filtro of [
        '?aplazados=true',
        '?aplazados=false',
        '?anio=2026',
        '?companiaId=1',
        '?id=2026',
      ]) {
        expect(
          (await t.llamar('pmo', 'get', `/proyectos${filtro}`)).status,
        ).toBe(200);
      }
      expect((await t.llamar('sinRol', 'get', '/proyectos')).status).toBe(403);
    });

    it('aplaza un proyecto y valida el año', async () => {
      const proyecto = await t.llamar('pm', 'post', '/proyectos', {
        nombre: 'Aplazar',
        compania_id: 1,
        fecha_proyecto: '2026-07-31',
      });
      const id = proyecto.body.id;
      expect(
        (
          await t.llamar('pmo', 'patch', `/proyectos/${id}/aplazar`, {
            anio_nuevo: 2026,
            motivo: 'x',
          })
        ).status,
      ).toBe(400);
      expect(
        (
          await t.llamar('pmo', 'patch', `/proyectos/${id}/aplazar`, {
            anio_nuevo: 2028,
            motivo: 'Presupuesto',
          })
        ).status,
      ).toBe(200);
      expect(
        (
          await t.llamar('pmo', 'patch', '/proyectos/NOEXISTE/aplazar', {
            anio_nuevo: 2028,
            motivo: 'x',
          })
        ).status,
      ).toBe(404);
      expect(
        (await t.llamar('pmo', 'get', '/proyectos?aplazados=true')).body.some(
          (p: { id: string }) => p.id === id,
        ),
      ).toBe(true);
      expect(
        (await t.llamar('pm2', 'get', `/proyectos/${id}/procesos`)).status,
      ).toBe(403);
    });

    it('elimina lógicamente un proyecto (servicio)', async () => {
      const proyecto = await t.llamar('pm', 'post', '/proyectos', {
        nombre: 'Eliminar',
        compania_id: 1,
        fecha_proyecto: '2026-07-31',
      });
      const servicio = t.app.get(ProyectosService);
      await expect(
        servicio.eliminarProyecto(USUARIOS.admin, 'NOEXISTE'),
      ).rejects.toThrow('Proyecto no encontrado');
      const conSi = await crearProyectoConSiAprobada(t);
      await expect(
        servicio.eliminarProyecto(USUARIOS.admin, conSi.proyectoId),
      ).rejects.toThrow('No se puede eliminar');
      const r = await servicio.eliminarProyecto(
        USUARIOS.admin,
        proyecto.body.id,
      );
      expect(r.proyectoId).toBe(proyecto.body.id);
    });
  });

  describe('pendientes y backup', () => {
    it('cada rol consulta sus pendientes', async () => {
      for (const usuario of Object.keys(
        USUARIOS,
      ) as (keyof typeof USUARIOS)[]) {
        const r = await t.llamar(usuario, 'get', '/pendientes/mis-pendientes');
        expect([200, 403]).toContain(r.status);
      }
    });

    it('descarga el backup a Excel (solo Admin/PMO/Director)', async () => {
      expect((await t.llamar('pm', 'get', '/backup/excel')).status).toBe(403);
      const r = await t.llamar('admin', 'get', '/backup/excel');
      expect(r.status).toBe(200);
    });
  });
});
