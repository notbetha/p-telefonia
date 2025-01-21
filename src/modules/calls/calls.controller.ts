import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getCalls = async (req: Request, res: Response) => {
    const idClient = req.params.idClient;

    // Paginación
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const itemsPerPage = 5000;
    const offset = (page - 1) * itemsPerPage;

    // Consultas SQL
    const query = `
        SELECT call_start, called_number, effective_duration
        FROM calls
        WHERE id_client = ?
        ORDER BY call_start DESC
        LIMIT ? OFFSET ?;
    `;

    const countQuery = `
        SELECT COUNT(*) AS totalCalls
        FROM calls
        WHERE id_client = ?;
    `;

    try {
        const [calls] = await pool.query(query, [idClient, itemsPerPage, offset]) as any[];
        const [countResult] = await pool.query(countQuery, [idClient]) as any[];
        const totalCalls = countResult[0].totalCalls;
        const totalPages = Math.ceil(totalCalls / itemsPerPage);

        res.json({
            calls,
            currentPage: page,
            totalPages,
            totalCalls,
        });
    } catch (error) {
        console.error('Error al obtener las llamadas:', error);
        res.status(500).json({ error: 'Error al obtener las llamadas' });
    }
};
