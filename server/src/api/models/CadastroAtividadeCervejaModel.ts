import { pool } from "../../www";

export class atividadeCervejaModel {
	static getAtividade(
		codigoCerveja: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ATIVIDADE_CERVEJA WHERE COD_CERVEJA = ? AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY ATIVIDADE ASC;`,
			[codigoCerveja, company],
			callback
		);
	}

	static addAtividade(
		cerveja: string,
		codigoCerveja: number,
		atividade: string,
		codigoAtividade: string,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.ATIVIDADE_CERVEJA SET
			CERVEJA = ?,COD_CERVEJA = ?,ATIVIDADE = ?,COD_ATIVIDADE = ?, USER_ID = ?, COMPANY = ?;`,
			[cerveja, codigoCerveja, atividade, codigoAtividade, userId, company],
			callback
		);
	}

	static deleteAtividade(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.ATIVIDADE_CERVEJA SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
