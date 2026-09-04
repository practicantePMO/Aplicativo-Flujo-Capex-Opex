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

  // 1. Buscar usuario por email con sus roles y compañías (Sin exponer password_hash)
  async findByEmail(email: string) {
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

  // 2. Registro/Ingreso automático desde SSO
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
      // 📬 Solo la primera vez — avisamos a quien pueda asignarle un rol
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
        // Un fallo al notificar nunca debe impedir que el usuario pueda loguearse
        console.error('Error al notificar usuario nuevo pendiente:', error);
      }
    }

    return usuario;
  }

  // 📖 Todos los PMO/ADMIN del sistema, sin importar compañía (el usuario nuevo
  // todavía no tiene ninguna compañía asignada, así que no podemos filtrar por eso)
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

  // 3. Consultar usuarios en estado "PENDIENTE" (Sin roles asignados)
  async findPendientes() {
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

  // 4. Asignar Rol y Compañía — con protección contra duplicados Y contra escalación de privilegios
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
      // Nadie que no sea ADMIN puede otorgar el rol ADMIN — esto NO cambia
      if (rol.codigo === 'ADMIN') {
        throw new ForbiddenException('No tienes permiso para asignar el rol de Administrador.');
      }

      if (dto.compania_id) {
        // Asignación limitada a una compañía: debe tener autoridad de PMO ahí
        await this.permisos.exigirRolParaCompania(usuarioSolicitanteId, ['PMO'], dto.compania_id);
      } else {
        // Asignación GLOBAL: solo si el PMO solicitante es él mismo global,
        // no un PMO acotado a una sola compañía.
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

    // 📬 Avisamos al usuario (nuevo o antiguo) que ya tiene un rol para usar el sistema.
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
      // Un fallo al notificar nunca debe impedir que el rol quede asignado
      console.error('Error al notificar asignación de rol:', error);
    }

    return asignacion;
  }

  async findActivos() {
    return this.prisma.usuarios.findMany({
      where: { activo: true, eliminado_el: null },
      select: { id: true, nombre: true, email: true, area: true },
      orderBy: { nombre: 'asc' },
    });
  }

  // 🎯 Usuarios activos con un rol puntual (global o de esa compañía) — usado,
  // por ejemplo, para que Dirección PMO elija a qué gerente enviar el proceso.
  async findPorRolYCompania(codigoRol: string, companiaId: number) {
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

  // 5. Listar TODOS los usuarios (activos e inactivos) con sus roles — para la pantalla de gestión
  async findTodos() {
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

  // 6. Quitar un rol ya asignado
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

    await this.prisma.usuario_roles_compania.delete({ where: { id: asignacionId } });
    return { mensaje: 'Rol removido exitosamente.' };
  }

  // 7. Activar o desactivar un usuario
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

    await this.prisma.usuarios.update({ where: { id: usuarioId }, data: { activo } });
    return { mensaje: activo ? 'Usuario activado exitosamente.' : 'Usuario desactivado exitosamente.' };
  }

  // ✏️ Editar el área de un usuario — antes no existía NINGUNA forma de
  // hacerlo desde la app (el campo solo se leía, nunca se escribía).
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

    await this.prisma.usuarios.update({ where: { id: usuarioId }, data: { area: area.trim() } });
    return { mensaje: 'Área actualizada exitosamente.' };
  }

  // 🆕 Editar la empresa de un usuario (opcional — empresaId puede ser null)
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

    if (empresaId !== null) {
      const empresa = await this.prisma.empresas.findUnique({ where: { id: empresaId } });
      if (!empresa) throw new NotFoundException('La empresa seleccionada no existe.');
    }

    await this.prisma.usuarios.update({ where: { id: usuarioId }, data: { empresa_id: empresaId } });
    return { mensaje: 'Empresa actualizada exitosamente.' };
  }

  // 8. Catálogo de roles disponibles (para el desplegable de "asignar rol")
  async findRolesDisponibles() {
    return this.prisma.roles.findMany({
      select: { id: true, codigo: true, nombre: true },
      orderBy: { nombre: 'asc' },
    });
  }
}