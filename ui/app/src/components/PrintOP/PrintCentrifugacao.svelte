<script>
  import { Utils } from "../../utils/Utils";
  export let registroCentrifugacao

  let dataCentrifugacao = registroCentrifugacao["DATA"] ? Utils.dateFormatter((new Date(registroCentrifugacao["DATA"])).toISOString().split('T')[0]) : "";
	let deTanqueCentrifugacao = registroCentrifugacao["DE_TANQUE"] || "";
	let paraTanqueCentrifugacao = registroCentrifugacao["PARA_TANQUE"] || "";
	let temperaturaCentrifugacao = registroCentrifugacao["TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCentrifugacao["TEMPERATURA"]) + " °C" : "";
	let horaCentrifugacao = registroCentrifugacao["HORA"] ? Utils.extrairHoraMinutos(registroCentrifugacao["HORA"]) : "";
	let ebcCentrifugacao = registroCentrifugacao["EBC"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCentrifugacao["EBC"]) : "";
	let hlhCentrifugacao = registroCentrifugacao["HLH"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCentrifugacao["HLH"]) : "";
	let acumuladoCentrifugacao = registroCentrifugacao["ACUMULADO_HL"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCentrifugacao["ACUMULADO_HL"]) : "";
	let observacoesCentrifugacao = registroCentrifugacao["OBSERVACOES"] || "";
	let fimCentrifugacao = registroCentrifugacao["FIM"] ? Boolean(Number(registroCentrifugacao["FIM"])) : "";
	let responsavelCentrifugacao = registroCentrifugacao["RESPONSAVEL"] || "";
</script>

<div class="table">
    <table >
        <tr>
          <td>Data: {dataCentrifugacao}</td>
          <td>De tanque: {deTanqueCentrifugacao} </td>
          <td>Para tanque: {paraTanqueCentrifugacao}</td>
          <td>Temperatura (°C): {temperaturaCentrifugacao}</td>
        </tr>
        <tr>
          <td>Hora: {horaCentrifugacao}</td>
          <td>EBC: {ebcCentrifugacao}</td>
          <td>hL/h: {hlhCentrifugacao}</td>
          <td>Acumulado hL: {acumuladoCentrifugacao}</td>
          <td>Fim da centrifugação: {fimCentrifugacao}</td>
        </tr>
        <tr>
          <td>Observações: {observacoesCentrifugacao}</td>
        </tr>
        <tr>
          <td>Responsável: {responsavelCentrifugacao}</td>
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
 