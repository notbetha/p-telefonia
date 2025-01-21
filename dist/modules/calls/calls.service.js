"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallsService = void 0;
const database_1 = require("../database/database");
class CallsService {
    static async getCallsByClientId(clientId, page) {
        const itemsPerPage = 5000;
        const offset = (page - 1) * itemsPerPage;
        try {
            const [calls] = await database_1.pool.execute(`SELECT call_start, called_number, effective_duration
         FROM calls
         WHERE id_client = ?
         ORDER BY call_start DESC
         LIMIT ? OFFSET ?`, [clientId, itemsPerPage, offset]);
            const [countResult] = await database_1.pool.execute(`SELECT COUNT(*) AS totalCalls FROM calls WHERE id_client = ?`, [clientId]);
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
exports.CallsService = CallsService;
