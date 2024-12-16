import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import callsRoutes from './modules/calls/calls.routes';  // Asegúrate de que esta importación sea correcta

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/calls', callsRoutes);  // Asegúrate de que la ruta esté configurada correctamente

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
