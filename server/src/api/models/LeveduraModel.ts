import { pool } from "../../www";

export class LeveduraModel {
	static getLevedura(
		numOperacao: number | undefined,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.COLETA_LEVEDURA WHERE NUM_OPERACAO = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao],
			callback
		);
	}

	static addLevedura(
		dataColeta: string,
		tanque: number,
		temperatura: number,
		destino: string,
		lote: string,
		quantidade: number,
		responsavel: string,
		observacoes: string,
		numOperacao: number,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.COLETA_LEVEDURA SET
      DATA = ?,TANQUE = ?,TEMPERATURA = ?,DESTINO = ?,LOTE = ?,QUANTIDADE = ?,RESPONSAVEL = ?,OBSERVACOES = ?, NUM_OPERACAO = ?;`,
			[dataColeta, tanque, temperatura, destino, lote, quantidade, responsavel, observacoes, numOperacao],
			callback
		);
	}

	static deleteLevedura(
		id: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.COLETA_LEVEDURA SET DELETED_AT = CURDATE() WHERE id = ?;`,
			[id],
			callback
		);
	}
}
