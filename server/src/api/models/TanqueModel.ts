import { pool } from "../../www";

export class TanqueModel {
	static getTanque(
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.VIEW_STATUS_TANQUES WHERE COMPANY = ? ORDER BY NUM_TANQUE ASC;`,
			[company],
			callback
		);
	}

	static getTanqueHistorico(
		numTanque: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
		) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.TRANSFERENCIA WHERE (DE_TANQUE = ? OR PARA_TANQUE = ?) AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numTanque, numTanque, company],
			callback
		);
	}

	static getTanqueRegister(
		company: string,
		callback: (error: any, results: any) => void
		) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.TANQUES WHERE COMPANY = ? AND DELETED_AT IS NULL ORDER BY NUM_TANQUE ASC;`,
			[company],
			callback
		);
	}

	static getTanqueRegisterByCode(
		numTanque: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"]}.TANQUES WHERE NUM_TANQUE = ? AND COMPANY = ? AND DELETED_AT IS NULL;`,
			[numTanque, company],
			callback
		);
	}

	static addTanqueRegister(
		numTanque: number,
		capacidade: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.TANQUES SET NUM_TANQUE = ?, CAPACIDADE = ?, USER_ID = ?, COMPANY = ?;`,
			[numTanque, capacidade, userId, company],
			callback
		);
	}
	
	static removeTanqueRegister(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.TANQUES SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
