<script>
  import { Utils } from "../../utils/Utils";
  export let registroTransferencia;
    
	const tiposTransferencia = ["", "Entre tanques", "Abastecimento", "Esvaziamento"]
  let tipo = registroTransferencia["TIPO_OPERACAO"] ? tiposTransferencia[Number(registroTransferencia["TIPO_OPERACAO"])] : "";
  let dataTransferencia = registroTransferencia["DATA"] ? Utils.dateFormatter((new Date(registroTransferencia["DATA"])).toISOString().split('T')[0]) : "";
	let deTanqueTransferencia = registroTransferencia["DE_TANQUE"] || "";
	let paraTanqueTransferencia = registroTransferencia["PARA_TANQUE"] || "";
	let temperaturaTransferencia = registroTransferencia["TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroTransferencia["TEMPERATURA"]) + " °C" : "";
	let purgaTransferencia = registroTransferencia["PURGA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroTransferencia["PURGA"]) + " L" : "";
	let trasnfTotalTransferencia = registroTransferencia["TRANSF_TOTAL"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroTransferencia["TRANSF_TOTAL"]) + " L" : "";
	let descarteTransferencia = registroTransferencia["DESCARTE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroTransferencia["DESCARTE"]) + " L" : "";
	let carbTransferencia = registroTransferencia["CARB"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroTransferencia["CARB"]) + " Kgf" : "";
	let observacoesTransferencia = registroTransferencia["OBSERVACOES"] || "";
	let responsavelTransferencia = registroTransferencia["RESPONSAVEL"] || "";
</script>

<div class="table">
  <table >
    <tr>
      <td>Tipo: {tipo}</td>
      <td>Data: {dataTransferencia}</td>
    </tr>
    <tr>
      <td>De tanque: {deTanqueTransferencia}</td>
      <td>Para tanque: {paraTanqueTransferencia}</td>
      <td>Temperatura (°C): {temperaturaTransferencia}</td>
    </tr>
    <tr>
      <td>Purga (L): {purgaTransferencia}</td>
      <td>Transferência (L): {trasnfTotalTransferencia}</td>
      <td>Descarte (L): {descarteTransferencia}</td>
    </tr>
    <tr>
      <td>Carb (Kgf): {carbTransferencia}</td>
      <td>Observações: {observacoesTransferencia}</td>
      <td>Responsável: {responsavelTransferencia}</td>
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