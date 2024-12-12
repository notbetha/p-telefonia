"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const database_1 = require("../database/database");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    console.log('Datos recibidos:', { login, password });
    try {
        const [rows] = yield database_1.pool.execute('SELECT * FROM clientsip WHERE login = ? AND password = ?', [login, password]);
        console.log('Resultado de la consulta:', rows);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }
        const user = rows[0]; // Tomamos el primer usuario (si existe)
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error desconocido', error: error.message });
        }
        else {
            return res.status(500).json({ message: 'Error desconocido', error: 'Un error desconocido ocurrió' });
        }
    }
});
exports.login = login;
