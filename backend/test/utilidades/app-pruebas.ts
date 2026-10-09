import * as fs from 'fs';
import * as path from 'path';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PGlite } from '@electric-sql/pglite';
import { PrismaPGlite } from 'pglite-prisma-adapter';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { NotificacionesService } from '../../src/notificaciones/notificaciones.service';

// Usuarios del seed (prisma/seed.sql) que usan las pruebas de integración.
export const USUARIOS = {
  admin: 1,
  pm: 2,
  pmo: 3,
  director: 4,
  gerencia: 5,
  presidencia: 6,
  interesada: 7,
  pm2: 8,
  sinRol: 10,
  gerencia1: 11,
  controlGestion: 17,
  activosFijos: 19,
} as const;
export type NombreUsuario = keyof typeof USUARIOS;

const CARPETA_PRISMA = path.join(__dirname, '../../prisma');

// Base Postgres en memoria (PGlite) con todas las migraciones y los datos semilla.
// No necesita un Postgres instalado: cada archivo de pruebas arranca una base nueva y limpia.
async function crearBaseEnMemoria(): Promise<PGlite> {
  const db = new PGlite();
  const migraciones = fs
    .readdirSync(path.join(CARPETA_PRISMA, 'migrations'))
    .filter((nombre) =>
      fs
        .statSync(path.join(CARPETA_PRISMA, 'migrations', nombre))
        .isDirectory(),
    )
    .sort();
  for (const migracion of migraciones) {
    await db.exec(
      fs.readFileSync(
        path.join(CARPETA_PRISMA, 'migrations', migracion, 'migration.sql'),
        'utf8',
      ),
    );
  }
  await db.exec(fs.readFileSync(path.join(CARPETA_PRISMA, 'seed.sql'), 'utf8'));
  return db;
}

export interface Respuesta {
  status: number;
  // skipcq: JS-0323 -- el JSON de cada endpoint tiene una forma distinta y las pruebas lo leen libremente.
  body: any;
}

export interface AppDePruebas {
  app: INestApplication;
  prisma: PrismaClient;
  notificaciones: unknown[];
  // Hace una petición HTTP a la API como el usuario indicado (o sin sesión si es null).
  llamar: (
    usuario: NombreUsuario | null,
    metodo: 'get' | 'post' | 'put' | 'patch' | 'delete',
    ruta: string,
    cuerpo?: object,
  ) => Promise<Respuesta>;
  cerrar: () => Promise<void>;
}

// Levanta la API completa (AppModule) sobre la base en memoria, igual que en producción
// (mismo ValidationPipe), pero con las notificaciones (RabbitMQ) reemplazadas por una lista.
// Con notificacionesFallan, encolar una notificación lanza un error (para probar que el proceso
// no se cae si RabbitMQ falla).
export async function crearAppDePruebas(
  opciones: { notificacionesFallan?: boolean } = {},
): Promise<AppDePruebas> {
  const db = await crearBaseEnMemoria();
  const prisma = new PrismaClient({ adapter: new PrismaPGlite(db) });
  const notificaciones: unknown[] = [];

  const modulo = await Test.createTestingModule({ imports: [AppModule] })
    .overrideProvider(PrismaService)
    .useValue(prisma)
    .overrideProvider(NotificacionesService)
    .useValue({
      encolarNotificacion: (evento: unknown) => {
        if (opciones.notificacionesFallan) {
          return Promise.reject(new Error('RabbitMQ no disponible'));
        }
        notificaciones.push(evento);
        return Promise.resolve();
      },
    })
    .compile();

  const app = modulo.createNestApplication({ logger: false });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(0); // puerto libre al azar; supertest reutiliza el mismo servidor

  const tokens = new Map<NombreUsuario, string>();
  const tokenDe = async (usuario: NombreUsuario) => {
    if (!tokens.has(usuario)) {
      const res = await request(app.getHttpServer())
        .post('/auth/login-dev')
        .send({ usuarioId: USUARIOS[usuario] });
      tokens.set(usuario, res.body.access_token);
    }
    return tokens.get(usuario) as string;
  };

  const llamar: AppDePruebas['llamar'] = async (
    usuario,
    metodo,
    ruta,
    cuerpo,
  ) => {
    let peticion = request(app.getHttpServer())[metodo](ruta);
    if (usuario)
      peticion = peticion.set(
        'Authorization',
        `Bearer ${await tokenDe(usuario)}`,
      );
    const res = cuerpo ? await peticion.send(cuerpo) : await peticion;
    return { status: res.status, body: res.body };
  };

  const cerrar = async () => {
    await app.close();
    await prisma.$disconnect();
    await db.close();
  };

  return { app, prisma, notificaciones, llamar, cerrar };
}

// Datos de una Solicitud de Inversión válida para el proyecto indicado.
export function datosSolicitud(proyectoId: string, cambios: object = {}) {
  return {
    proyecto_id: proyectoId,
    incluye_tradicional: true,
    subprograma_id: 2,
    entregable_planeado: 'Entregable',
    trm: 4000,
    tiene_evaluacion_financiera: false,
    justificacion_sin_evaluacion: 'No aplica',
    metas: [
      { compromiso: 'Meta 1', fecha_inicio: '2026-08-01', indicador: 'Ind' },
    ],
    flujos_caja: [
      { tipo: 'CAPEX', moneda: 'USD', anio: 2026, mes: 8, monto: 100 },
      { tipo: 'OPEX', moneda: 'COP', anio: 2026, mes: 9, monto: 5000 },
      { tipo: 'GCAPEX', moneda: 'COP', anio: 2026, mes: 9, monto: 700 },
    ],
    partes_interesadas_ids: [USUARIOS.interesada],
    link_acta_aprobacion: 'https://a.com/1',
    link_plan_proyecto: 'https://a.com/2',
    link_presentacion_puertas_3: 'https://a.com/3',
    ...cambios,
  };
}

// Crea un proyecto (del PM indicado) y lo deja con la Solicitud de Inversión enviada a revisión.
export async function crearProyectoConSiEnviada(
  t: AppDePruebas,
  pm: NombreUsuario = 'pm',
  companiaId = 1,
) {
  const proyecto = await t.llamar(pm, 'post', '/proyectos', {
    nombre: `Proyecto ${Date.now()}`,
    compania_id: companiaId,
    fecha_proyecto: '2026-07-31',
  });
  const proyectoId: string = proyecto.body.id;
  const si = await t.llamar(
    pm,
    'post',
    '/solicitud-inversion',
    datosSolicitud(proyectoId),
  );
  const siProcesoId: number = si.body.proceso_id;
  await t.llamar(pm, 'post', `/solicitud-inversion/${siProcesoId}/enviar`);
  return { proyectoId, siProcesoId };
}

// Igual que la anterior, pero lleva la Solicitud de Inversión hasta APROBADO_FINAL.
export async function crearProyectoConSiAprobada(
  t: AppDePruebas,
  pm: NombreUsuario = 'pm',
  companiaId = 1,
) {
  const datos = await crearProyectoConSiEnviada(t, pm, companiaId);
  const aprobar = (usuario: NombreUsuario, cuerpo: object) =>
    t.llamar(
      usuario,
      'post',
      `/solicitud-inversion/${datos.siProcesoId}/aprobar`,
      cuerpo,
    );
  await aprobar('pmo', { comentarios: 'ok' });
  await aprobar('interesada', { comentarios: 'ok' });
  await aprobar('director', {
    comentarios: 'ok',
    gerente_id: USUARIOS.gerencia1,
  });
  await aprobar('gerencia1', {
    comentarios: 'ok',
    enviar_a_presidencia: false,
  });
  return datos;
}
