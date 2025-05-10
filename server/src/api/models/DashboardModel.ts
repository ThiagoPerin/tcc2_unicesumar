import { pool } from "../../www";

export class DashboardModel {
	static getDonutOp(
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT PRODUTO, COUNT(NUM_OPERACAO) AS QTD_OP
				FROM ${process.env["MYSQL_DB"] as string}.ORDENS_PROD WHERE COMPANY = ? AND STATUS != '2' GROUP BY PRODUTO;`,
			[company],
			callback
		);
	}
	static getBarOp(
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT DT_EMISSAO, COUNT(NUM_OPERACAO) AS NUM_OP_DIA
				FROM ${process.env["MYSQL_DB"] as string}.ORDENS_PROD WHERE COMPANY = ? GROUP BY DT_EMISSAO;`,
			[company],
			callback
		);
	}
	static getDonutLatas(
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT SUM(DESCARTE) AS DESCARTE, SUM(LAB) AS LAB, SUM(QUANTIDADE) AS QUANTIDADE
				FROM ${process.env["MYSQL_DB"] as string}.ENVASE_LATAS WHERE COMPANY = ? AND DELETED_AT IS NULL;`,
			[company],
			callback
		);
	}
	static getDonutLatasDetalhado(
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT SUM(DESCARTE) AS DESCARTE, SUM(LAB) AS LAB, SUM(QUANTIDADE) AS QUANTIDADE, ORDENS_PROD.PRODUTO
		FROM ${process.env["MYSQL_DB"] as string}.ENVASE_LATAS INNER JOIN ${process.env["MYSQL_DB"] as string}.ORDENS_PROD
		ON ENVASE_LATAS.NUM_OPERACAO = ORDENS_PROD.NUM_OPERACAO WHERE ORDENS_PROD.COMPANY = ? AND ENVASE_LATAS.COMPANY = ? AND ENVASE_LATAS.DELETED_AT IS NULL GROUP BY ORDENS_PROD.PRODUTO;`,
			[company, company],
			callback
		);
	}
}
