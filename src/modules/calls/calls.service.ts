import { pool } from '../database/database';

export class CallsService {
  static async getCallsByClientId(clientId: string, page: number): Promise<any> {
    const itemsPerPage = 5000;  // Modificar a 5000 registros por página
    const offset = (page - 1) * itemsPerPage;

    try {
      const [calls]: any = await pool.execute(
        `SELECT call_start, called_number, effective_duration
         FROM calls
         WHERE id_client = ?
         ORDER BY call_start DESC
         LIMIT ? OFFSET ?`,
        [clientId, itemsPerPage, offset]
      );

      const [countResult]: any = await pool.execute(
        `SELECT COUNT(*) AS totalCalls FROM calls WHERE id_client = ?`,
        [clientId]
      );

      const totalCalls = countResult[0].totalCalls;
      const totalPages = Math.ceil(totalCalls / itemsPerPage);

      return {
        calls,
        totalCalls,
        totalPages,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener las llamadas');
    }
  }
}
