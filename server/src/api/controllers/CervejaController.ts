import { Request, Response } from "express";
import { CervejaModel } from "../models/CervejaModel";

export class CervejaController {
	static getCerveja(req: Request, res: Response) {

		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		CervejaModel.getCerveja(numOperacao, (err, results) => {
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

	static updateCerveja(req: Request, res: Response) {

		const numOperacao = req.body["numOperacao"] || undefined;
		CervejaModel.getCerveja(numOperacao, (err, results) => {
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
				const updateObject: any = {
					CERVEJEIRO_RESPONSAVEL_1: req.body["cervejeiro1"] || null,
					CERVEJEIRO_RESPONSAVEL_2: req.body["cervejeiro2"] || null,
					TANQUE_FERMENTACAO: req.body["tanqueFerm"] || null,
					VOLUME_FERMENTACAO: req.body["volumeFerm"] || null,
					TEMP_INICIO_FERMENTACAO: req.body["tempInicioFerm"] || 0,
					EXTRATO_INICIAL: req.body["extratoInicial"] || null,
					EXTRATO_FINAL: req.body["extratoFinal"] || null,
					ABV_CALCULADO: req.body["AbvCalc"] || null,
					VOLUME_UTIL_FINAL: req.body["volumeUtilFinal"] || null,
					ATEN_APAR: req.body["atenApar"] || null,
					DT_INICIO_FABRICACAO: req.body["dtInicio"] || null,
					DT_ENCERRAMENTO: req.body["dtEncerramento"] || null,
				};

				const updateValues: any = [];
				const updateColumns = Object.keys(updateObject).map((column) => {
					const data = updateObject[column];
					if (data !== null) {
						updateValues.push(`${data}`);
						return `${column} = ?`;
					} else {
						return `${column} = NULL`;
					}
				});

				CervejaModel.updateCerveja(updateColumns, updateValues, numOperacao, (err, _results) => {
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
