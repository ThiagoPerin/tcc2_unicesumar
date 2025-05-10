import { pool } from "../../www";

export class atividadeModel {
	static getAtividades(
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ATIVIDADE_DEFAULT WHERE COMPANY = ? AND DELETED_AT IS NULL ORDER BY COD_ATIVIDADE ASC;`,
			[company],
			callback
		);
	}

	static getAtividadeByCodeOrName(
		nome: string,
		codigo: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ATIVIDADE_DEFAULT WHERE (ATIVIDADE = ? OR COD_ATIVIDADE = ?) AND COMPANY = ? AND DELETED_AT IS NULL;`,
			[nome, codigo, company],
			callback
		);
	}

	static addatividade(
		codigoAtividade: string,
		nomeAtividade: string,
		diasExecutar: number,
		duracaoAtividade: number,
		horarioExecucao: string,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.ATIVIDADE_DEFAULT SET
			COD_ATIVIDADE = ?,ATIVIDADE = ?,DIAS_EXECUTAR = ?,DURACAO = ?,HORARIO_EXECUCAO = ?, USER_ID = ?, COMPANY = ?;`,
			[codigoAtividade, nomeAtividade, diasExecutar, duracaoAtividade, horarioExecucao, userId, company],
			callback
		);
	}

	static deleteAtividade(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.ATIVIDADE_DEFAULT SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
