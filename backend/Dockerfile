# ===== ETAPA 1: Construcción (los "andamios") =====
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos solo los archivos de dependencias primero (para aprovechar el cache de Docker:
# si no cambiaste package.json, Docker no vuelve a instalar todo desde cero cada vez)
COPY package*.json ./
RUN npm ci

# Ahora sí copiamos el resto del código
COPY . .

# Genera el cliente de Prisma (necesario para que el código compile y funcione)
RUN NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma generate

# Compila TypeScript -> JavaScript (esto es lo que hace "npm run build")
RUN npm run build

# ===== ETAPA 2: Producción (la "casa terminada", sin andamios) =====
FROM node:20-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

# Solo instalamos las dependencias de PRODUCCIÓN (sin typescript, sin @nestjs/cli, etc.)
COPY package*.json ./
RUN npm ci --omit=dev

# Traemos SOLO lo que ya quedó construido en la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/notificaciones/templates ./dist/src/notificaciones/templates
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/src/main"]