import { Request, Response } from "express";
import { DryHoppingModel } from "../models/DryHoppingModel";
import { OpModel } from "../models/OpModel";

export class DryHoppingController {
	static getDryHopping(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		DryHoppingModel.getDryHopping(numOperacao, company, (err, results) => {
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

	static addDryHopping(req: Request, res: Response) {
		
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
				const dataDryHopping = req.body["dataDryHopping"] || undefined;
				const tanque = req.body["tanque"] || undefined;
				const temperatura = req.body["temperatura"] || 0;
				const produto = req.body["produto"] || undefined;
				const lote = req.body["lote"] || undefined;
				const alfaAcido = req.body["alfaAcido"] || undefined;
				const quantidade = req.body["quantidade"] || undefined;
				const unidade = req.body["unidade"] || undefined;
				const validade = req.body["validade"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;

				DryHoppingModel.addDryHopping(dataDryHopping, tanque, temperatura, produto, lote, alfaAcido, quantidade, unidade, validade, responsavel, numOperacao, userId, company, (err, _results) => {
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

	static deleteDryHopping(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		DryHoppingModel.deleteDryHopping(id, company, (err, _results) => {
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
