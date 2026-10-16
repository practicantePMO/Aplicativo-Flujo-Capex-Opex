-- El inicio de sesión con Google se retiró: el único proveedor es Microsoft Entra ID ('AZURE_AD').
ALTER TABLE "usuarios" ALTER COLUMN "proveedor_auth" SET DEFAULT 'AZURE_AD';
UPDATE "usuarios" SET "proveedor_auth" = 'AZURE_AD' WHERE "proveedor_auth" = 'GOOGLE';
