import { pool } from "../../www";

export class FermentacaoForcadaModel {
	static getFermentacaoForcada(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.FERMENTACAO_FORCADA WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY DT_FERM, HORA ASC;`,
			[numOperacao, company],
			callback
		);
	}	

	static addFermentacaoForcada(
		dataFermentacao: string,
		hora: string,
		extratoInicial: number,
		extratoFinal: number,
		diasTeste: number,
		horasAgit: number,
		responsavel: string,
		observacoes: string,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.FERMENTACAO_FORCADA SET
			DT_FERM = ?,HORA = ?,EXTRATO_INICIAL_FERM = ?,EXTRATO_FINAL_FERM = ?,DIAS_TESTE_FERM = ?,HORAS_AGIT_FERM = ?,
			RESPONSAVEL_FERM = ?,OBSERVACOES_FERM = ?,NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[dataFermentacao, hora, extratoInicial, extratoFinal, diasTeste, horasAgit, responsavel, observacoes, numOperacao, userId, company],
			callback
		);
	}

	static deleteFermentacaoForcada(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.FERMENTACAO_FORCADA SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
