import { pool } from "../../www";

export class TransferenciaModel {
	static getTransferencia(
		numOperacao: number | undefined,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.TRANSFERENCIA WHERE NUM_OPERACAO = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao],
			callback
		);
	}

	static addTransferencia(
		tipoOperacao: number,
		dataTransferencia: string,
		deTanque: number,
		paraTanque: number,
		temperatura: number,
		purga: number,
		transfTotal: number,
		descarte: number,
		carb: number,
		responsavel: string,
		observacoes: string,
		numOperacao: number,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.TRANSFERENCIA SET
				TIPO_OPERACAO = ?, DATA = ?,DE_TANQUE = ?,PARA_TANQUE = ?,TEMPERATURA = ?,PURGA = ?,TRANSF_TOTAL = ?,
				DESCARTE = ?,CARB = ?,RESPONSAVEL = ?,OBSERVACOES = ?,NUM_OPERACAO = ?,
				DATAHORA = NOW();`,
			[tipoOperacao, dataTransferencia, deTanque, paraTanque, temperatura, purga, transfTotal,
				descarte, carb, responsavel, observacoes, numOperacao],
			callback
		);
	}

	static deleteTransferencia(
		id: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.TRANSFERENCIA SET DELETED_AT = CURDATE() WHERE id = ?;`,
			[id],
			callback
		);
	}
}
