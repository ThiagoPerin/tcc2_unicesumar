import { Request, Response } from "express";
import { FermentacaoForcadaModel } from "../models/FermentacaoForcadaModel";
import { OpModel } from "../models/OpModel";

export class FermentacaoForcadaController {
	static getFermentacaoForcada(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		FermentacaoForcadaModel.getFermentacaoForcada(numOperacao, company, (err, results) => {
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

	static addFermentacaoForcada(req: Request, res: Response) {
		
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
				const dataFermentacao = req.body["dataFermentacao"] || undefined;
				const hora = req.body["hora"] || undefined;
				const extratoInicial = req.body["extratoInicial"] || undefined;
				const extratoFinal = req.body["extratoFinal"] || undefined;
				const diasTeste = req.body["diasTeste"] || undefined;
				const horasAgit = req.body["horasAgit"] || undefined;
				const observacoes = req.body["observacoes"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;

				FermentacaoForcadaModel.addFermentacaoForcada(dataFermentacao, hora, extratoInicial, extratoFinal, diasTeste, horasAgit, responsavel, observacoes, numOperacao, userId, company, (err, _results) => {
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

	static deleteFermentacaoForcada(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		FermentacaoForcadaModel.deleteFermentacaoForcada(id, company, (err, _results) => {
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
