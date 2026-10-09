-- =====================================================================
-- PRODUCCIÓN — dar el rol de Administrador a la primera persona real.
-- 1. Esa persona entra UNA vez al aplicativo con Microsoft (queda creada
--    sin rol, en "esperando rol").
-- 2. Reemplaza el correo de abajo por el suyo y ejecuta este script.
-- 3. Vuelve a entrar: ya es Administrador y puede asignar los roles de
--    los demás desde "Gestión de Usuarios".
-- =====================================================================
INSERT INTO usuario_roles_compania (usuario_id, rol_id, compania_id)
SELECT u.id, r.id, NULL
FROM usuarios u
JOIN roles r ON r.codigo = 'ADMIN'
WHERE u.email = 'correo.del.administrador@dominio.com'   -- <== CAMBIAR AQUÍ
  AND NOT EXISTS (
      SELECT 1 FROM usuario_roles_compania urc
      WHERE urc.usuario_id = u.id AND urc.rol_id = r.id AND urc.compania_id IS NULL
  );
