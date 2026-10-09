import { Injectable, NotFoundException, ConflictException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';
import { AsignarRolDto } from './dto/asignar-rol.dto';
import { NotificacionesService } from '../notificaciones/notificaciones.service';


@Injectable()
export class UsuariosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permisos: PermisosService,
    private readonly notificaciones: NotificacionesService,
  ) {}

  findByEmail(email: string) {
    return this.prisma.usuarios.findUnique({
      where: { email },
      select: {
        id: true,
        nombre: true,
        email: true,
        proveedor_auth: true,
        area: true,
        activo: true,
        fecha_creacion: true,
        usuario_roles_compania: {
          select: {
            roles: { select: { id: true, codigo: true, nombre: true } },
            companias: { select: { id: true, nombre: true } },
          },
        },
      },
    });
  }

  async findOrCreateSSOUser(data: { email: string; nombre: string; proveedor_auth?: string }) {
    let usuario = await this.findByEmail(data.email);
    const esRealmenteNuevo = !usuario;

    if (!usuario) {
      const nuevo = await this.prisma.usuarios.create({
        data: {
          email: data.email,
          nombre: data.nombre,
          proveedor_auth: data.proveedor_auth || 'GOOGLE',
          activo: true,
        },
      });
      usuario = await this.findByEmail(nuevo.email);
    }

    if (esRealmenteNuevo) {
      try {
        const destinatarios = await this.obtenerEmailsPmoYAdmin();
        if (destinatarios.length) {
          await this.notificaciones.encolarNotificacion({
            tipo: 'USUARIO_NUEVO_PENDIENTE',
            destinatarios,
            datos: { nombreNuevoUsuario: data.nombre, emailNuevoUsuario: data.email },
          });
        }
      } catch (error) {
        console.error('Error al notificar usuario nuevo pendiente:', error);
      }
    }

    return usuario;
  }

  private async obtenerEmailsPmoYAdmin(): Promise<string[]> {
    const usuarios = await this.prisma.usuarios.findMany({
      where: {
        activo: true,
        eliminado_el: null,
        usuario_roles_compania: { some: { roles: { codigo: { in: ['PMO', 'ADMIN'] } } } },
      },
      select: { email: true },
    });
    return Array.from(new Set(usuarios.map((u) => u.email).filter((e): e is string => Boolean(e))));
  }

  findPendientes() {
    return this.prisma.usuarios.findMany({
      where: {
        activo: true,
        eliminado_el: null,
        usuario_roles_compania: { none: {} },
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        area: true,
        fecha_creacion: true,
      },
      orderBy: { fecha_creacion: 'desc' },
    });
  }

  async asignarRolCompania(usuarioSolicitanteId: number, dto: AsignarRolDto) {
    const usuario = await this.prisma.usuarios.findUnique({ where: { id: dto.usuario_id } });
    if (!usuario) {
      throw new NotFoundException('El usuario especificado no existe.');
    }

    const rol = await this.prisma.roles.findUnique({ where: { id: dto.rol_id } });
    if (!rol) {
      throw new NotFoundException('El rol especificado no existe.');
    }

    const esAdmin = await this.permisos.esAdminGlobal(usuarioSolicitanteId);

    if (!esAdmin) {
      if (rol.codigo === 'ADMIN') {
        throw new ForbiddenException('No tienes permiso para asignar el rol de Administrador.');
      }

      if (dto.compania_id) {
        await this.permisos.exigirRolParaCompania(usuarioSolicitanteId, ['PMO'], dto.compania_id);
      } else {
        const esPmoGlobal = await this.permisos.tieneRolGlobal(usuarioSolicitanteId, ['PMO']);
        if (!esPmoGlobal) {
          throw new ForbiddenException('No tienes permiso para asignar roles globales.');
        }
      }
    }

    let asignacion;
    try {
      asignacion = await this.prisma.usuario_roles_compania.create({
        data: {
          usuario_id: dto.usuario_id,
          rol_id: dto.rol_id,
          compania_id: dto.compania_id,
        },
        select: {
          id: true,
          roles: { select: { codigo: true, nombre: true } },
          companias: { select: { nombre: true } },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Este usuario ya tiene ese rol asignado en esa compañía.');
      }
      throw error;
    }

    try {
      if (usuario.email) {
        await this.notificaciones.encolarNotificacion({
          tipo: 'ROL_ASIGNADO',
          destinatarios: [usuario.email],
          datos: {
            nombreUsuario: usuario.nombre,
            nombreRol: asignacion.roles?.nombre || rol.nombre,
            nombreCompania: asignacion.companias?.nombre || 'Todas (Global)',
          },
        });
      }
    } catch (error) {
      console.error('Error al notificar asignación de rol:', error);
    }

    return asignacion;
  }

  findActivos() {
    return this.prisma.usuarios.findMany({
      where: { activo: true, eliminado_el: null },
      select: { id: true, nombre: true, email: true, area: true },
      orderBy: { nombre: 'asc' },
    });
  }

  findPorRolYCompania(codigoRol: string, companiaId: number) {
    return this.prisma.usuarios.findMany({
      where: {
        activo: true,
        eliminado_el: null,
        usuario_roles_compania: {
          some: { roles: { codigo: codigoRol }, OR: [{ compania_id: null }, { compania_id: companiaId }] },
        },
      },
      select: { id: true, nombre: true, email: true, area: true },
      orderBy: { nombre: 'asc' },
    });
  }

  findTodos() {
    return this.prisma.usuarios.findMany({
      where: { eliminado_el: null },
      select: {
        id: true,
        nombre: true,
        email: true,
        area: true,
        empresa: { select: { id: true, nombre: true, compania_id: true, companias: { select: { id: true, nombre: true } } } },
        activo: true,
        fecha_creacion: true,
        usuario_roles_compania: {
          select: {
            id: true,
            roles: { select: { id: true, codigo: true, nombre: true } },
            companias: { select: { id: true, nombre: true } },
          },
        },
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async quitarRol(usuarioSolicitanteId: number, asignacionId: number) {
    const asignacion = await this.prisma.usuario_roles_compania.findUnique({
      where: { id: asignacionId },
      include: { roles: true },
    });
    if (!asignacion) {
      throw new NotFoundException('Esa asignación de rol no existe (puede que ya se haya quitado).');
    }

    const esAdmin = await this.permisos.esAdminGlobal(usuarioSolicitanteId);
    if (!esAdmin && asignacion.roles?.codigo === 'ADMIN') {
      throw new ForbiddenException('No tienes permiso para quitar el rol de Administrador.');
    }
    await this.exigirGestionSobreRoles(usuarioSolicitanteId, [asignacion]);

    await this.prisma.usuario_roles_compania.delete({ where: { id: asignacionId } });
    return { mensaje: 'Rol removido exitosamente.' };
  }

  async cambiarActivo(usuarioSolicitanteId: number, usuarioId: number, activo: boolean) {
    if (usuarioSolicitanteId === usuarioId) {
      throw new BadRequestException('No puedes activar o desactivar tu propia cuenta.');
    }

    const usuario = await this.prisma.usuarios.findUnique({
      where: { id: usuarioId },
      include: { usuario_roles_compania: { include: { roles: true } } },
    });
    if (!usuario) throw new NotFoundException('El usuario no existe.');

    const esAdminObjetivo = usuario.usuario_roles_compania.some((r) => r.roles?.codigo === 'ADMIN');
    const esAdminSolicitante = await this.permisos.esAdminGlobal(usuarioSolicitanteId);
    if (esAdminObjetivo && !esAdminSolicitante) {
      throw new ForbiddenException('No tienes permiso para modificar a un Administrador.');
    }

    await this.exigirGestionSobreRoles(usuarioSolicitanteId, usuario.usuario_roles_compania);

    await this.prisma.usuarios.update({ where: { id: usuarioId }, data: { activo } });
    return { mensaje: activo ? 'Usuario activado exitosamente.' : 'Usuario desactivado exitosamente.' };
  }

  async editarArea(usuarioSolicitanteId: number, usuarioId: number, area: string) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id: usuarioId },
      include: { usuario_roles_compania: { include: { roles: true } } },
    });
    if (!usuario) throw new NotFoundException('El usuario no existe.');

    const esAdminObjetivo = usuario.usuario_roles_compania.some((r) => r.roles?.codigo === 'ADMIN');
    const esAdminSolicitante = await this.permisos.esAdminGlobal(usuarioSolicitanteId);
    if (esAdminObjetivo && !esAdminSolicitante) {
      throw new ForbiddenException('No tienes permiso para modificar a un Administrador.');
    }

    await this.exigirGestionSobreRoles(usuarioSolicitanteId, usuario.usuario_roles_compania);
    await this.prisma.usuarios.update({ where: { id: usuarioId }, data: { area: area.trim() } });
    return { mensaje: 'Área actualizada exitosamente.' };
  }

  async editarEmpresa(usuarioSolicitanteId: number, usuarioId: number, empresaId: number | null) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { id: usuarioId },
      include: { usuario_roles_compania: { include: { roles: true } } },
    });
    if (!usuario) throw new NotFoundException('El usuario no existe.');

    const esAdminObjetivo = usuario.usuario_roles_compania.some((r) => r.roles?.codigo === 'ADMIN');
    const esAdminSolicitante = await this.permisos.esAdminGlobal(usuarioSolicitanteId);
    if (esAdminObjetivo && !esAdminSolicitante) {
      throw new ForbiddenException('No tienes permiso para modificar a un Administrador.');
    }
    await this.exigirGestionSobreRoles(usuarioSolicitanteId, usuario.usuario_roles_compania);

    if (empresaId !== null) {
      const empresa = await this.prisma.empresas.findUnique({ where: { id: empresaId } });
      if (!empresa) throw new NotFoundException('La empresa seleccionada no existe.');
      const companias = await this.companiasGestionables(usuarioSolicitanteId);
      if (companias !== null && !companias.includes(empresa.compania_id)) {
        throw new ForbiddenException('Solo puedes asignar empresas de las compañías donde eres PMO.');
      }
    }

    await this.prisma.usuarios.update({ where: { id: usuarioId }, data: { empresa_id: empresaId } });
    return { mensaje: 'Empresa actualizada exitosamente.' };
  }

  // null = gestiona TODAS las compañías (Administrador o PMO global).
  // Si no, devuelve las compañías donde el usuario es PMO.
  private async companiasGestionables(usuarioId: number): Promise<number[] | null> {
    if (await this.permisos.esAdminGlobal(usuarioId)) return null;
    if (await this.permisos.tieneRolGlobal(usuarioId, ['PMO'])) return null;

    const asignaciones = await this.prisma.usuario_roles_compania.findMany({
      where: { usuario_id: usuarioId, roles: { codigo: 'PMO' }, compania_id: { not: null } },
      select: { compania_id: true },
    });
    return asignaciones.map((a) => a.compania_id as number);
  }

  // Un PMO de compañía solo puede tocar roles/usuarios de SUS compañías.
  // Un rol global (compania_id = null) solo lo gestiona un Admin o PMO global.
  // Usuarios sin roles (pendientes) los puede gestionar cualquier PMO.
  private async exigirGestionSobreRoles(usuarioSolicitanteId: number, roles: { compania_id: number | null }[]) {
    const companias = await this.companiasGestionables(usuarioSolicitanteId);
    if (companias === null) return;

    const fueraDeAlcance = roles.some((r) => r.compania_id === null || !companias.includes(r.compania_id));
    if (fueraDeAlcance) {
      throw new ForbiddenException('Solo puedes gestionar usuarios y roles de las compañías donde eres PMO.');
    }
  }

  findRolesDisponibles() {
    return this.prisma.roles.findMany({
      select: { id: true, codigo: true, nombre: true },
      orderBy: { nombre: 'asc' },
    });
  }
}