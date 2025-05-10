import { pool } from "../../www";

export class DryHoppingModel {
	static getDryHopping(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.DRY_HOPPING WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao, company],
			callback
		);
	}	

	static addDryHopping(
		dataDryHopping: string,
		tanque: number,
		temperatura: number,
		produto: string,
		lote: string,
		alfaAcido: number,
		quantidade: number,
		unidade: string,
		validade: string,
		responsavel: string,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.DRY_HOPPING SET
      DATA = ?,TANQUE = ?,TEMPERATURA = ?,PRODUTO = ?,LOTE = ?,ALFA_ACIDO = ?,QUANTIDADE = ?,UNIDADE = ?,VALIDADE = ?,RESPONSAVEL = ?, NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[dataDryHopping, tanque, temperatura, produto, lote, alfaAcido, quantidade, unidade, validade, responsavel, numOperacao, userId, company],
			callback
		);
	}

	static deleteDryHopping(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.DRY_HOPPING SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
