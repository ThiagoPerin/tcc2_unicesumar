import { Request, Response } from "express";
import { CalendarioModel } from "../models/CalendarioModel";

export class CalendarioController {
	static getCalendario(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		CalendarioModel.getCalendario(numOperacao, company, (err, results) => {
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
}
