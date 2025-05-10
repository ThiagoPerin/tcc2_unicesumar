import { pool } from "../../www";

export class EnvaseLataModel {
	static getEnvaseLata(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ENVASE_LATAS WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao, company],
			callback
		);
	}	

	static addEnvaseLata(
		dataEnvase: string,
		carbonatacao: number,
		tanque: number,
		tamanho: number,
		horaInicio: string,
		horaFim: string,
		quantidade: number,
		descarte: number,
		descarteTampa: number,
		amassadaMáquina: number,
		amassadaCabine: number,
		lab: number,
		litros: number,
		responsavel: string,
		acidoAscorbico: number,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.ENVASE_LATAS SET
      DATA = ?,CARBONATACAO = ?,TANQUE = ?,TAMANHO = ?,HORA_INICIO = ?,HORA_FIM = ?,QUANTIDADE = ?,DESCARTE = ?,DESCARTE_TAMPA = ?,AMASSADA_MAQUINA = ?,AMASSADA_CABINE = ?,LAB = ?,LITROS = ?,RESPONSAVEL = ?,ACIDO_ASCORBICO = ?,NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[dataEnvase, carbonatacao, tanque, tamanho, horaInicio, horaFim, quantidade, descarte, descarteTampa, amassadaMáquina, amassadaCabine, lab, litros, responsavel, acidoAscorbico, numOperacao, userId, company],
			callback
		);
	}

	static deleteEnvaseLata(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.ENVASE_LATAS SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
