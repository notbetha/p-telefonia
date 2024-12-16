import { Router } from 'express';
import { getCalls } from './calls.controller';

const router = Router();

// Ruta para obtener las llamadas paginadas de un cliente
router.get('/:idClient', getCalls);

export default router;