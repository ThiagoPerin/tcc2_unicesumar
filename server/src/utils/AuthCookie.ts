import crypto from "node:crypto";

export default class AuthCookie {

    static getDaily(date: Date) {
        const secret = `_#${date.toLocaleDateString()}#_#B0D3_14R4`;
        return crypto.createHash("sha256").update(secret).digest("hex");
    }

    static getFake() {
        return AuthCookie.getDaily(new Date(1969, 3, 1));
    }

}