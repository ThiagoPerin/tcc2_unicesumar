import { NextFunction, Request, Response } from "express";

const forbiddenChars = "'\"<>():?/*\\;[]{}=+!%$#@~^s";

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

// #1º verifica se existeo atributo "company" no token.
// Se não tiver, retorna false e da "Acesso negado".

// #2º verifica se o comprimento do array "company" é igual a 1
// caso nao seja igual a 1, significa que nenhum ou mais de um valor foi atribuido para "company"
// nesso caso, retorna false e da "Acesso negado".

// #3º após verificar se company existe e tem o tamanho correto de elementos (1)
// é então verificado se o valor do atributo company é um CPF ou CNPJ válido
// a verificação pode ser feita tanto com as pontuações (".", "-" e "/") quanto sem elas.
// caso seja um CPF ou CNPJ válido, retorna true e permite o acesso
// caso não seja um CPF ou CNPJ válido, retorna false e da "Acesso negado".
// export const hasAuthorization: GuardFn = (token, _req) => {
// 	const company = (token as any).content.company;
// 	const name = (token as any).content.name;
// 	const email = (token as any).content.email;
// 	const username = (token as any).content.preferred_username;
// 	if (company && name && email && username) {
// 		if (typeof company === "string") {
// 			return cpf.isValid(company) || cnpj.isValid(company);
// 		} else if (Array.isArray(company) && company.length === 1) {
// 			return cpf.isValid(company[0]) || cnpj.isValid(company[0]);
// 		} else {
// 			return false;
// 		}
// 	} else {
// 		return false;
// 	}
// };

// export const hasAuthorization: GuardFn = (token, _req) => {
// 	return true
// 		|| token.hasApplicationRole(appName, "Admin");
// }; 
