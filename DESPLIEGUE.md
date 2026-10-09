# Consideraciones para el despliegue en producción

Este documento resume lo que el aplicativo necesita para funcionar correctamente en un servidor de producción. No reemplaza los procedimientos propios del equipo de infraestructura: explica cómo está construido el sistema y qué espera de su entorno, para que la puesta en marcha se ajuste a eso.

---

## 1. Componentes del sistema

El aplicativo tiene cuatro piezas:

| Componente        | Tecnología                        | Función                                              |
| ----------------- | --------------------------------- | ---------------------------------------------------- |
| **Frontend**      | React + Vite (archivos estáticos) | Interfaz web que usan los colaboradores              |
| **Backend (API)** | NestJS (Node.js)                  | Lógica del negocio, permisos y flujos de aprobación  |
| **Base de datos** | PostgreSQL 16                     | Información de proyectos, procesos, usuarios y roles |
| **Mensajería**    | RabbitMQ                          | Cola de notificaciones por correo (SMTP)             |

El repositorio trae un `docker-compose.yml` que levanta la base de datos, RabbitMQ y el backend. El frontend se compila (`npm run build`) y se publica como sitio estático en el servidor web que se defina.

---

## 2. Autenticación con Microsoft (Entra ID / Azure AD)

Los colaboradores entran con su cuenta corporativa de Microsoft. Para esto, la aplicación debe estar **registrada en el Entra ID de la organización**, como _Aplicación de página única (SPA)_.

- **Quién hace qué en el inicio de sesión:**
  - el frontend abre la ventana de Microsoft y recibe un _token de identidad_;
  - el backend verifica que ese token sea auténtico, que corresponda a la aplicación registrada y al inquilino de la organización, y que el correo pertenezca a un dominio permitido.
- **Datos del registro que necesita el aplicativo:**
  - el **Id. de aplicación (cliente)**;
  - el **Id. de directorio (inquilino)**.

  Los usan tanto el backend como el frontend.

- **URI de redirección:** Microsoft devuelve la respuesta del inicio de sesión a la página `/blank.html` del frontend. Por eso, en el registro debe estar como URI de redirección `https://<dominio-del-frontend>/blank.html`.
- **Un solo inquilino:** el sistema está pensado para un único inquilino de Microsoft. Si algún dominio corporativo pertenece a un inquilino distinto (por ejemplo, una filial con su propio Microsoft 365), haría falta registrar la aplicación como multiinquilino y ajustar la validación del emisor del token en el backend.
- **Google:** el inicio de sesión con Google también está soportado, pero es opcional. Si no se configura, ese botón no aparece.

---

## 3. Dominios de correo permitidos

| Dominio               | Compañia          |
| --------------------- | ----------------- |
| @noel.com.co          | Noel              |
| @abimarfoods.com      | Abimar            |
| @gcfoods.com.co       | GCFoods           |
| @gcfoods.com          | GCFoods           |
| @molinosantamarta.com | Molinos           |
| @naturela.com         | Naturela          |
| @pozuelo.cr           | Pozuelo           |
| @tmluc.com            | Tmuluc            |
| @serviciosnutresa.com | Servicios Nutresa |
| @alimentosdoria.com   | Doria             |
| @pastascomarrico.com  | Pastas            |
| @yupi.com.co          | Yupi              |
| @yupi.com             | Yupi              |

```
ALLOWED_EMAIL_DOMAIN=empresa.com,filial.com.co,otraempresa.com
```

- Una persona de un dominio no incluido recibe "Acceso denegado".
- La persona que entra por primera vez queda registrada **sin roles**, en estado "esperando rol", hasta que un Administrador se los asigne desde _Gestión de Usuarios_.

---

## 4. Configuración del backend

El backend se configura con variables de entorno. La plantilla con todas ellas, y la explicación de cada una, está en `backend/.env.production.example`. Las que más influyen en el comportamiento son:

| Variable                                     | Por qué importa                                                                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV=production`                        | Activa el modo producción                                                                                                          |
| `JWT_SECRET`                                 | Firma las sesiones. Debe ser un valor largo, aleatorio y exclusivo de producción. Sin ella, el servidor no arranca                 |
| `ALLOWED_EMAIL_DOMAIN`                       | Dominios autorizados (sección 3). Sin ella, el servidor no arranca                                                                 |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_TENANT_ID` | Datos del registro en Entra ID (sección 2)                                                                                         |
| `CORS_ORIGIN`                                | URL exacta del frontend. El backend solo acepta peticiones de ese origen                                                           |
| `DATABASE_URL`, `RABBITMQ_URL`               | Conexión a PostgreSQL y RabbitMQ                                                                                                   |
| `SMTP_*`                                     | Servidor de correo para las notificaciones                                                                                         |
| `TRUST_PROXY`                                | Necesaria si hay un proxy o balanceador delante del backend; así el límite de peticiones se aplica por usuario y no a todos juntos |
| `ALLOW_DEV_LOGIN`                            | Debe ser `false` o no existir (ver sección 7)                                                                                      |

**Base de datos:** el contenedor del backend ejecuta `prisma migrate deploy` cada vez que arranca. Así crea y mantiene actualizada la estructura de la base de datos sin intervención manual.

---

## 5. Configuración del frontend

El frontend es un conjunto de archivos estáticos. Sus variables (`VITE_*`) **se incorporan en el momento de compilar**, no al ejecutarse; por eso deben estar definidas antes de `npm run build`. La plantilla está en `frontend/.env.example`:

| Variable                                               | Contenido                                                              |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| `VITE_API_URL`                                         | URL pública del backend                                                |
| `VITE_MICROSOFT_CLIENT_ID`, `VITE_MICROSOFT_TENANT_ID` | Los mismos datos del registro en Entra ID                              |
| `VITE_GOOGLE_CLIENT_ID`                                | Opcional. Si queda vacía, no se muestra el inicio de sesión con Google |

Todo lo que empieza por `VITE_` queda visible en el navegador. Ninguno de estos valores es secreto, pero nunca deben ponerse contraseñas en ellos.

---

## 6. Datos iniciales y primer administrador

- **Lo que crean las migraciones:** roles, compañías (Galletas, Pastas y Snacks) y catálogos de clasificación.
- **Usuarios de ejemplo:** la migración inicial también crea algunos usuarios de ejemplo con correos `@empresa.com`, pensados para desarrollo. En producción no tienen utilidad.
- **No usar `seed.sql` en producción:** el archivo `prisma/seed.sql` es exclusivo de desarrollo y agrega más usuarios de prueba.
- **Scripts de puesta en marcha:** en `backend/prisma/produccion/` hay dos scripts SQL pensados para correr una sola vez:
  1. **`1-limpiar-usuarios-de-prueba.sql`**: desactiva los usuarios de ejemplo y les quita sus roles. No borra registros, para no afectar ninguna referencia.
  2. **`2-asignar-primer-administrador.sql`**: otorga el rol de Administrador a la primera persona real. Esa persona debe haber entrado una vez con Microsoft, y su correo se indica en la línea marcada en el script.
- **Gestión posterior de roles:** desde ese momento, el Administrador asigna los roles de los demás usuarios desde el propio aplicativo.

---

## 7. Herramientas de desarrollo y seguridad

- **Selector de usuarios de prueba (DevSwitcher):** existe solo para desarrollo.
  - En la compilación de producción no aparece, porque Vite lo excluye.
  - Su ruta en el backend (`/auth/login-dev`) responde "no encontrado" mientras `ALLOW_DEV_LOGIN` no sea `true`.
  - No hace falta eliminarlo del código, pero es indispensable que `ALLOW_DEV_LOGIN` no esté activo en producción.
- **Cabeceras de seguridad y límite de peticiones:** el backend ya aplica cabeceras HTTP de seguridad (Helmet) y un límite de peticiones por IP (`THROTTLE_LIMIT`, 300 por minuto por defecto; el inicio de sesión tiene un límite más estricto).
- **Puertos:** el `docker-compose.yml` publica PostgreSQL y RabbitMQ solo en `127.0.0.1`. No quedan expuestos fuera del servidor.

---

## 8. Cómo se ve el sistema funcionando bien

- La API responde, y una petición sin sesión a `/auth/me` devuelve **401**.
- La pantalla de inicio muestra **"Iniciar sesión con Microsoft"**.
- Un colaborador de cualquiera de los dominios autorizados puede entrar.
- Un correo externo, por ejemplo de Gmail, recibe "Acceso denegado".
- El Administrador ve _Gestión de Usuarios_ y puede asignar roles.
- Las compañías aparecen como **Galletas, Pastas y Snacks**.
- Al avanzar un proceso (por ejemplo, enviar una Solicitud de Inversión), llegan las notificaciones por correo a los responsables de la siguiente etapa.
