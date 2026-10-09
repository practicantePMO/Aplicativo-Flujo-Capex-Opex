// Variables de entorno para las pruebas (no se usan en producción).
process.env.JWT_SECRET =
  process.env.JWT_SECRET || 'secreto-solo-para-pruebas-automatizadas';
process.env.ALLOW_DEV_LOGIN = 'true';
process.env.ALLOWED_EMAIL_DOMAIN =
  process.env.ALLOWED_EMAIL_DOMAIN || 'empresa.com';
process.env.THROTTLE_LIMIT = '100000';
process.env.GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID || 'google-client-id-pruebas';
process.env.MICROSOFT_CLIENT_ID =
  process.env.MICROSOFT_CLIENT_ID || 'microsoft-client-id-pruebas';
process.env.MICROSOFT_TENANT_ID =
  process.env.MICROSOFT_TENANT_ID || 'tenant-pruebas';
process.env.RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
