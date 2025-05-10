import { Request, Response } from "express";
import { CentrifugacaoResumoModel } from "../models/CentrifugacaoResumoModel";
import { OpModel } from "../models/OpModel";

export class CentrifugacaoResumoController {
	static getCentrifugacaoResumo(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		CentrifugacaoResumoModel.getCentrifugacaoResumo(numOperacao, company, (err, results) => {
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

	static addCentrifugacaoResumo(req: Request, res: Response) {
		
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
				const dataCentrifugacao = req.body["dataCentrifugacao"] || undefined;
				const deTanque = req.body["deTanque"] || undefined;
				const paraTanque = req.body["paraTanque"] || undefined;
				const volume = req.body["volume"] || undefined;
				const horaInicio = req.body["horaInicio"] || undefined;
				const horaFim = req.body["horaFim"] || undefined;
				const ebc = req.body["ebc"] || undefined;
				const hlh = req.body["hlh"] || undefined;
				const total = req.body["total"] || undefined;
				const media = req.body["media"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;

				CentrifugacaoResumoModel.addCentrifugacaoResumo(dataCentrifugacao, deTanque, paraTanque, volume, horaInicio, horaFim, ebc, hlh, total, media, responsavel, numOperacao, userId, company, (err, _results) => {
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

	static deleteCentrifugacaoResumo(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		CentrifugacaoResumoModel.deleteCentrifugacaoResumo(id, company, (err, _results) => {
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
