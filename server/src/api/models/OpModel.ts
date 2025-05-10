import { pool } from "../../www";

export class OpModel {
	static getOp(
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ORDENS_PROD WHERE COMPANY = ? ORDER BY DT_EMISSAO DESC;`,
			[company],
			callback
		);
	}

	static getOpByCode(
		numOperacao: number,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ORDENS_PROD WHERE NUM_OPERACAO = ? AND COMPANY = ?;`,
			[numOperacao, company],
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
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.ORDENS_PROD SET
      NUM_OPERACAO = ?,LOTE = ?,DT_EMISSAO = ?,
      PRODUTO = ?,COD_CERVEJA = ?,TANQUE_PRIMARIO = ?,CAPAC_TOTAL_LOTE = ?,
      RESPONSAVEL = ?, CLIENTE = ?, OBSERVACOES = ?, USER_ID = ?, COMPANY = ?;`,
			[numOperacao, lote, dataEmissao, produto, codigoProduto, tanquePrimario, capacidadeLote, responsavel, cliente, observacoes, userId, company],
			callback
		);
	}

	static checkExistance(
		numOperacao: number,
		company: string,
		callback: (error: any, results: any) => void
		) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ORDENS_PROD WHERE NUM_OPERACAO = ? AND COMPANY = ?;`,
			[numOperacao, company],
			callback
		);
	}

	static updateStatus(
		status: number, 
		numOperacao: number, 
		lote: string,
		company: string,
		callback: (error: any, results: any) => void
		) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"]}.ORDENS_PROD SET STATUS = ? WHERE NUM_OPERACAO = ? AND LOTE = ? AND COMPANY = ?;`,
			[status, numOperacao, lote, company],
			callback
		);
	}

	static getOpMenuStatus(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.VIEW_MENU_PRODUCAO_STATUS WHERE NUM_OPERACAO = ? AND COMPANY = ?;`,
			[numOperacao, company],
			callback
		);
	}

	static getOpMenuStatusGeneral(
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.VIEW_MENU_PRODUCAO_STATUS WHERE COMPANY = ?;`,
			[company],
			callback
		);
	}
}
