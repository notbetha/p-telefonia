"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes")); // Rutas de autenticación
const calls_routes_1 = __importDefault(require("./modules/calls/calls.routes")); // Rutas de llamadas
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parsear JSON
// Rutas
app.use('/api/auth', auth_routes_1.default); // Ruta de autenticación
app.use('/api/calls', calls_routes_1.default); // Ruta de llamadas
exports.default = app;
