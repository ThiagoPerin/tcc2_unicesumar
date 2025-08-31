import { pool } from "../../www";

export class atividadeCervejaModel {
	static getAtividade(
		codigoCerveja: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ATIVIDADE_CERVEJA WHERE COD_CERVEJA = ? AND DELETED_AT IS NULL ORDER BY ATIVIDADE ASC;`,
			[codigoCerveja],
			callback
		);
	}

	static addAtividade(
		cerveja: string,
		codigoCerveja: number,
		atividade: string,
		codigoAtividade: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.ATIVIDADE_CERVEJA SET
			CERVEJA = ?,COD_CERVEJA = ?,ATIVIDADE = ?,COD_ATIVIDADE = ?;`,
			[cerveja, codigoCerveja, atividade, codigoAtividade],
			callback
		);
	}

	static deleteAtividade(
		id: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.ATIVIDADE_CERVEJA SET DELETED_AT = CURDATE() WHERE id = ?;`,
			[id],
			callback
		);
	}
}
