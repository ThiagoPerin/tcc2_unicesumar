import { pool } from "../../www";

export class CentrifugacaoResumoModel {
	static getCentrifugacaoResumo(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.DADOS_CENTRIFUGACAO_RESUMO WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY DATA ASC, HORA_INICIO;`,
			[numOperacao, company],
			callback
		);
	}	

	static addCentrifugacaoResumo(
		dataCentrifugacao: string,
		deTanque: number,
		paraTanque: number,
		volume: string,
		horaInicio: string,
		horaFim: string,
		ebc: number,
		hlh: number,
		total: number,
		media: number,
		responsavel: string,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.DADOS_CENTRIFUGACAO_RESUMO SET
      DATA = ?,DE_TANQUE = ?,PARA_TANQUE = ?,VOLUME = ?,HORA_INICIO = ?,HORA_FIM = ?,EBC = ?,HLH = ?,TOTAL = ?,MEDIA = ?,RESPONSAVEL = ?,NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
	  [dataCentrifugacao, deTanque, paraTanque, volume, horaInicio, horaFim, ebc, hlh, total, media, responsavel, numOperacao, userId, company],
			callback
		);
	}

	static deleteCentrifugacaoResumo(
		id: number,
		company: string, 
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.DADOS_CENTRIFUGACAO_RESUMO SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
