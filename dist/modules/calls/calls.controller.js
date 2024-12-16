"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); }
        }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalls = void 0;
const database_1 = require("../database/database");
const getCalls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_client } = req.params;
    try {
        // Consulta para obtener las llamadas del cliente (ahora con 5000 registros)
        const [rows] = yield database_1.pool.execute('SELECT id_client, call_start, called_number, effective_duration FROM calls WHERE id_client = ? ORDER BY call_start DESC LIMIT 5000', [id_client]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron llamadas para este cliente' });
        }
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener llamadas:', error);
        return res.status(500).json({ message: 'Error desconocido', error: error.message || error });
    }
});
exports.getCalls = getCalls;
