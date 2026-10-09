import { ValidateBy, ValidationOptions } from 'class-validator';

// Límites de longitud compartidos por todos los DTO. Evitan que alguien mande
// textos de varios MB (que llenan la base y los correos) y que un texto más
// largo que la columna de la base de datos termine en un error 500.
export const LIMITE = {
  TEXTO_CORTO: 255, // nombres, títulos (columnas VARCHAR(255))
  TEXTO_MEDIO: 1000, // compromisos, indicadores, descripciones breves
  TEXTO_LARGO: 5000, // justificaciones, observaciones, explicaciones
  URL: 2048,
  LISTA: 200, // máximo de filas en listas (metas, flujo de caja, anexos...)
};

// Rechaza links con esquemas peligrosos (javascript:, data:, vbscript:, file:)
// aunque vengan "disfrazados" con espacios, tabs o saltos de línea en medio,
// que los navegadores ignoran. Cualquier otro texto se acepta igual que antes.
const ESQUEMA_PELIGROSO = /^(javascript|data|vbscript|file):/i;

export function EsLinkSeguro(opciones?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'esLinkSeguro',
      validator: {
        validate: (valor: unknown) => {
          if (typeof valor !== 'string') return true;
          // eslint-disable-next-line no-control-regex
          const sinEspacios = valor.replace(/[\u0000-\u0020\u007f-\u009f]/gu, '');
          return !ESQUEMA_PELIGROSO.test(sinEspacios);
        },
        defaultMessage: () => 'Ese link no es válido.',
      },
    },
    opciones,
  );
}