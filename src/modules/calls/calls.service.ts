// src/modules/calls/calls.service.ts
import { pool } from '../database/database';

export class CallsService {
  static async getCallsByClientId(clientId: string): Promise<any> {
    try {
      // Consulta para obtener las últimas 100 llamadas por id_client
      const [rows]: any = await pool.execute(
        `SELECT id_client, call_start, called_number, effective_duration
         FROM calls
         WHERE id_client = ?
         ORDER BY call_start DESC
         LIMIT 100`,
        [clientId]
      );
      return rows;  // Devuelvo el array de resultados
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al obtener las llamadas');
    }
  }
}
