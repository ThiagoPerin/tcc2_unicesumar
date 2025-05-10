import { pool } from "../../www";

export class CervejaModel {
  static getCervejas(
    company: string,
    callback: (error: any, results: any) => void) {
    pool.query(
      `SELECT * FROM ${process.env["MYSQL_DB"] as string}.CERVEJAS WHERE COMPANY = ? AND DELETED_AT IS NULL ORDER BY DESCRICAO;`,
      [company],
      callback
    );
  }

  static getCervejaByCodeOrName(
    codigo: string,
    nome: string,
    company: string,
    callback: (error: any, results: any) => void
  ) {
    pool.query(
      `SELECT * FROM ${process.env["MYSQL_DB"] as string}.CERVEJAS WHERE (DESCRICAO = ? OR COD_CERVEJA = ?) AND COMPANY = ? AND DELETED_AT IS NULL;`,
      [nome, codigo, company],
      callback
    );
  }

  static addCerveja(
    nome: string,
    codigo: string,
    grauAlcoolico: number,
    mapa: string,
    ingrediente: string,
    userId: string,
    company: string,
    callback: (error: any, results: any) => void
  ) {
    pool.query(
      `INSERT INTO ${process.env["MYSQL_DB"] as string}.CERVEJAS SET
      DESCRICAO = ?, COD_CERVEJA = ?, GRAU_ALCOOLICO = ?, REGISTRO_MAPA = ?, INGREDIENTE = ?, USER_ID = ?, COMPANY = ?;`,
      [nome, codigo, grauAlcoolico, mapa, ingrediente, userId, company],
      callback
    );
  }

  static deleteCerveja(
    id: number, 
    company: string,
    callback: (error: any, results: any) => void) {
    pool.query(
      `UPDATE ${process.env["MYSQL_DB"] as string}.CERVEJAS SET DELETED_AT = CURDATE() WHERE id = ? AND COMPANY = ?;`,
      [id, company],
      callback
    );
  }
}
