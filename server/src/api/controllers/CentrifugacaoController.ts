import { Request, Response } from "express";
import { CentrifugacaoModel } from "../models/CentrifugacaoModel";
import { OpModel } from "../models/OpModel";

export class CentrifugacaoController {
	static getCentrifugacao(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		CentrifugacaoModel.getCentrifugacao(numOperacao, company, (err, results) => {
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

	static addCentrifugacao(req: Request, res: Response) {
		
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
				const temperatura = req.body["temperatura"] || 0;
				const hora = req.body["hora"] || undefined;
				const ebc = req.body["ebc"] || undefined;
				const hlh = req.body["hlh"] || undefined;
				const acumulado = req.body["acumulado"] || undefined;
				const observacoes = req.body["observacoes"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;
				const fim = req.body["fim"] || undefined;

				CentrifugacaoModel.addCentrifugacao(dataCentrifugacao, deTanque, paraTanque, temperatura, hora, ebc, hlh, acumulado, observacoes, responsavel, fim, numOperacao, userId, company, (err, _results) => {
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

	static deleteCentrifugacao(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		CentrifugacaoModel.deleteCentrifugacao(id, company, (err, _results) => {
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
