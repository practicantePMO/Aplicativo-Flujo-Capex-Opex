// Se ejecuta una vez antes de todas las pruebas (globalSetup de Jest).
// `npm ci` instala las librerías pero no genera el cliente de Prisma; si todavía
// no existe (por ejemplo, en una máquina o pipeline recién clonado), lo genera aquí
// para que las pruebas no fallen con "Cannot find module '.prisma/client/default'".
const { existsSync } = require('fs');
const { join } = require('path');
const { execSync } = require('child_process');

module.exports = async () => {
  const carpetaBackend = join(__dirname, '..');
  const cliente = join(carpetaBackend, 'node_modules', '.prisma', 'client', 'default.js');
  if (!existsSync(cliente)) {
    execSync('npx prisma generate', { cwd: carpetaBackend, stdio: 'inherit' });
  }
};
