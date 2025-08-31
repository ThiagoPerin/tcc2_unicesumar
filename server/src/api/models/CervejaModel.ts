import { pool } from "../../www";

export class CervejaModel {
	static getCerveja(
		numOperacao: number | undefined,
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"]}.ORDENS_PROD WHERE NUM_OPERACAO = ?;`,
			[numOperacao],
			callback
		);
	}

	static updateCerveja(
		updateColumns: string[],
		updateValues: string[],
		numOperacao: number,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"]}.ORDENS_PROD SET ${updateColumns.join(', ')} WHERE NUM_OPERACAO = ?;`,
			[...updateValues, numOperacao],
			callback
		);
	}
}
