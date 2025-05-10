import { pool } from "../../www";

export class MedicaoPhModel {
	static getMedicaoPh(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.MEDICAO_PH WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao, company],
			callback
		);
	}

	static addMedicaoPh(
		amostra: string,
		dataPh: string,
		ph: number,
		responsavel: string,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.MEDICAO_PH SET
      AMOSTRA = ?,DATA = ?,PH = ?,RESPONSAVEL = ?,NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[amostra, dataPh, ph, responsavel, numOperacao, userId, company],
			callback
		);
	}

	static deleteMedicaoPh(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.MEDICAO_PH SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
