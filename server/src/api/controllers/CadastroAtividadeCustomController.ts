import { Request, Response } from "express";
import { atividadeCustomModel } from "../models/CadastroAtividadeCustomModel";

export class CadastroAtividadeCustomController {
	static getAtividade(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		atividadeCustomModel.getAtividade(numOperacao, company, (err, results) => {
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

	static addAtividade(req: Request, res: Response) {
		
		const userId = "user_teste_123";
		const company = "empresa_teste_123";
		const numOperacao = req.body["numOperacao"] || undefined;
		const nomeAtividade = req.body["nomeAtividade"] || undefined;
		const inicio = req.body["inicio"] || undefined;
		const fim = req.body["fim"] || undefined;
		const horarioExecucao = req.body["horarioExecucao"] || undefined;
		const descricao = req.body["descricao"] || undefined;

		atividadeCustomModel.addAtividade(numOperacao, nomeAtividade, inicio, fim, horarioExecucao, descricao, userId, company, (err, _results) => {
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

	static deleteAtividade(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		atividadeCustomModel.deleteAtividade(id, company, (err, _results) => {
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
