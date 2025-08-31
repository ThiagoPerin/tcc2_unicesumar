import { Request, Response } from "express";
import { MonitoramentoModel } from "../models/MonitoramentoModel";
import { OpModel } from "../models/OpModel";

export class MonitoramentoController {
	static getMonitoramento(req: Request, res: Response) {

		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		MonitoramentoModel.getMonitoramento(numOperacao, (err, results) => {
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

	static addMonitoramento(req: Request, res: Response) {

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
				const dataMonitoramento = req.body["dataMonitoramento"] || undefined;
				const hora = req.body["hora"] || undefined;
				const extrato = req.body["extrato"] || undefined;
				const temperatura = req.body["temperatura"] || 0;
				const alteracao = req.body["alteracao"] || 0;

				MonitoramentoModel.addMonitoramento(dataMonitoramento, hora, extrato, temperatura, alteracao, numOperacao, (err, _results) => {
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

	static deleteMonitoramento(req: Request, res: Response) {
		const id = req.body["id"] || undefined;

		MonitoramentoModel.deleteMonitoramento(id, (err, _results) => {
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
