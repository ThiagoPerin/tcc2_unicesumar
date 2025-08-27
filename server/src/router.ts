import { Request, Response, Router } from "express";
import { sanitizeInput } from "./middlewares";
import Password from "./utils/Password";
import AuthCookie from "./utils/AuthCookie";

const authRouter = Router();

const validUser = process.env['VALID_USER'] as string;
const userSalt = process.env['USER_SALT'] as string;
const validHash = process.env['VALID_HASH'] as string;

authRouter.post("/login", [sanitizeInput], (req: Request, res: Response) => {
	const { user, password } = req.body;
	if (!user || !password) {
		return res.status(400).redirect("/login?e=noInput");
	}

	if (user === validUser && Password.getHash(password, userSalt) === validHash) {
		res.cookie("_bta", AuthCookie.getDaily(new Date()));
		res.status(200).redirect("/app");
	} else {
		res.cookie("_bta", AuthCookie.getFake());
		res.status(401).redirect("/login?e=invalidInput");
	}
});

export default authRouter;