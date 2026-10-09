/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // Margen amplio: en equipos lentos (o con antivirus) las pruebas largas tardan varios minutos.
    testTimeout: 300000,
    // Las pruebas no dependen del .env de cada equipo: el inicio de sesión
    // con Google y Microsoft se prueba activándolo solo dentro de esas pruebas.
    env: {
      VITE_GOOGLE_CLIENT_ID: '',
      VITE_MICROSOFT_CLIENT_ID: '',
      VITE_MICROSOFT_TENANT_ID: '',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'lcov', 'cobertura', 'json-summary'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/**/types/**',
        'src/**/types.ts',
        'src/test/**',
        'src/**/*.test.{ts,tsx}',
      ],
    },
  },
})
