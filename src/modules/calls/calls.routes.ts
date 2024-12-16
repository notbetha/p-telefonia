import { Router } from 'express';
import { getCalls } from './calls.controller';

const router = Router();

// Ruta para obtener las llamadas por el ID del cliente
router.get('/:idClient', getCalls);  // Aquí se debe usar ':idClient'

export default router;
