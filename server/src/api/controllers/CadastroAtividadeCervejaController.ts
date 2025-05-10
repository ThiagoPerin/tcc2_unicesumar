import { Request, Response } from "express";
import { atividadeCervejaModel } from "../models/CadastroAtividadeCervejaModel";

export class CadastroAtividadeCervejaController {
	static getAtividade(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const codigoCerveja = req.query["codigoCerveja"] as string;
		atividadeCervejaModel.getAtividade(codigoCerveja, company, (err, results) => {
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
		const cerveja = req.body["cerveja"] || undefined;
		const codigoCerveja = req.body["codigoCerveja"] || undefined;
		const atividade = req.body["atividade"] || undefined;
		const codigoAtividade = req.body["codigoAtividade"] || undefined;

		atividadeCervejaModel.addAtividade(cerveja, codigoCerveja, atividade, codigoAtividade, userId, company, (err, _results) => {
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
		atividadeCervejaModel.deleteAtividade(id, company, (err, _results) => {
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
