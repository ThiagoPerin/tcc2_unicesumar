import { Request, Response } from "express";
import { TransferenciaModel } from "../models/TransferenciaModel";
import { OpModel } from "../models/OpModel";
import { TanqueModel } from "../models/TanqueModel";
import { TipoOperacao } from "../types/TipoOperacao";

function validateTanksByOperation(tipoOperacao: number, deTanque: number | undefined, paraTanque: number | undefined) {
	switch (tipoOperacao) {
		case TipoOperacao.TRANSFERENCIA: // Transferência entre tanques
			if (deTanque === undefined || paraTanque === undefined) {
				return {
					valid: false,
					msg: "A transferência falhou: ambos os tanques devem ser definidos para a transferência entre tanques.",
				};
			} else if (deTanque === paraTanque) {
				return {
					valid: false,
					msg: `A transferência falhou: o tanque de origem (${deTanque}) e o tanque de destino (${paraTanque}) são os mesmos. Selecione tanques diferentes para realizar a transferência.`,
				};
			}
			break;
		case TipoOperacao.ABASTECIMENTO: // Abastecimento
			if (paraTanque === undefined || deTanque !== undefined) {
				return {
					valid: false,
					msg: "A operação de abastecimento falhou: o tanque de destino (Para tanque) deve ser definido para o abastecimento.",
				};
			}
			break;
		case TipoOperacao.ESVAZIAMENTO: // Esvaziamento
			if (deTanque === undefined || paraTanque !== undefined) {
				return {
					valid: false,
					msg: "A operação de esvaziamento falhou: o tanque de origem (De tanque) deve ser definido para o esvaziamento.",
				};
			}
			break;
		default:
			return {
				valid: false,
				msg: "Tipo de operação inválido.",
			};
	}
	return { valid: true };
}

async function validateVolumes(tipoOperacao: number, deTanque: number | undefined, paraTanque: number | undefined, transfTotal: number, company: string) {
	const validationResult = await new Promise<{ valid: boolean; msg: string; }>((resolve, _reject) => {
		TanqueModel.getTanque(company, (err: Error, results: any) => {
			if (err) {
				console.log(err);
				return resolve({
					valid: false,
					msg: "Erro ao obter dados do tanque.",
				});
			}
			const tanquesView = results;
			const tanqueDeOrigem = tanquesView.find((el: { [x: string]: number | undefined; }) => el["NUM_TANQUE"] === deTanque);
			const volumeMaxTanqueOrigem = Number(tanqueDeOrigem?.["VOLUME"]) || 0;
			const tanqueDeDestino = tanquesView.find((el: { [x: string]: number | undefined; }) => el["NUM_TANQUE"] === paraTanque);
			const volumeAtualParaTanque = Number(tanqueDeDestino?.["VOLUME"]) || 0;
			const capacidadeParaTanque = Number(tanqueDeDestino?.["CAPACIDADE"]) || 0;
			const volumeMaxTanqueDestino = capacidadeParaTanque - volumeAtualParaTanque;
			switch (tipoOperacao) {
				case TipoOperacao.TRANSFERENCIA: // Transferência entre tanques
					if (transfTotal > Math.min(volumeMaxTanqueOrigem, volumeMaxTanqueDestino)) {
						return resolve({
							valid: false,
							msg: "O volume transferido excede o volume disponível no tanque de origem ou a capacidade do tanque de destino.",
						});
					}
					break;
				case TipoOperacao.ABASTECIMENTO: // Abastecimento
					if (transfTotal > volumeMaxTanqueDestino) {
						return resolve({
							valid: false,
							msg: "O volume a ser abastecido excede a capacidade do tanque de destino.",
						});
					}
					break;
				case TipoOperacao.ESVAZIAMENTO: // Esvaziamento
					if (transfTotal > volumeMaxTanqueOrigem) {
						return resolve({
							valid: false,
							msg: "O volume a ser esvaziado excede o volume disponível no tanque de origem.",
						});
					}
					break;
				default:
					return resolve({
						valid: false,
						msg: "Tipo de operação inválido.",
					});
			}
			resolve({ valid: true, msg: "Validação bem-sucedida." });
		});
	});
	return validationResult;
};

export class TransferenciaController {
	static getTransferencia(req: Request, res: Response) {
		
		const company = "empresa_teste_123";
		const numOperacao = Number(req.query["numOperacao"]) || undefined;
		TransferenciaModel.getTransferencia(numOperacao, company, (err, results) => {
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

	static addTransferencia(req: Request, res: Response) {
		
		const userId = "user_teste_123";
		const company = "empresa_teste_123";
		const numOperacao = req.body["numOperacao"] || undefined;
		OpModel.getOpByCode(numOperacao, company, async (err, results) => {
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
				const tipoOperacao = req.body["tipoOperacao"] || undefined;
				const dataTransferencia = req.body["dataTransferencia"] || undefined;
				const deTanque = req.body["deTanque"] || undefined;
				const paraTanque = req.body["paraTanque"] || undefined;
				const temperatura = req.body["temperatura"] || 0;
				const purga = req.body["purga"] || undefined;
				const transfTotal = req.body["transfTotal"] || undefined;
				const descarte = req.body["descarte"] || undefined;
				const carb = req.body["carb"] || undefined;
				const responsavel = req.body["responsavel"] || undefined;
				const observacoes = req.body["observacoes"] || undefined;

				const tankValidation = validateTanksByOperation(tipoOperacao, deTanque, paraTanque);
				if (!tankValidation.valid) {
					return res.status(400).json({
						success: false,
						msg: tankValidation.msg,
					});
				}

				const volumeValidation = await validateVolumes(tipoOperacao, deTanque, paraTanque, transfTotal, company);
				if (!volumeValidation.valid) {
					return res.status(400).json({
						success: false,
						msg: volumeValidation.msg,
					});
				}

				TransferenciaModel.addTransferencia(tipoOperacao, dataTransferencia, deTanque, paraTanque, temperatura, purga, transfTotal,
					descarte, carb, responsavel, observacoes, numOperacao, userId, company, (err, _results) => {
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

	static deleteTransferencia(req: Request, res: Response) {
		const id = req.body["id"] || undefined;
		
		const company = "empresa_teste_123";
		TransferenciaModel.deleteTransferencia(id, company, (err, _results) => {
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
