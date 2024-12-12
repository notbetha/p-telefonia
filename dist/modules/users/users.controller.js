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
exports.createUser = exports.getUser = void 0;
const users_service_1 = require("./users.service");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield users_service_1.UserService.getUser(userId);
        if (user) {
            return res.status(200).json(user);
        }
        else {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al obtener el usuario', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    try {
        const user = yield users_service_1.UserService.createUser(login, password);
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear el usuario', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.createUser = createUser;
