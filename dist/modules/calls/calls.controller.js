const connection = require('../config/db');

const getCalls = async (req, res) => {
    const { idClient } = req.params;
    const { startDate, endDate } = req.query;
    const page = parseInt(req.query.page || '1', 10);
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;

    if (!idClient) {
        return res.status(400).json({ error: 'El ID del cliente es obligatorio' });
    }

    let query = `
        SELECT call_start, called_number, effective_duration
        FROM calls
        WHERE id_client = ?`;

    let queryParams = [idClient];

    if (startDate && endDate) {
        query += ` AND call_start BETWEEN ? AND ?`;
        queryParams.push(`${startDate} 00:00:00`, `${endDate} 23:59:59`);
    }

    query += ` ORDER BY call_start DESC LIMIT ? OFFSET ?;`;
    queryParams.push(itemsPerPage, offset);

    const countQuery = `
        SELECT COUNT(*) AS totalCalls
        FROM calls
        WHERE id_client = ?
        ${startDate && endDate ? 'AND call_start BETWEEN ? AND ?' : ''};
    `;

    try {
        connection.query(query, queryParams, (err, calls) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err.message);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            connection.query(countQuery, queryParams.slice(0, 3), (err, countResult) => {
                if (err) {
                    console.error('Error al contar las llamadas:', err.message);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }

                const totalCalls = countResult[0].totalCalls;
                const totalPages = Math.ceil(totalCalls / itemsPerPage);

                res.json({
                    calls,
                    currentPage: page,
                    itemsPerPage,
                    totalPages,
                    totalCalls,
                });
            });
        });
    } catch (error) {
        console.error('Error inesperado:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { getCalls };
