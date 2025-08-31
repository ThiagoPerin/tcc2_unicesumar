import { pool } from "../../www";

export class MonitoramentoModel {
	static getMonitoramento(
		numOperacao: number | undefined,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.MONITORAMENTO_EXTRATO_TEMPERATURA WHERE NUM_OPERACAO = ? AND DELETED_AT IS NULL ORDER BY DATA, HORA ASC;`,
			[numOperacao],
			callback
		);
	}

	static addMonitoramento(
		dataMonitoramento: string,
		hora: string,
		extrato: number,
		temperatura: number,
		alteracao: string,
		numOperacao: number,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.MONITORAMENTO_EXTRATO_TEMPERATURA SET
      DATA = ?,HORA = ?,EXTRATO = ?,
      TEMPERATURA = ?,ALTERACAO_TEMPERATURA = ?, NUM_OPERACAO = ?;`,
			[dataMonitoramento, hora, extrato, temperatura, alteracao, numOperacao],
			callback
		);
	}

	static deleteMonitoramento(
		id: number,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.MONITORAMENTO_EXTRATO_TEMPERATURA SET DELETED_AT = CURDATE() WHERE id = ?;`,
			[id],
			callback
		);
	}
}
