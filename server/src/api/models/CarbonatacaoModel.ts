import { pool } from "../../www";

export class CarbonatacaoModel {
	static getCarbonatacao(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.CARBONATACAO WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao, company],
			callback
		);
	}

	static addCarbonatacao(
		dataCarbonatacao: string,
		tanque: number,
		temperaturaInicial: number,
		temperaturaFinal: number,
		horaInicio: string,
		horaFim: string,
		pressao: number,
		responsavel: string,
		observacoes: string,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.CARBONATACAO SET
      DATA = ?,TANQUE = ?,TEMPERATURA_INICIO = ?,TEMPERATURA_FIM = ?,HORA_INICIO = ?,HORA_FIM = ?,PRESSAO = ?,RESPONSAVEL = ?,OBSERVACOES = ?, NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[dataCarbonatacao, tanque, temperaturaInicial, temperaturaFinal, horaInicio, horaFim, pressao, responsavel, observacoes, numOperacao, userId, company],
			callback
		);
	}

	static deleteCarbonatacao(
		id: number,
		company: string, 
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.CARBONATACAO SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
