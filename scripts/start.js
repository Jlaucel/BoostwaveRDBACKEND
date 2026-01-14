// Script para iniciar la aplicación de forma compatible con Windows y Linux
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const isWindows = process.platform === 'win32';
const isProduction = process.env.NODE_ENV === 'production';
const distMainExists = fs.existsSync(path.join(__dirname, '..', 'dist', 'main.js'));

console.log('Environment:', {
  platform: process.platform,
  nodeEnv: process.env.NODE_ENV || 'not set',
  port: process.env.PORT || 'not set (will use 8080)',
  distExists: distMainExists
});

// Solo ejecutar kill-port en Windows y desarrollo local
if (isWindows && !isProduction) {
  try {
    execSync('npm run kill-port', { stdio: 'ignore' });
  } catch (e) {
    // Ignorar errores de kill-port
  }
}

// Si existe dist/main.js (después del build), usar producción
if (distMainExists) {
  console.log('✅ Starting in production mode (using dist/main.js)...');
  try {
    execSync('node dist/main', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Error starting application:', error.message);
    process.exit(1);
  }
} else {
  console.log('⚠️ Starting in development mode (dist/main.js not found)...');
  try {
    execSync('nest start', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Error starting application:', error.message);
    process.exit(1);
  }
}
