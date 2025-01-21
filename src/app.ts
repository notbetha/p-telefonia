import express from 'express';
import cors from 'cors';

// Importar las rutas
import authRoutes from './modules/auth/auth.routes'; 
import callsRoutes from './modules/calls/calls.routes'; 

const app = express();
const PORT = 3000; 

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', authRoutes);  // Ruta para autenticación
app.use('/api/calls', callsRoutes);  // Ruta para las llamadas

// Levanta el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
