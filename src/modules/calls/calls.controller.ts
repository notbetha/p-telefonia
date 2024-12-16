import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getCalls = async (req: Request, res: Response) => {
    const idClient = req.params.idClient;  // Obtener el idClient de la ruta
    const page = parseInt(req.query.page as string) || 1;  // Página actual (por defecto 1)
    const itemsPerPage = 5000;  // Modificar a 5000 registros por página
    const offset = (page - 1) * itemsPerPage;  // Desplazamiento para la paginación

    // Consulta para obtener las llamadas
    const query = `
        SELECT call_start, called_number, effective_duration
        FROM calls
        WHERE id_client = ?
        ORDER BY call_start DESC
        LIMIT ? OFFSET ?;
    `;

    // Consulta para contar el total de registros (para paginación)
    const countQuery = `
        SELECT COUNT(*) AS totalCalls
        FROM calls
        WHERE id_client = ?;
    `;

    try {
        // Obtener las llamadas
        const [calls] = await pool.query(query, [idClient, itemsPerPage, offset]) as any[];

        // Contar el total de llamadas
        const [countResult] = await pool.query(countQuery, [idClient]) as any[];
        const totalCalls = countResult[0].totalCalls;

        // Calcular las páginas
        const totalPages = Math.ceil(totalCalls / itemsPerPage);

        // Responder con las llamadas, página actual, total de páginas y total de llamadas
        res.json({
            calls: calls,  // Asegurarte de que la propiedad 'calls' está disponible
            currentPage: page,
            totalPages: totalPages,
            totalCalls: totalCalls
        });
    } catch (error) {
        console.error('Error al obtener las llamadas:', error);
        res.status(500).json({ error: 'Error al obtener las llamadas' });
    }
};
