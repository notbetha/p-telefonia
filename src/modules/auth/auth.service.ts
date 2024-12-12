import { pool } from '../database/database';

class AuthService {
  static async validateUser(login: string, password: string) {
    try {
      const [rows]: [any[], any] = await pool.execute(
        'SELECT * FROM clientsip WHERE login = ? AND password = ?',
        [login, password]
      );

      if (rows.length === 0) {
        throw new Error('Login o contraseña incorrectos');
      }

      return rows[0];  // Retorna el primer resultado de la consulta
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al validar usuario');
    }
  }
}

// Exportación por defecto
export default AuthService;
