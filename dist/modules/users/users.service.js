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
exports.UserService = void 0;
const database_1 = require("../database/database");
class UserService {
    static getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.pool.execute('SELECT * FROM clientsip WHERE id_client = ?', [userId]);
                if (rows.length === 0) {
                    return null;
                }
                return rows[0];
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al obtener el usuario');
            }
        });
    }
    static createUser(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.pool.execute('INSERT INTO clientsip (login, password) VALUES (?, ?)', [login, password]);
                return { id_client: rows.insertId, login };
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al crear el usuario');
            }
        });
    }
}
exports.UserService = UserService;
