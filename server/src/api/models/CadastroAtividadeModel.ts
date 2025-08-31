import { pool } from "../../www";

export class atividadeModel {
	static getAtividades(
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ATIVIDADE_DEFAULT WHERE DELETED_AT IS NULL ORDER BY COD_ATIVIDADE ASC;`,
			callback
		);
	}

	static getAtividadeByCodeOrName(
		nome: string,
		codigo: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ATIVIDADE_DEFAULT WHERE (ATIVIDADE = ? OR COD_ATIVIDADE = ?) AND DELETED_AT IS NULL;`,
			[nome, codigo],
			callback
		);
	}

	static addatividade(
		codigoAtividade: string,
		nomeAtividade: string,
		diasExecutar: number,
		duracaoAtividade: number,
		horarioExecucao: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.ATIVIDADE_DEFAULT SET
			COD_ATIVIDADE = ?,ATIVIDADE = ?,DIAS_EXECUTAR = ?,DURACAO = ?,HORARIO_EXECUCAO = ?;`,
			[codigoAtividade, nomeAtividade, diasExecutar, duracaoAtividade, horarioExecucao],
			callback
		);
	}

	static deleteAtividade(
		id: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.ATIVIDADE_DEFAULT SET DELETED_AT = CURDATE() WHERE id = ?;`,
			[id],
			callback
		);
	}
}
