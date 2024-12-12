// src/modules/calls/calls.routes.ts
import { Router, Request, Response } from 'express';
import { getCalls } from './calls.controller';  // Importa el controlador

const router = Router();

// Ruta para obtener las llamadas por cliente
router.get('/:id_client', async (req: Request, res: Response) => {
  const { id_client } = req.params;  // Extrae el id_client desde los parámetros de la URL

  try {
    // Llamamos al controlador getCalls, que ahora solo necesita el id_client
    const calls = await getCalls(id_client);
    res.status(200).json(calls);  // Regresa las llamadas del cliente
  } catch (error: unknown) {
    console.error('Error al obtener las llamadas:', error);

    // Comprobamos si el error es una instancia de Error antes de acceder a error.message
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor', error: 'Un error desconocido ocurrió' });
    }
  }
});

export default router;
