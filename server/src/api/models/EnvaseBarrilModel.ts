import { pool } from "../../www";

export class EnvaseBarrilModel {
	static getEnvaseBarril(
		numOperacao: number | undefined,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.ENVASE_BARRIS WHERE NUM_OPERACAO = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao],
			callback
		);
	}

	static addEnvaseBarril(
		dataEnvase: string,
		tanque: number,
		p01: number,
		p02: number,
		p20: number,
		p30: number,
		growler: number,
		oak: number,
		total: number,
		responsavel: string,
		observacoes: string,
		numOperacao: number,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.ENVASE_BARRIS SET
      DATA = ?,TANQUE = ?,P01 = ?,P02 = ?,P20 = ?,P30 = ?,GROWLER = ?,OAK = ?,TOTAL = ?,RESPONSAVEL = ?,OBSERVACOES = ?,NUM_OPERACAO = ?;`,
			[dataEnvase, tanque, p01, p02, p20, p30, growler, oak, total, responsavel, observacoes, numOperacao],
			callback
		);
	}

	static deleteEnvaseBarril(
		id: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.ENVASE_BARRIS SET DELETED_AT = CURDATE() WHERE id = ?;`,
			[id],
			callback
		);
	}
}
