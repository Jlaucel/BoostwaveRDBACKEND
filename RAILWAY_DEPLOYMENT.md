# Guía de Despliegue en Railway

Esta guía explica cómo desplegar el backend de BoostWave CRM en Railway.

## Requisitos Previos

1. Cuenta en [Railway](https://railway.app)
2. Repositorio Git configurado
3. Servicio MySQL en Railway (o externo)

## Pasos de Despliegue

### 1. Conectar el Repositorio

1. Ve a tu proyecto en Railway
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu repositorio y selecciona la rama principal

### 2. Configurar Variables de Entorno

Railway detectará automáticamente las variables de entorno necesarias si tienes un servicio MySQL conectado. Si no, configura manualmente:

#### Variables de Base de Datos (si MySQL está en Railway):
- `MYSQLHOST` - Automático si MySQL está en Railway
- `MYSQLPORT` - Automático (normalmente 3306)
- `MYSQLUSER` - Automático (normalmente `root`)
- `MYSQL_ROOT_PASSWORD` - Automático
- `MYSQLPASSWORD` - Automático
- `MYSQLDATABASE` - Automático
- `MYSQL_DATABASE` - Automático

#### Variables de Base de Datos (si MySQL es externo):
Configura manualmente todas las variables anteriores con los valores de tu base de datos.

#### Variables de Aplicación:
- `PORT` - **Railway lo configura automáticamente**, no necesitas establecerlo manualmente
- `NODE_ENV` - Establece como `production`
- `JWT_SECRET` - **OBLIGATORIO**: Genera un secreto seguro (ej: `openssl rand -base64 32`)
- `JWT_EXPIRES_IN` - Opcional (default: `1h`)

### 3. Configurar el Build y Start

Railway detectará automáticamente que es un proyecto NestJS y ejecutará:
- `npm install`
- `npm run build` (si existe)
- `npm start` o `npm run start:prod`

**Nota**: El script `start:prod` está configurado para ejecutar `node dist/main`, que es correcto para producción.

### 4. Verificar el Despliegue

Una vez desplegado, puedes:
- Acceder a la API en la URL proporcionada por Railway
- Acceder a Swagger en: `https://tu-app.railway.app/api`
- Verificar los logs en el dashboard de Railway

## Configuración de Base de Datos

### Opción 1: MySQL en Railway (Recomendado)

1. En tu proyecto Railway, haz clic en "New"
2. Selecciona "Database" → "Add MySQL"
3. Railway configurará automáticamente todas las variables de entorno necesarias
4. Las tablas se crearán automáticamente si `synchronize: true` está habilitado (solo en desarrollo)

### Opción 2: MySQL Externo

Si usas una base de datos MySQL externa:
1. Configura manualmente todas las variables de entorno relacionadas con MySQL
2. Asegúrate de que la base de datos sea accesible desde Railway

## Migraciones de Base de Datos

El proyecto tiene `synchronize: false` en producción por seguridad. Para aplicar cambios de esquema:

1. Usa migraciones de TypeORM (recomendado)
2. O ejecuta manualmente los scripts SQL en `migrations/`

## Troubleshooting

### Error: "JWT_SECRET must be set in production"
- Solución: Configura la variable de entorno `JWT_SECRET` en Railway

### Error: "Unable to connect to the database"
- Verifica que todas las variables de entorno de MySQL estén configuradas
- Verifica que el servicio MySQL esté corriendo en Railway
- Verifica que la base de datos sea accesible desde Railway

### Error: "Port already in use"
- Railway maneja el puerto automáticamente, no deberías tener este error
- Si ocurre, verifica que no haya otro servicio usando el mismo puerto

### La aplicación no inicia
- Revisa los logs en Railway
- Verifica que `npm run build` se ejecute correctamente
- Verifica que todas las variables de entorno requeridas estén configuradas

## Scripts Disponibles

- `npm run build` - Compila el proyecto TypeScript
- `npm run start:prod` - Inicia la aplicación en producción (usado por Railway)
- `npm run start:dev` - Inicia en modo desarrollo (solo local, usa kill-port)
- `npm run start` - Inicia en modo desarrollo (solo local, usa kill-port)

**Nota**: Los scripts `start` y `start:dev` incluyen `kill-port` que es específico de Windows y no funcionará en Railway. Railway usará automáticamente `start:prod`.

## Seguridad

✅ **Credenciales eliminadas del código**: No hay credenciales hardcodeadas
✅ **Variables de entorno**: Todas las configuraciones sensibles usan variables de entorno
✅ **JWT_SECRET**: Requerido en producción, fallará si no está configurado
✅ **Synchronize deshabilitado**: En producción, `synchronize: false` previene cambios accidentales en la base de datos

## Monitoreo

- Revisa los logs en tiempo real en el dashboard de Railway
- Configura alertas para errores críticos
- Monitorea el uso de recursos (CPU, memoria, red)
