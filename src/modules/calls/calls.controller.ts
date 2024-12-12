// src/modules/calls/calls.controller.ts
import { Request, Response } from 'express';
import { pool } from '../database/database';

// Aquí actualizamos la función para que reciba solo el id_client como argumento
export const getCalls = async (id_client: string): Promise<any> => {
  console.log('ID del cliente recibido:', id_client);

  try {
    // Ejecutamos la consulta para obtener las llamadas
    const [rows]: any = await pool.execute(
      'SELECT id_client, call_start, called_number, effective_duration FROM calls WHERE id_client = ? ORDER BY call_start DESC LIMIT 100',
      [id_client]
    );

    console.log('Resultado de las llamadas:', rows);

    if (rows.length === 0) {
      // Si no se encuentran llamadas, se devuelve un mensaje adecuado
      throw new Error('No se encontraron llamadas para este cliente');
    }

    return rows;  // Retornamos las llamadas
  } catch (error: unknown) {
    console.error('Error al obtener las llamadas:', error);

    // Comprobamos si el error es una instancia de Error
    if (error instanceof Error) {
      throw new Error(error.message);  // Lanzamos el error para que sea manejado en la ruta
    } else {
      throw new Error('Un error desconocido ocurrió');
    }
  }
};
