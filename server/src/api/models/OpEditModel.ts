import { pool } from "../../www";

export class OpEditModel {
	static changeOP(
		numOperacao: number,
		numOperacaoNovo: number,
		loteNovo: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`CALL ${process.env["MYSQL_DB"] as string}.SP_TROCAR_OP_LOTE (?,?,?,?);`,
			[String(numOperacao), String(loteNovo), String(numOperacaoNovo), String(company)],
			callback
		);
	}
}
