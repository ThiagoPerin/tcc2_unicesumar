import { pool } from "../../www";

export class MedicaoPhModel {
	static getMedicaoPh(
		numOperacao: number | undefined,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.MEDICAO_PH WHERE NUM_OPERACAO = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao],
			callback
		);
	}

	static addMedicaoPh(
		amostra: string,
		dataPh: string,
		ph: number,
		responsavel: string,
		numOperacao: number,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.MEDICAO_PH SET
      AMOSTRA = ?,DATA = ?,PH = ?,RESPONSAVEL = ?,NUM_OPERACAO = ?;`,
			[amostra, dataPh, ph, responsavel, numOperacao],
			callback
		);
	}

	static deleteMedicaoPh(
		id: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.MEDICAO_PH SET DELETED_AT = CURDATE() WHERE id = ?;`,
			[id],
			callback
		);
	}
}
