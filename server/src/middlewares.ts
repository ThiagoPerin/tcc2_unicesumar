import { NextFunction, Request, Response } from "express";
import AuthCookie from "./utils/AuthCookie";

const forbiddenChars = "'\"<>():?/*\\;[]{}=+!%$#@~^";

function removeForbiddenChars(input: string) {
	return String(input).split("").map(char => forbiddenChars.includes(char) ? "" : char).join("");
}

export function sanitizeInput(req: Request, _: Response, next: NextFunction) {
	if (req.query["codigo"]) { req.query["codigo"] = removeForbiddenChars((req.query["codigo"] as string).trim()); }
	if (req.query["nome"]) { req.query["nome"] = removeForbiddenChars((req.query["nome"] as string).trim()); }
	if (req.query["mapa"]) { req.query["mapa"] = removeForbiddenChars((req.query["mapa"] as string).trim()); }
	if (req.query["grauAlcoolico"]) { req.query["grauAlcoolico"] = removeForbiddenChars((req.query["grauAlcoolico"] as string).trim()); }
	if (req.query["ingrediente"]) { req.query["ingrediente"] = removeForbiddenChars((req.query["ingrediente"] as string).trim()); }
	if (req.body["user"]) { req.body["user"] = removeForbiddenChars(req.body["user"].trim()); }
	if (req.body["password"]) { req.body["password"] = removeForbiddenChars(req.body["password"].trim()); }
	return next();
}

export function hasAuthorization(req: Request, res: Response, next: NextFunction) {
	if ((req.cookies?.["_bta"] || "") === AuthCookie.getDaily(new Date())) {
		return next();
	} else {
		return res.status(401).redirect("/login");
	}
}