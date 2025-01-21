import { Request, Response } from 'express';

// Simulación de la función de autenticación (ajustado a tu ejemplo)
export const loginController = (login: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Aquí va tu lógica para validar las credenciales
    if (login === 'test' && password === 'password') {
      // Si las credenciales son correctas, se retorna el objeto del usuario
      resolve({
        id_client: 1,
        login,
        password,
        // Otros campos que desees retornar
      });
    } else {
      // Si las credenciales no son correctas, se rechaza la promesa
      reject(new Error('Credenciales incorrectas'));
    }
  });
};
