// Jest (sin --experimental-vm-modules) no admite `import()` dinámico dentro de su sandbox.
// PGlite (la base Postgres en memoria que usan las pruebas) carga así algunos módulos de Node
// (fs, zlib, ...). Este transformador cambia esos `import("x")` por un `require("x")` solo en
// los archivos de PGlite, para que las pruebas corran con un `npm run test:cov` normal.
// Se guarda `require` en otra variable porque PGlite declara su propia `var require` adentro.
module.exports = {
  process(codigo) {
    const transformado = codigo.replace(/\bimport\((["'][^"']+["'])\)/g, 'Promise.resolve(__requireNode($1))');
    return { code: `var __requireNode = require;\n${transformado}` };
  },
};
