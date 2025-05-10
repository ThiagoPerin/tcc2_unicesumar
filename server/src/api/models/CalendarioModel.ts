import { pool } from "../../www";

export class CalendarioModel {
	static getCalendario(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		let queryString = "";
		if (numOperacao) queryString = `AND NUM_OPERACAO = ?`;
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.VIEW_ATIVIDADE_CALENDARIO WHERE COMPANY = ? ${queryString};`,
			[company, numOperacao],
			callback
		);
	}
}
