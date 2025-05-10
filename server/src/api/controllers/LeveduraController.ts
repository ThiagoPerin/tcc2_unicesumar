import { Request, Response } from "express";
import { LeveduraModel } from "../models/LeveduraModel";
import { OpModel } from "../models/OpModel";

export class LeveduraController {
	static getLevedura(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		LeveduraModel.getLevedura(numOperacao, company, (err, results) => {
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

	static addLevedura(req: Request, res: Response) {
		
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
				const dataColeta = req.body["dataColeta"] || undefined;
				const tanque = req.body["tanque"] || undefined;
				const temperatura = req.body["temperatura"] || 0;
				const destino = req.body["destino"] || undefined;
				const lote = req.body["lote"] || undefined;
				const quantidade = req.body["quantidade"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;
				const observacoes = req.body["observacoes"] || undefined;

				LeveduraModel.addLevedura(dataColeta, tanque, temperatura, destino, lote, quantidade, responsavel, observacoes, numOperacao, userId, company, (err, _results) => {
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

	static deleteLevedura(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		LeveduraModel.deleteLevedura(id, company, (err, _results) => {
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
