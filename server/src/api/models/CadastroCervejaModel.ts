import { pool } from "../../www";

export class CervejaModel {
  static getCervejas(
    callback: (error: any, results: any) => void) {
    pool.query(
      `SELECT * FROM ${process.env["MYSQL_DB"] as string}.CERVEJAS WHERE DELETED_AT IS NULL ORDER BY DESCRICAO;`,
      callback
    );
  }

  static getCervejaByCodeOrName(
    codigo: string,
    nome: string,
    callback: (error: any, results: any) => void
  ) {
    pool.query(
      `SELECT * FROM ${process.env["MYSQL_DB"] as string}.CERVEJAS WHERE (DESCRICAO = ? OR COD_CERVEJA = ?) AND DELETED_AT IS NULL;`,
      [nome, codigo],
      callback
    );
  }

  static addCerveja(
    nome: string,
    codigo: string,
    grauAlcoolico: number,
    mapa: string,
    ingrediente: string,
    callback: (error: any, results: any) => void
  ) {
    pool.query(
      `INSERT INTO ${process.env["MYSQL_DB"] as string}.CERVEJAS SET
      DESCRICAO = ?, COD_CERVEJA = ?, GRAU_ALCOOLICO = ?, REGISTRO_MAPA = ?, INGREDIENTE = ?;`,
      [nome, codigo, grauAlcoolico, mapa, ingrediente],
      callback
    );
  }

  static deleteCerveja(
    id: number,
    callback: (error: any, results: any) => void) {
    pool.query(
      `UPDATE ${process.env["MYSQL_DB"] as string}.CERVEJAS SET DELETED_AT = CURDATE() WHERE id = ?;`,
      [id],
      callback
    );
  }
}
