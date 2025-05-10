import { Request, Response } from "express";

export class UserController {
    static getUserInfo(_req: Request, res: Response) {
        const userinfo = {
            name: "Teste Junior",
            email: "teste@gmail.com",
            username: "testador123",
            company: "empresa_teste_123",
            groups: ["grupo_teste"],
        };
        return res.json(userinfo);
    }
}