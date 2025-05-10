import { pool } from "../../www";

export class PrimingModel {
	static getPriming(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.PRIMING WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao, company],
			callback
		);
	}	

	static addPriming(
		dataPriming: string,
		volumeCerveja: number,
		tanque: number,
		responsavel: string,
		gLDextrose: number,
		quantidade: number,
		agua: number,
		nome: string,
		lote: string,
		validade: string,
		gLLevedura: number,
		quantidadePct: number,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.PRIMING SET
      DATA = ?,VOLUME_CERVEJA = ?,TANQUE = ?,RESPONSAVEL = ?,GL_DEXTROSE = ?,QUANTIDADE_DEXTROSE = ?,AGUA = ?,NOME_LEVEDURA = ?,LOTE_LEVEDURA = ?,VALIDADE_LEVEDURA = ?,GL_LEVEDURA = ?,QUANTIDAE_PCT_LEVEDURA = ?,NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[dataPriming, volumeCerveja, tanque, responsavel, gLDextrose, quantidade, agua, nome, lote, validade, gLLevedura, quantidadePct, numOperacao, userId, company],
			callback
		);
	}

	static deletePriming(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.PRIMING SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
