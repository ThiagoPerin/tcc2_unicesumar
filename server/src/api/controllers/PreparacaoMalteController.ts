import { Request, Response } from "express";
import { PreparacaoMalteModel } from "../models/PreparacaoMalteModel";
import { OpModel } from "../models/OpModel";

export class PreparacaoMalteController {
	static getPreparacaoMalte(req: Request, res: Response) {

		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		PreparacaoMalteModel.getPreparacaoMalte(numOperacao, (err, results) => {
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

	static addPreparacaoMalte(req: Request, res: Response) {

		const numOperacao = req.body["numOperacao"] || undefined;
		OpModel.getOpByCode(numOperacao, (err, results) => {
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
				const separacao = req.body["separacao"] || undefined;
				const conferencia1 = req.body["conferencia1"] || undefined;
				const conferencia2 = req.body["conferencia2"] || undefined;
				const moagem = req.body["moagem"] || undefined;

				PreparacaoMalteModel.addPreparacaoMalte(separacao, conferencia1, conferencia2, moagem, numOperacao, (err, _results) => {
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

	static deletePreparacaoMalte(req: Request, res: Response) {
		const id = req.body["id"] || undefined;

		PreparacaoMalteModel.deletePreparacaoMalte(id, (err, _results) => {
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
