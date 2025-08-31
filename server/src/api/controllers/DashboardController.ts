import { Request, Response } from "express";
import { DashboardModel } from "../models/DashboardModel";

export class DashboardController {
	static getDonutOp(_req: Request, res: Response) {

		DashboardModel.getDonutOp((err, results) => {
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
	static getBarOp(_req: Request, res: Response) {

		DashboardModel.getBarOp((err, results) => {
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
	static getDonutLatas(_req: Request, res: Response) {

		DashboardModel.getDonutLatas((err, results) => {
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
	static getDonutLatasDetalhado(_req: Request, res: Response) {

		DashboardModel.getDonutLatasDetalhado((err, results) => {
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
