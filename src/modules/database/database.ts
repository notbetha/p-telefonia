// src/modules/database/database.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'soporte',
  password: process.env.DB_PASSWORD || 's0p0rte.,',
  database: process.env.DB_NAME || 'voipswitch',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
