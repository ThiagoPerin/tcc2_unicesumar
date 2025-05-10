import { pool } from "../../www";

export class CentrifugacaoModel {
	static getCentrifugacao(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.DADOS_CENTRIFUGACAO WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY DATA ASC, HORA;`,
			[numOperacao, company],
			callback
		);
	}

	static addCentrifugacao(
		dataCentrifugacao: string,
		deTanque: number,
		paraTanque: number,
		temperatura: number,
		hora: string,
		ebc: number,
		hlh: number,
		acumulado: number,
		observacoes: string,
		responsavel: string,
		fim: number,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.DADOS_CENTRIFUGACAO SET
      DATA = ?,DE_TANQUE = ?,PARA_TANQUE = ?,TEMPERATURA = ?,HORA = ?,EBC = ?,HLH = ?,ACUMULADO_HL = ?,OBSERVACOES = ?,RESPONSAVEL = ?,FIM = ?,NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[dataCentrifugacao, deTanque, paraTanque, temperatura, hora, ebc, hlh, acumulado, observacoes, responsavel, fim, numOperacao, userId, company],
			callback
		);
	}

	static deleteCentrifugacao(
		id: number, 
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.DADOS_CENTRIFUGACAO SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
