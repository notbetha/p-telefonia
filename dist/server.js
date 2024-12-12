"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path")); // Asegúrate de que path está importado
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes")); // Rutas de autenticación
const calls_routes_1 = __importDefault(require("./modules/calls/calls.routes")); // Rutas de llamadas
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)()); // Habilitar CORS
app.use(express_1.default.json()); // Parsear JSON
// Servir archivos estáticos desde la carpeta 'public' (en la carpeta dist también)
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Rutas
app.use('/api/auth', auth_routes_1.default); // Ruta de autenticación
app.use('/api/calls', calls_routes_1.default); // Ruta de llamadas
// Ruta para servir el archivo index.html al acceder a '/'
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname,'p_telefonia', 'public', 'index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
