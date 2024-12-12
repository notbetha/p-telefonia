import { pool } from '../database/database';

export class UserService {
  static async getUser(userId: string) {
    try {
      const [rows]: any = await pool.execute(
        'SELECT * FROM clientsip WHERE id_client = ?',
        [userId]
      );
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al obtener el usuario');
    }
  }

  static async createUser(login: string, password: string) {
    try {
      const [rows]: any = await pool.execute(
        'INSERT INTO clientsip (login, password) VALUES (?, ?)',
        [login, password]
      );
      return { id_client: rows.insertId, login };
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear el usuario');
    }
  }
}
