import { pool } from "../../www";

export class OpModel {
	static getOp(
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ORDENS_PROD ORDER BY DT_EMISSAO DESC;`,
			callback
		);
	}

	static getOpByCode(
		numOperacao: number,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ORDENS_PROD WHERE NUM_OPERACAO = ?;`,
			[numOperacao],
			callback
		);
	}

	static addOp(
		numOperacao: number,
		lote: string,
		dataEmissao: number,
		produto: number,
		codigoProduto: string,
		tanquePrimario: number,
		capacidadeLote: number,
		responsavel: string,
		observacoes: string,
		cliente: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.ORDENS_PROD SET
      NUM_OPERACAO = ?,LOTE = ?,DT_EMISSAO = ?,
      PRODUTO = ?,COD_CERVEJA = ?,TANQUE_PRIMARIO = ?,CAPAC_TOTAL_LOTE = ?,
      RESPONSAVEL = ?, CLIENTE = ?, OBSERVACOES = ?;`,
			[numOperacao, lote, dataEmissao, produto, codigoProduto, tanquePrimario, capacidadeLote, responsavel, cliente, observacoes],
			callback
		);
	}

	static checkExistance(
		numOperacao: number,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ORDENS_PROD WHERE NUM_OPERACAO = ?;`,
			[numOperacao],
			callback
		);
	}

	static updateStatus(
		status: number,
		numOperacao: number,
		lote: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"]}.ORDENS_PROD SET STATUS = ? WHERE NUM_OPERACAO = ? AND LOTE = ?;`,
			[status, numOperacao, lote],
			callback
		);
	}
}
