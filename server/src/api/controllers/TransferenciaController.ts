import { Request, Response } from "express";
import { TransferenciaModel } from "../models/TransferenciaModel";
import { OpModel } from "../models/OpModel";

export class TransferenciaController {
	static getTransferencia(req: Request, res: Response) {

		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		TransferenciaModel.getTransferencia(numOperacao, company, (err, results) => {
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

	static addTransferencia(req: Request, res: Response) {
		
		const userId = "user_teste_123";
		const company = "empresa_teste_123";
		const numOperacao = req.body["numOperacao"] || undefined;
		OpModel.getOpByCode(numOperacao, company, async (err, results) => {
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
				const tipoOperacao = req.body["tipoOperacao"] || undefined;
				const dataTransferencia = req.body["dataTransferencia"] || undefined;
				const deTanque = req.body["deTanque"] || undefined;
				const paraTanque = req.body["paraTanque"] || undefined;
				const temperatura = req.body["temperatura"] || 0;
				const purga = req.body["purga"] || undefined;
				const transfTotal = req.body["transfTotal"] || undefined;
				const descarte = req.body["descarte"] || undefined;
				const carb = req.body["carb"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;
				const observacoes = req.body["observacoes"] || undefined;

				TransferenciaModel.addTransferencia(tipoOperacao, dataTransferencia, deTanque, paraTanque, temperatura, purga, transfTotal,
					descarte, carb, responsavel, observacoes, numOperacao, userId, company, (err, _results) => {
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

	static deleteTransferencia(req: Request, res: Response) {
		const id = req.body["id"] || undefined;

		const company = "empresa_teste_123";
		TransferenciaModel.deleteTransferencia(id, company, (err, _results) => {
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
