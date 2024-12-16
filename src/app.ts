import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';  // Verifica la ruta de autenticación
import callsRoutes from './modules/calls/calls.routes';  // Verifica la ruta de llamadas

const app = express();
const PORT = 3000; // Asegúrate de que el puerto sea 3000

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', authRoutes);  // Ruta para autenticación
app.use('/api/calls', callsRoutes);  // Ruta para las llamadas (Nota: 'calls' está como parte de '/api/calls')

// Levanta el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
