import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'gondola.proxy.rlwy.net',
      port: 33485,
      user: 'root',
      password: 'tnjOQcsfIhDPxMOaSeXSuBKWXMWxylVE',
      database: 'railway',
    });

    console.log('Conexión exitosa a la base de datos');
    await connection.end();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
}

testConnection();