import { pool } from "../../www";

export class DryHoppingModel {
	static getDryHopping(
		numOperacao: number | undefined,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.DRY_HOPPING WHERE NUM_OPERACAO = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao],
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
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.DRY_HOPPING SET
      DATA = ?,TANQUE = ?,TEMPERATURA = ?,PRODUTO = ?,LOTE = ?,ALFA_ACIDO = ?,QUANTIDADE = ?,UNIDADE = ?,VALIDADE = ?,RESPONSAVEL = ?, NUM_OPERACAO = ?;`,
			[dataDryHopping, tanque, temperatura, produto, lote, alfaAcido, quantidade, unidade, validade, responsavel, numOperacao],
			callback
		);
	}

	static deleteDryHopping(
		id: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.DRY_HOPPING SET DELETED_AT = CURDATE() WHERE id = ?;`,
			[id],
			callback
		);
	}
}
