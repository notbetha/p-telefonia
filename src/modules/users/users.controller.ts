import { Request, Response } from 'express';
import { UserService } from './users.service';

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await UserService.getUser(userId);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el usuario', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { login, password } = req.body;
  try {
    const user = await UserService.createUser(login, password);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el usuario', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
