import fs from "node:fs";
import path from "node:path";
const picturesRelativePath = path.join(__dirname, "../../static/images/parts");
const OUTPUT_FOLDER = `/parts`;
const NO_IMG_PATH = "/sem-imagem.png";

export const pictures = {
    getPicturePath: (item: any, hex: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; } | null) => {
        try {
            // Verificar se já existe imagem do item
            const filePath = path.join(picturesRelativePath, `${item}.jpg`);
            if (fs.existsSync(filePath)) {
                return `${OUTPUT_FOLDER}/${item}.jpg`;
            }
            // Verifica se veio o hexadecimal
            if (hex === null || hex.toString().trim() === "") return NO_IMG_PATH;
            // Criar arquivo de imagem
            const buffer = Buffer.from(hex, "hex");
            fs.writeFileSync(filePath, buffer);
            return `${OUTPUT_FOLDER}/${item}.jpg`;
        } catch (err) {
            console.log(err);
            return NO_IMG_PATH;
        }
    }
}