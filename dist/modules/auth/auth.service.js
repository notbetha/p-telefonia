"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
// src/modules/auth/auth.service.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const validateUser = (login, password) => {
    return new Promise((resolve, reject) => {
        db_1.default.query('SELECT * FROM clientsip WHERE login = ?', [login], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return reject('Usuario no encontrado');
            }
            const user = results[0];
            // Comparar la contraseña
            bcryptjs_1.default.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return reject(err);
                }
                if (!isMatch) {
                    return reject('Contraseña incorrecta');
                }
                resolve(user);
            });
        });
    });
};
exports.validateUser = validateUser;
