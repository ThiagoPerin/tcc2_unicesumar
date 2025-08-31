import { pool } from "../../www";

export class TanqueModel {
	static getTanqueRegister(
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.TANQUES WHERE DELETED_AT IS NULL ORDER BY NUM_TANQUE ASC;`,
			callback
		);
	}

	static getTanqueRegisterByCode(
		numTanque: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"]}.TANQUES WHERE NUM_TANQUE = ? AND DELETED_AT IS NULL;`,
			[numTanque],
			callback
		);
	}

	static addTanqueRegister(
		numTanque: number,
		capacidade: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.TANQUES SET NUM_TANQUE = ?, CAPACIDADE = ?;`,
			[numTanque, capacidade],
			callback
		);
	}

	static removeTanqueRegister(
		id: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.TANQUES SET DELETED_AT = CURDATE() WHERE id = ?`,
			[id],
			callback
		);
	}
}
