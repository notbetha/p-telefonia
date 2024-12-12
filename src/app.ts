import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';  // Verifica la ruta de importación

const app = express();
const PORT = 3000; // Asegúrate de que el puerto sea 3000

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', authRoutes);  // Asegúrate de que la ruta sea '/api' como en el frontend

// Levanta el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});