import { Request, Response } from "express";
import { CervejaModel } from "../models/CadastroCervejaModel";

export class CadastroCervejaController {
	static getCerveja(_req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		CervejaModel.getCervejas(company, (err, results) => {
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

	static addCerveja(req: Request, res: Response) {
		
		const userId = "user_teste_123";
		const company = "empresa_teste_123";
		const nome = req.body["nome"] || undefined;
		const codigo = req.body["codigo"] || undefined;

		CervejaModel.getCervejaByCodeOrName(codigo, nome, company, (err, results) => {
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
				const nome = req.body["nome"] || undefined;
				const codigo = req.body["codigo"] || undefined;
				const grauAlcoolico = req.body["grauAlcoolico"] || undefined;
				const mapa = req.body["mapa"] || undefined;
				const ingrediente = req.body["ingrediente"] || undefined;

				CervejaModel.addCerveja(nome, codigo, grauAlcoolico, mapa, ingrediente, userId, company, (err, _results) => {
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

	static deleteCerveja(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		CervejaModel.deleteCerveja(id, company, (err, _results) => {
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
