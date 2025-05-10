import { Request, Response } from "express";
import { TanqueModel } from "../models/TanqueModel";

export class TanqueController {
	static getTanque(_req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		TanqueModel.getTanque(company, (err, results) => {
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

	static getTanqueHistorico(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numTanque = Number(req.query["numTanque"]) || undefined;
		TanqueModel.getTanqueHistorico(numTanque, company, (err, results) => {
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

	static getTanqueRegister(_req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		TanqueModel.getTanqueRegister(company, (err, results) => {
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

	static addTanqueRegister(req: Request, res: Response) {
		
		const userId = "user_teste_123";
		const company = "empresa_teste_123";
		const numTanque = req.body["numTanque"] || undefined;
		TanqueModel.getTanqueRegisterByCode(numTanque, company, (err, results) => {
			if (err) {
				console.log(err);
				return res.json({
					success: false,
					msg: "Erro no servidor.",
				});
			} else if (Object.values(results).length !== 0) {
				return res.status(400).json({
					success: false,
					msg: `Tanque Nº: ${numTanque} já existe`,
				});
			} else {
				const numTanque = req.body["numTanque"] || undefined;
				const capacidade = req.body["capacidade"] || undefined;
				TanqueModel.addTanqueRegister(numTanque, capacidade, userId, company, (err, _results) => {
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

	static deleteTanqueRegister(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		TanqueModel.removeTanqueRegister(id, company, (err, _results) => {
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
