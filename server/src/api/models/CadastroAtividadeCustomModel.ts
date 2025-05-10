import { pool } from "../../www";

export class atividadeCustomModel {
	static getAtividade(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		let queryString = "";
		if (numOperacao) queryString = "AND NUM_OPERACAO = ?";
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ATIVIDADE_CUSTOM WHERE DELETED_AT IS NULL AND COMPANY = ? ${queryString} ORDER BY DATA_INICIO, ATIVIDADE, DATA_FINAL ASC;`,
			[company, numOperacao],
			callback
		);
	}

	static addAtividade(
		numOperacao: number,
		nomeAtividade: string,
		inicio: string,
		fim: string,
		horarioExecucao: string,
		descricao: string,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.ATIVIDADE_CUSTOM SET
			NUM_OPERACAO = ?,ATIVIDADE = ?,DATA_INICIO = ?,DATA_FINAL = ?,HORARIO_EXECUCAO = ?,DESCRICAO = ?, USER_ID = ?,	COMPANY = ?;`,
			[numOperacao, nomeAtividade, inicio, fim, horarioExecucao, descricao, userId, company],
			callback
		);
	}

	static deleteAtividade(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.ATIVIDADE_CUSTOM SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
