<script>
  import { Utils } from "../../utils/Utils";
  export let registroPriming;

  let dataPriming = registroPriming["DATA"] ? Utils.dateFormatter((new Date(registroPriming["DATA"])).toISOString().split('T')[0]) : "";
	let volumeCervejaPriming = registroPriming["VOLUME_CERVEJA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroPriming["VOLUME_CERVEJA"]) + " L" : "";
	let tanquePriming = registroPriming["TANQUE"] || "";
	let gLDextrosePriming = registroPriming["GL_DEXTROSE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroPriming["GL_DEXTROSE"]) + " g/L" : "";
	let quantidadeDextrosePriming = registroPriming["QUANTIDADE_DEXTROSE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroPriming["QUANTIDADE_DEXTROSE"]) + " g" : "";
	let aguaPriming =  registroPriming["AGUA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroPriming["AGUA"]) + " L" : "";
	let nomeLeveduraPriming = registroPriming["NOME_LEVEDURA"] || "";
	let loteLeveduraPriming = registroPriming["LOTE_LEVEDURA"] || "";
	let validadeLeveduraPriming = registroPriming["VALIDADE_LEVEDURA"] ? Utils.dateFormatter((new Date(registroPriming["VALIDADE_LEVEDURA"])).toISOString().split('T')[0]) : "";
	let gLLeveduraPriming = registroPriming["GL_LEVEDURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroPriming["GL_LEVEDURA"]) + " g/L" : "";
	let quantidadeLeveduraPriming =  registroPriming["QUANTIDAE_PCT_LEVEDURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroPriming["QUANTIDAE_PCT_LEVEDURA"]) + " %" : "";
	let responsavelPriming = registroPriming["RESPONSAVEL"] || "";
</script>

<div class="table">
    <table >
        <tr>
          <td>Data: {dataPriming}</td>
          <td>Volume cerveja (L): {volumeCervejaPriming}</td>
          <td>Tanque: {tanquePriming}</td>
          <td>Responsável: {responsavelPriming}</td>
        </tr>
        <tr>
          <th>Dextrose </th>
        </tr>
        <tr>
          <td>g/L: {gLDextrosePriming}</td>
          <td>Quantidade (g): {quantidadeDextrosePriming} </td>
          <td>Água (L): {aguaPriming}</td>
        </tr>
        <tr>
          <th>Levedura </th>
        </tr>
        <tr>
          <td>Nome: {nomeLeveduraPriming}</td>
          <td>Lote: {loteLeveduraPriming}</td>
          <td>Validade: {validadeLeveduraPriming}</td>
          <td>g/L: {gLLeveduraPriming}</td>
          <td>Qtd. pct. (%): {quantidadeLeveduraPriming}</td>
        </tr>
      </table>
</div>

<style>
    table {
     width: 100%;
    }
    
    table,
    td {
     border: 1px solid black;
    }
 
    .table {
     border: 2px solid black;
     border-radius: 10px;
     padding: 15px;
     margin: 5px;
     width: 100%;
    }
 </style>
 