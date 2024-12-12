// src/modules/auth/auth.controller.ts
import { Request, Response } from 'express';

// Asegúrate de que el login esté correctamente tipado y sea compatible con Express
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { login, password } = req.body;

  if (login === 'admin' && password === 'admin') {
    return res.json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid login or password' });
};
