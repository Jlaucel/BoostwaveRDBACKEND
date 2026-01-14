// Script para iniciar la aplicación de forma compatible con Windows y Linux
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const isWindows = process.platform === 'win32';
const isProduction = process.env.NODE_ENV === 'production';
const distMainExists = fs.existsSync(path.join(__dirname, '..', 'dist', 'main.js'));

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
  console.log('Starting in production mode...');
  execSync('node dist/main', { stdio: 'inherit' });
} else {
  console.log('Starting in development mode...');
  execSync('nest start', { stdio: 'inherit' });
}
