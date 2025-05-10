import { pool } from "../../www";

export class InoculacaoModel {
	static getInoculacao(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.INOCULACAO_LEVEDURA WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL ORDER BY DATA ASC;`,
			[numOperacao, company],
			callback
		);
	}	

	static addInoculacao(
		dataInoculacao: string,
		levedura: string,
		origemLote: number,
		contagem: string,
		validade: string,
		quantidade: number,
		responsavel: string,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.INOCULACAO_LEVEDURA SET
		DATA = ?,LEVEDURA = ?,ORIGEM_LOTE = ?,
		CONTAGEM = ?,VALIDADE = ?,QUANTIDADE = ?,
		 RESPONSAVEL = ?, NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[dataInoculacao, levedura, origemLote, contagem, validade, quantidade, responsavel, numOperacao, userId, company],
			callback
		);
	}

	static deleteInoculacao(
		id: number, 
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.INOCULACAO_LEVEDURA SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
