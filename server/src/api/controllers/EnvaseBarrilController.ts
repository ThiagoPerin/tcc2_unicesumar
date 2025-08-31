import { Request, Response } from "express";
import { EnvaseBarrilModel } from "../models/EnvaseBarrilModel";
import { OpModel } from "../models/OpModel";

export class EnvaseBarrilController {
	static getEnvaseBarril(req: Request, res: Response) {

		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		EnvaseBarrilModel.getEnvaseBarril(numOperacao, (err, results) => {
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

	static addEnvaseBarril(req: Request, res: Response) {

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
				const dataEnvase = req.body["dataEnvase"] || undefined;
				const tanque = req.body["tanque"] || undefined;
				const p01 = req.body["p01"] || undefined;
				const p02 = req.body["p02"] || undefined;
				const p20 = req.body["p20"] || undefined;
				const p30 = req.body["p30"] || undefined;
				const growler = req.body["growler"] || undefined;
				const oak = req.body["oak"] || undefined;
				const total = req.body["total"] || undefined;
				const observacoes = req.body["observacoes"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;

				EnvaseBarrilModel.addEnvaseBarril(dataEnvase, tanque, p01, p02, p20, p30, growler, oak, total, responsavel, observacoes, numOperacao, (err, _results) => {
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

	static deleteEnvaseBarril(req: Request, res: Response) {
		const id = req.body["id"] || undefined;

		EnvaseBarrilModel.deleteEnvaseBarril(id, (err, _results) => {
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
