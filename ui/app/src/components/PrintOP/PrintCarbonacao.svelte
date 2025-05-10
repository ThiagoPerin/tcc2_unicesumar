<script>
  import { Utils } from "../../utils/Utils";
  export let registroCarbonacao;

  let dataCarbonacao = registroCarbonacao["DATA"] ? Utils.dateFormatter((new Date(registroCarbonacao["DATA"])).toISOString().split('T')[0]) : "";
	let tanqueCarbonacao = registroCarbonacao["TANQUE"] || "";
	let temperaturaInicioCarbonacao = registroCarbonacao["TEMPERATURA_INICIO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCarbonacao["TEMPERATURA_INICIO"]) : "";
	let temperaturaFimCarbonacao = registroCarbonacao["TEMPERATURA_FIM"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCarbonacao["TEMPERATURA_FIM"]) + " °C" : "";
	let horaInicioCarbonacao = registroCarbonacao["HORA_INICIO"]  ? Utils.extrairHoraMinutos( registroCarbonacao["HORA_INICIO"] ) : "";
	let horaFimCarbonacao = registroCarbonacao["HORA_FIM"] ? Utils.extrairHoraMinutos(registroCarbonacao["HORA_FIM"]) : "";
	let pressaoCarbonacao = registroCarbonacao["PRESSAO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCarbonacao["PRESSAO"]) : "";
	let observacoesCarbonacao = registroCarbonacao["OBSERVACOES"] || "";
	let responsavelCarbonacao = registroCarbonacao["RESPONSAVEL"] || "";
</script>

<div class="table">
    <table >
        <tr>
          <td>Data: {dataCarbonacao}</td>
          <td>Tanque: {tanqueCarbonacao}</td>
          <td>Temperatura início (°C): {temperaturaInicioCarbonacao}</td>
          <td>Temperatura fim (°C): {temperaturaFimCarbonacao}</td>
        </tr>
        <tr>
          <td>Hora início: {horaInicioCarbonacao}</td>
          <td>Hora fim: {horaFimCarbonacao}</td>
          <td>Pressão (Kgf): {pressaoCarbonacao}</td>
          <td>Responsável: {responsavelCarbonacao}</td>
        </tr>
        <tr>
          <td>Observações: {observacoesCarbonacao}</td>
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