import { Request, Response } from "express";
import { PasteurizacaoModel } from "../models/PasteurizacaoModel";
import { OpModel } from "../models/OpModel";

export class PasteurizacaoController {
	static getPasteurizacao(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		PasteurizacaoModel.getPasteurizacao(numOperacao, company, (err, results) => {
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

	static addPasteurizacao(req: Request, res: Response) {
		
		const userId = "user_teste_123";
		const company = "empresa_teste_123";
		const numOperacao = req.body["numOperacao"] || undefined;
		OpModel.getOpByCode(numOperacao, company, (err, results) => {
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
				const dataInicio = req.body["dataInicio"] || undefined;
				const horaInicio = req.body["horaInicio"] || undefined;
				const dataFim = req.body["dataFim"] || undefined;
				const horaFim = req.body["horaFim"] || undefined;
				const tanqueEntrada = req.body["tanqueEntrada"] || undefined;
				const temperaturaEntrada = req.body["temperaturaEntrada"] || undefined;
				const pressaoEntrada = req.body["pressaoEntrada"] || undefined;
				const tanqueSaida = req.body["tanqueSaida"] || undefined;
				const temperaturaSaida = req.body["temperaturaSaida"] || undefined;
				const pressaoSaida = req.body["pressaoSaida"] || undefined;
				const pressaoCuba = req.body["pressaoCuba"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;

				PasteurizacaoModel.addPasteurizacao(dataInicio, horaInicio, dataFim, horaFim, tanqueEntrada, temperaturaEntrada, pressaoEntrada, tanqueSaida, temperaturaSaida, pressaoSaida, pressaoCuba, responsavel, numOperacao, userId, company, (err, _results) => {
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

	static deletePasteurizacao(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		PasteurizacaoModel.deletePasteurizacao(id, company, (err, _results) => {
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
