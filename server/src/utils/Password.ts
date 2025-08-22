import crypto from "node:crypto";

export default class Password {

    static getHash(rawPassword: string, salt: string) {
        return crypto.createHmac("SHA256", salt).update(rawPassword).digest("hex");
    }

}