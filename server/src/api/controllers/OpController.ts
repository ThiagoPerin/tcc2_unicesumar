import { Request, Response } from "express";
import { OpModel } from "../models/OpModel";

export class OpController {
	static getOp(_req: Request, res: Response) {

		OpModel.getOp((err, results) => {
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

	static addOp(req: Request, res: Response) {
		const numOperacao = req.body["numOperacao"] || undefined;
		const lote = req.body["lote"] || undefined;
		const dataEmissao = req.body["dataEmissao"] || undefined;
		const produto = req.body["produto"] || undefined;
		const codigoProduto = req.body["codigoProduto"] || undefined;
		const tanquePrimario = req.body["tanquePrimario"] || undefined;
		const capacidadeLote = req.body["capacidadeLote"] || undefined;
		const responsavel = req.body["responsavel"] || undefined;
		const observacoes = req.body["observacoes"] || undefined;
		const cliente = req.body["cliente"] || undefined;

		OpModel.getOpByCode(numOperacao, (err, results) => {
			if (err) {
				console.log(err);
				return res.json({
					success: false,
					msg: "Erro no servidor.",
				});
			} else if (Object.values(results).length !== 0) {
				return res.status(400).json({
					success: false,
					msg: `Nº de operação: ${numOperacao} já existe.`,
				});
			} else {

				OpModel.addOp(numOperacao, lote, dataEmissao, produto, codigoProduto, tanquePrimario, capacidadeLote, responsavel, cliente, observacoes, (err, _results) => {
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

	static updateStatus(req: Request, res: Response) {
		const numOperacao = req.body["numOperacao"] || undefined;
		const status = req.body["status"] || undefined;
		const lote = req.body["lote"] || undefined;

		OpModel.checkExistance(numOperacao, (err, results) => {
			if (err) {
				console.log(err);
				return res.json({
					success: false,
					msg: "Erro no servidor.",
				});
			} else if (Object.values(results).length === 0) {
				return res.status(400).json({
					success: false,
					msg: `Nº de operação: ${numOperacao} não existe.`,
				});
			} else {

				OpModel.updateStatus(status, numOperacao, lote, (err, _results) => {
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
}
