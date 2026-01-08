"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
async function testConnection() {
    try {
        const connection = await promise_1.default.createConnection({
            host: 'gondola.proxy.rlwy.net',
            port: 33485,
            user: 'root',
            password: 'tnjOQcsfIhDPxMOaSeXSuBKWXMWxylVE',
            database: 'railway',
        });
        console.log('Conexión exitosa a la base de datos');
        await connection.end();
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
}
testConnection();
//# sourceMappingURL=test.js.map