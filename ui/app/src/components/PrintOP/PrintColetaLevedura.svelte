<script>
  import { Utils } from "../../utils/Utils";
  export let registroColetaLevedura

  let dataLevedura = registroColetaLevedura["DATA"] ? Utils.dateFormatter((new Date(registroColetaLevedura["DATA"])).toISOString().split('T')[0]) : "";
	let tanqueLevedura = registroColetaLevedura["TANQUE"] || "";
	let temperaturaLevedura = registroColetaLevedura["TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroColetaLevedura["TEMPERATURA"]) + " °C" : "";
	let destinoLevedura = registroColetaLevedura["DESTINO"] || "";
	let loteLevedura = registroColetaLevedura["LOTE"] || "";
	let quantidadeLevedura = registroColetaLevedura["QUANTIDADE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroColetaLevedura["QUANTIDADE"]) + " L" : "";
	let responasavelLevedura = registroColetaLevedura["RESPONSAVEL"] || "";
	let observacoesLevedura = registroColetaLevedura["OBSERVACOES"] || "";
</script>

<div class="table">
    <table >
        <tr>
          <td>Data: {dataLevedura}</td>
          <td>Tanque: {tanqueLevedura}</td>
          <td>Temperatura (°C): {temperaturaLevedura}</td>
          <td>Destino:{destinoLevedura}</td>
        </tr>
        <tr>
          <td>Lote: {loteLevedura}</td>
          <td>Quantidade (L): {quantidadeLevedura}</td>
          <td>Responsável: {responasavelLevedura} </td>
        </tr>
        <tr>
          <td>Observações: {observacoesLevedura}</td>
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