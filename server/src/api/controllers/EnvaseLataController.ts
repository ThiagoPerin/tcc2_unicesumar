import { Request, Response } from "express";
import { EnvaseLataModel } from "../models/EnvaseLataModel";
import { OpModel } from "../models/OpModel";

export class EnvaseLataController {
	static getEnvaseLata(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		EnvaseLataModel.getEnvaseLata(numOperacao, company, (err, results) => {
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

	static addEnvaseLata(req: Request, res: Response) {
		
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
				const dataEnvase = req.body["dataEnvase"] || undefined;
				const carbonatacao = req.body["carbonatacao"] || undefined;
				const tanque = req.body["tanque"] || undefined;
				const tamanho = req.body["tamanho"] || undefined;
				const horaInicio = req.body["horaInicio"] || undefined;
				const horaFim = req.body["horaFim"] || undefined;
				const quantidade = req.body["quantidade"] || undefined;
				const descarte = req.body["descarte"] || undefined;
				const descarteTampa = req.body["descarteTampa"] || undefined;
				const amassadaMáquina = req.body["amassadaMáquina"] || undefined;
				const amassadaCabine = req.body["amassadaCabine"] || undefined;
				const lab = req.body["lab"] || undefined;
				const litros = req.body["litros"] || undefined;
				const acidoAscorbico = req.body["acidoAscorbico"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;	

				EnvaseLataModel.addEnvaseLata(dataEnvase, carbonatacao, tanque, tamanho, horaInicio, horaFim, quantidade, descarte, descarteTampa, amassadaMáquina, amassadaCabine, lab, litros, responsavel, acidoAscorbico, numOperacao, userId, company, (err, _results) => {
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

	static deleteEnvaseLata(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		EnvaseLataModel.deleteEnvaseLata(id, company, (err, _results) => {
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
