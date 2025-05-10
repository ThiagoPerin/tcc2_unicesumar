import { pool } from "../../www";

export class BrassagemModel {
	static getBrassagem(
		numOperacao: number | undefined,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`SELECT * FROM ${process.env["MYSQL_DB"] as string}.BRASSAGEM WHERE NUM_OPERACAO = ? AND COMPANY = ? AND DELETED_AT IS NULL;`,
			[numOperacao, company],
			callback
		);
	}

	static addBrassagem(
		dataEvaseSaca: string,
		turno: string,
		lote: string,
		validade: string,
		posicaoSuperior: number,
		posicaoInferior: number,
		dia: string,
		horaMashIn: string,
		densidadePrimario: number,
		phLab: number,
		densidadeFinalSparge: number,
		horaInicioMashOut: string,
		volume: number,
		temperaturaMedicaoVolume: number,
		densidadeFabrica: number,
		pesoTina: number,
		densidadeLab: number,
		horaInicioFervura: string,
		medicaoCorrecaoPh: number,
		volumeFinalFervura: number,
		pesoFinalTina: number,
		trub: number,
		densidadeFinalFab: number,
		densidadeFinalLab: number,
		temperaturaTransf: number,
		volumeTransf: number,
		horaFim: string,
		keg: string,
		responsavel: string,
		numOperacao: number,
		userId: string,
		company: string,
		callback: (error: any, results: any) => void
	) {
		pool.query(
			`INSERT INTO ${process.env["MYSQL_DB"] as string}.BRASSAGEM SET
      DATA_ENVASE_SACA = ?,TURNO = ?,LOTE = ?,VALIDADE = ?,POSICAO_SUPERIOR = ?,POSICAO_INFERIOR = ?,DIA = ?,HORA_MASH_IN = ?,DENSIDADE_PRIMARIO = ?,PH_LAB = ?,DENSIDADE_FINAL_SPARGE = ?,HORA_INICIO_MASH_OUT = ?,VOLUME = ?,TEMPERATURA_MEDICAO_VOLUME = ?,DENSIDADE_FABRICA = ?,PESO_TINA_PCT = ?,DENSIDADE_LAB = ?,HORA_INICIO_FERVURA = ?,MEDICAO_CORRECAO_PH = ?,VOLUME_FINAL_FERVURA = ?,PESO_TINA_FINAL = ?, TRUB = ?,DENSIDADE_FINAL_FABRICA = ?,DENSIDADE_FINAL_LAB = ?,TEMPERATURA_TRANSFERENCIA = ?,VOLUME_TRANSFERIDO = ?,HORA_FIM_TRANSFERENCIA = ?,KEG = ?,RESPONSAVEL = ?, NUM_OPERACAO = ?, USER_ID = ?, COMPANY = ?;`,
			[dataEvaseSaca, turno, lote, validade, posicaoSuperior, posicaoInferior, dia, horaMashIn, densidadePrimario, phLab, densidadeFinalSparge, horaInicioMashOut, volume, temperaturaMedicaoVolume, densidadeFabrica, pesoTina, densidadeLab, horaInicioFervura, medicaoCorrecaoPh, volumeFinalFervura, pesoFinalTina, trub, densidadeFinalFab, densidadeFinalLab, temperaturaTransf, volumeTransf, horaFim, keg, responsavel, numOperacao, userId, company],
			callback
		);
	}

	static deleteBrassagem(
		id: number,
		company: string,
		callback: (error: any, results: any) => void) {
		pool.query(
			`UPDATE ${process.env["MYSQL_DB"] as string}.BRASSAGEM SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
			[id, company],
			callback
		);
	}
}
