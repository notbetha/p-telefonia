import { Router, Request, Response } from 'express';
import { loginController } from './auth.controller';

const router = Router();

// Definir la ruta para el login
router.post('/login', (req: Request, res: Response) => {
  // Aquí se maneja la solicitud de login sin usar async/await directamente en la firma de la función
  loginController(req.body.login, req.body.password)
    .then(result => {
      // Enviar la respuesta con el resultado del controlador
      res.json(result);
    })
    .catch(error => {
      // Manejo de errores en caso de que algo falle
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    });
});

export default router;
