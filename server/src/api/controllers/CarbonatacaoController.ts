import { Request, Response } from "express";
import { CarbonatacaoModel } from "../models/CarbonatacaoModel";
import { OpModel } from "../models/OpModel";

export class CarbonatacaoController {
	static getCarbonatacao(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		CarbonatacaoModel.getCarbonatacao(numOperacao, company, (err, results) => {
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

	static addCarbonatacao(req: Request, res: Response) {
		
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
				const dataCarbonatacao = req.body["dataCarbonatacao"] || undefined;
				const tanque = req.body["tanque"] || undefined;
				const temperaturaInicial = req.body["temperaturaInicial"] || 0;
				const temperaturaFinal = req.body["temperaturaFinal"] || 0;
				const horaInicio = req.body["horaInicio"] || undefined;
				const horaFim = req.body["horaFim"] || undefined;
				const pressao = req.body["pressao"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;
				const observacoes = req.body["observacoes"] || undefined;

				CarbonatacaoModel.addCarbonatacao(dataCarbonatacao, tanque, temperaturaInicial, temperaturaFinal, horaInicio, horaFim, pressao, responsavel, observacoes, numOperacao, userId, company, (err, _results) => {
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

	static deleteCarbonatacao(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		CarbonatacaoModel.deleteCarbonatacao(id, company, (err, _results) => {
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
