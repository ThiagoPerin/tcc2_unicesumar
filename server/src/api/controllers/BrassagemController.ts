import { Request, Response } from "express";
import { BrassagemModel } from "../models/BrassagemModel";
import { OpModel } from "../models/OpModel";

export class BrassagemController {
	static getBrassagem(req: Request, res: Response) {

		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		BrassagemModel.getBrassagem(numOperacao, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					success: false,
					msg: "Erro no servidor.",
				});
			} else {
				return res.json(results);
			}
		});
	}

	static addBrassagem(req: Request, res: Response) {

		const numOperacao = req.body["numOperacao"] || undefined;
		OpModel.getOpByCode(numOperacao, (err, results) => {
			if (err) {
				console.log(err);
				return res.json({
					success: false,
					msg: "Erro no servidor.",
				});
			} else if (Object.values(results).length === 0) {
				return res.status(400).json({
					success: false,
					msg: `Nº de operação: ${numOperacao} não existe`,
				});
			} else {
				const dataEvaseSaca = req.body["dataEvaseSaca"] || undefined;
				const turno = req.body["turno"] || undefined;
				const lote = req.body["lote"] || undefined;
				const validade = req.body["validade"] || undefined;
				const posicaoSuperior = req.body["posicaoSuperior"] || undefined;
				const posicaoInferior = req.body["posicaoInferior"] || undefined;
				const dia = req.body["dia"] || undefined;
				const horaMashIn = req.body["horaMashIn"] || undefined;
				const densidadePrimario = req.body["densidadePrimario"] || undefined;
				const phLab = req.body["phLab"] || undefined;
				const densidadeFinalSparge = req.body["densidadeFinalSparge"] || undefined;
				const horaInicioMashOut = req.body["horaInicioMashOut"] || undefined;
				const volume = req.body["volume"] || undefined;
				const temperaturaMedicaoVolume = req.body["temperaturaMedicaoVolume"] || 0;
				const densidadeFabrica = req.body["densidadeFabrica"] || undefined;
				const pesoTina = req.body["pesoTina"] || undefined;
				const densidadeLab = req.body["densidadeLab"] || undefined;
				const horaInicioFervura = req.body["horaInicioFervura"] || undefined;
				const medicaoCorrecaoPh = req.body["medicaoCorrecaoPh"] || undefined;
				const volumeFinalFervura = req.body["volumeFinalFervura"] || undefined;
				const pesoFinalTina = req.body["pesoFinalTina"] || undefined;
				const trub = req.body["trub"] || undefined;
				const densidadeFinalFab = req.body["densidadeFinalFab"] || undefined;
				const densidadeFinalLab = req.body["densidadeFinalLab"] || undefined;
				const temperaturaTransf = req.body["temperaturaTransf"] || 0;
				const volumeTransf = req.body["volumeTransf"] || undefined;
				const horaFim = req.body["horaFim"] || undefined;
				const keg = req.body["keg"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;

				BrassagemModel.addBrassagem(dataEvaseSaca, turno, lote, validade, posicaoSuperior, posicaoInferior, dia, horaMashIn, densidadePrimario, phLab, densidadeFinalSparge, horaInicioMashOut, volume, temperaturaMedicaoVolume, densidadeFabrica, pesoTina, densidadeLab, horaInicioFervura, medicaoCorrecaoPh, volumeFinalFervura, pesoFinalTina, trub, densidadeFinalFab, densidadeFinalLab, temperaturaTransf, volumeTransf, horaFim, keg, responsavel, numOperacao, (err, _results) => {
					if (err) {
						console.log(err);
						return res.status(500).json({
							success: false,
							msg: "Erro no servidor.",
						});
					}
					return res.json({
						success: true,
						msg: "",
					});
				});
			}
			return;
		});
	}

	static deleteBrassagem(req: Request, res: Response) {
		const id = req.body["id"] || undefined;

		BrassagemModel.deleteBrassagem(id, (err, _results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					success: false,
					msg: "Erro no servidor.",
				});
			}
			return res.json({
				success: true,
				msg: "",
			});
		});
	}
}
