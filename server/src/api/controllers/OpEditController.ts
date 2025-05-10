import { Request, Response } from "express";
import { OpEditModel } from "../models/OpEditModel";
import { OpModel } from "../models/OpModel";

export class OpEditController {
	static editOp(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const usernameCorreto = "user_teste_123"
		const numOperacao = req.body["numOperacao"] || undefined;
		const numOperacaoNovo = req.body["numOperacaoNovo"] || undefined;
		const loteNovo = req.body["loteNovo"] || undefined;
		const username = req.body["username"] || undefined;

		if (numOperacaoNovo.length <= 0) {
			return res.json({
				sucess: false,
				msg: "O número da Op não pode ser nulo."
			});
		} else if (numOperacao === numOperacaoNovo) {
			if (username.toLowerCase().trim() !== usernameCorreto.toLowerCase().trim()) {
				return res.status(400).json({
					success: false,
					msg: "Usuário incorreto!"
				});
			} else {
				OpEditModel.changeOP(numOperacao, numOperacaoNovo, loteNovo, company, (err, _results) => {
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
		} else {
			OpModel.getOpByCode(numOperacaoNovo, company, (err, results) => {
				if (err) {
					console.log(err);
					return res.json({
						success: false,
						msg: "Erro no servidor.",
					});
				} else if (Object.values(results).length !== 0) {
					return res.status(400).json({
						success: false,
						msg: `Nº de operação: ${numOperacaoNovo} já existe.`,
					});
				} else {
					if (username.toLowerCase().trim() !== usernameCorreto.toLowerCase().trim()) {
						return res.status(400).json({
							success: false,
							msg: "Usuário incorreto!"
						});
					} else {
						OpEditModel.changeOP(numOperacao, numOperacaoNovo, loteNovo, company, (err, _results) => {
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
				return;
			});
		}
		return;
	}
}
