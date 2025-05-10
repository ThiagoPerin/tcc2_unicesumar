import { Request, Response } from "express";
import { InoculacaoModel } from "../models/InoculacaoModel";
import { OpModel } from "../models/OpModel";

export class InoculacaoController {
	static getInoculacao(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		InoculacaoModel.getInoculacao(numOperacao, company, (err, results) => {
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

	static addInoculacao(req: Request, res: Response) {
		
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
				const dataInoculacao = req.body["dataInoculacao"] || undefined;
				const levedura = req.body["levedura"] || undefined;
				const origemLote = req.body["origemLote"] || undefined;
				const contagem = req.body["contagem"] || undefined;
				const validade = req.body["validade"] || undefined;
				const quantidade = req.body["quantidade"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;

				InoculacaoModel.addInoculacao(dataInoculacao, levedura, origemLote, contagem, validade, quantidade, responsavel, numOperacao, userId, company, (err, _results) => {
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

	static deleteInoculacao(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		InoculacaoModel.deleteInoculacao(id, company, (err, _results) => {
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
