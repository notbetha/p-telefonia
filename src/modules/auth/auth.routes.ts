import { Router, Request, Response } from 'express';
import { loginController } from './auth.controller';

const router = Router();

// Definir la ruta para el login
router.post('/login', (req: Request, res: Response) => {
  // Llamamos al controlador de login, pasando login y password
  loginController(req.body.login, req.body.password)
    .then(result => {
      // Si la promesa se resuelve correctamente, enviamos la respuesta con el resultado
      res.json(result);
    })
    .catch(error => {
      // Manejo de errores en caso de que algo falle
      console.error('Error en loginController:', error); // Log para depuración
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    });
});

export default router;
