import { Request, Response } from "express";
import { TanqueModel } from "../models/TanqueModel";

export class TanqueController {
	static getTanqueRegister(_req: Request, res: Response) {

		TanqueModel.getTanqueRegister((err, results) => {
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

		const numTanque = req.body["numTanque"] || undefined;
		TanqueModel.getTanqueRegisterByCode(numTanque, (err, results) => {
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
				TanqueModel.addTanqueRegister(numTanque, capacidade, (err, _results) => {
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

		TanqueModel.removeTanqueRegister(id, (err, _results) => {
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
