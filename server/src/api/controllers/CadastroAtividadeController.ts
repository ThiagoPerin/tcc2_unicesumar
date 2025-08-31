import { Request, Response } from "express";
import { atividadeModel } from "../models/CadastroAtividadeModel";

export class CadastroAtividadeController {
	static getAtividade(_req: Request, res: Response) {

		atividadeModel.getAtividades((err, results) => {
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

		const nomeAtividade = req.body["nomeAtividade"] || undefined;
		const codigoAtividade = req.body["codigoAtividade"] || undefined;
		const diasExecutar = req.body["diasExecutar"] || undefined;
		const duracaoAtividade = req.body["duracaoAtividade"] || undefined;
		const horarioExecucao = req.body["horarioExecucao"] || undefined;

		atividadeModel.getAtividadeByCodeOrName(nomeAtividade, codigoAtividade, (err, results) => {
			if (err) {
				console.log(err);
				return res.json({
					success: false,
					msg: "Erro no servidor.",
				});
			} else if (Object.values(results).length !== 0) {
				return res.status(400).json({
					success: false,
					msg: `Código da cerveja ou nome já em uso`,
				});
			} else {
				atividadeModel.addatividade(codigoAtividade, nomeAtividade, diasExecutar, duracaoAtividade, horarioExecucao, (err, _results) => {
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

	static deleteAtividade(req: Request, res: Response) {
		const id = req.body["id"] || undefined;

		atividadeModel.deleteAtividade(id, (err, _results) => {
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
