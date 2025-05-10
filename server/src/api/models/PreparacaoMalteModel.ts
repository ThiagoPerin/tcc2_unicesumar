import { pool } from "../../www";

export class PreparacaoMalteModel {
	static getPreparacaoMalte(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.PREPARACAO_MALTES WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL;`,
			[numOperacao, company],
			callback
		);
	}	

	static addPreparacaoMalte(
		separacao: string,
		conferencia1: string,
		conferencia2: string,
		moagem: string,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.PREPARACAO_MALTES SET
      SEPARACAO = ?,CONFERENCIA_1 = ?,CONFERENCIA_2 = ?,MOAGEM = ?,NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[separacao, conferencia1, conferencia2, moagem, numOperacao, userId, company],
			callback
		);
	}

	static deletePreparacaoMalte(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.PREPARACAO_MALTES SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
