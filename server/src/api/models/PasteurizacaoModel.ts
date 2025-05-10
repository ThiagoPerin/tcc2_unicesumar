import { pool } from "../../www";

export class PasteurizacaoModel {
	static getPasteurizacao(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.PASTEURIZACAO WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL;`,
			[numOperacao, company],
			callback
		);
	}	

	static addPasteurizacao(
		dataInicio: string,
		horaInicio: string,
		dataFim: string,
		horaFim: string,
		tanqueEntrada: number,
		temperaturaEntrada: number,
		pressaoEntrada: number,
		tanqueSaida: number,
		temperaturaSaida: number,
		pressaoSaida: number,
		pressaoCuba: number,
		responsavel: string,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.PASTEURIZACAO SET
			DATA_INICIO = ?,HORA_INICIO = ?,DATA_FIM = ?,HORA_FIM = ?,TANQUE_ENTRADA = ?,TEMPERATURA_ENTRADA = ?,PRESSAO_ENTRADA = ?,TANQUE_SAIDA = ?,TEMPERATURA_SAIDA = ?,PRESSAO_SAIDA = ?,PRESSAO_CUBA_SETPOINT = ?,RESPONSAVEL = ?,NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[dataInicio, horaInicio, dataFim, horaFim, tanqueEntrada, temperaturaEntrada, pressaoEntrada, tanqueSaida, temperaturaSaida, pressaoSaida, pressaoCuba, responsavel, numOperacao, userId, company],
			callback
		);
	}

	static deletePasteurizacao(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.PASTEURIZACAO SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
