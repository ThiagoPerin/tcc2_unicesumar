import { Request, Response } from "express";
import { PrimingModel } from "../models/PrimingModel";
import { OpModel } from "../models/OpModel";

export class PrimingController {
	static getPriming(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		PrimingModel.getPriming(numOperacao, company, (err, results) => {
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

	static addPriming(req: Request, res: Response) {
		
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
				const dataPriming = req.body["dataPriming"] || undefined;
				const volumeCerveja = req.body["volumeCerveja"] || undefined;
				const tanque = req.body["tanque"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;
				const gLDextrose = req.body["gLDextrose"] || undefined;
				const quantidade = req.body["quantidade"] || undefined;
				const agua = req.body["agua"] || undefined;
				const nome = req.body["nome"] || undefined;
				const lote = req.body["lote"] || undefined;
				const validade = req.body["validade"] || undefined;
				const gLLevedura = req.body["gLLevedura"] || undefined;
				const quantidadePct = req.body["quantidadePct"] || undefined;

				PrimingModel.addPriming(dataPriming, volumeCerveja, tanque, responsavel, gLDextrose, quantidade, agua, nome, lote, validade, gLLevedura, quantidadePct, numOperacao, userId, company, (err, _results) => {
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

	static deletePriming(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		PrimingModel.deletePriming(id, company, (err, _results) => {
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
