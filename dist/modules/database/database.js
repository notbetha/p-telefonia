"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// src/modules/database/database.ts
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = mysql2_1.default.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'soporte',
    password: process.env.DB_PASSWORD || 's0p0rte.,',
    database: process.env.DB_NAME || 'voipswitch',
}).promise();
// Verificar conexión a la base de datos
exports.pool.getConnection()
    .then(() => {
    console.log('Conexión a la base de datos exitosa');
})
    .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
});
