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
// src/modules/calls/calls.routes.ts
const express_1 = require("express");
const calls_controller_1 = require("./calls.controller"); // Importa el controlador
const router = (0, express_1.Router)(); // Asegúrate de crear una instancia del router
// Ruta para obtener las llamadas por cliente
router.get('/:id_client', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, calls_controller_1.getCalls)(req, res); // Llamamos al controlador getCalls
    }
    catch (error) {
        console.error('Error en obtener llamadas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}));
exports.default = router;