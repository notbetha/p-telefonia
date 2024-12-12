"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallsService = void 0;
const database_1 = require("../database/database");
class CallsService {
    static getCallsByClientId(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Consulta para obtener las últimas 100 llamadas por id_client
                const [rows] = yield database_1.pool.execute(`SELECT id_client, call_start, called_number, effective_duration
         FROM calls
         WHERE id_client = ?
         ORDER BY call_start DESC
         LIMIT 100`, [clientId]);
                return rows; // Devuelvo el array de resultados
            }
            catch (error) {
                console.error(error);
                throw new Error('Error al obtener las llamadas');
            }
        });
    }
}
exports.CallsService = CallsService;
