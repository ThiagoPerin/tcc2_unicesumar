<script>
  import { Utils } from "../../utils/Utils";
  export let registroCentrifugacaoResumo;

	let dataResumocentrifugacao = registroCentrifugacaoResumo["DATA"] ? Utils.dateFormatter((new Date(registroCentrifugacaoResumo["DATA"])).toISOString().split('T')[0]) : "";
	let deTanqueResumocentrifugacao = registroCentrifugacaoResumo["DE_TANQUE"] || "";
	let paraTanqueResumocentrifugacao = registroCentrifugacaoResumo["PARA_TANQUE"] || "";
	let volumeInicialResumocentrifugacao = registroCentrifugacaoResumo["VOLUME"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCentrifugacaoResumo["VOLUME"]) + " L" : "";
	let horaInicioResumocentrifugacao = registroCentrifugacaoResumo["HORA_INICIO"] ? Utils.extrairHoraMinutos(registroCentrifugacaoResumo["HORA_INICIO"]) : "";
	let horaFimResumocentrifugacao = registroCentrifugacaoResumo["HORA_FIM"] ? Utils.extrairHoraMinutos(registroCentrifugacaoResumo["HORA_FIM"]) : "";
	let hlhResumocentrifugacao = registroCentrifugacaoResumo["HLH"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCentrifugacaoResumo["HLH"]) : "";
	let ebcResumocentrifugacao = registroCentrifugacaoResumo["EBC"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCentrifugacaoResumo["EBC"]) : "";
	let totalHlResumocentrifugacao = registroCentrifugacaoResumo["TOTAL"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCentrifugacaoResumo["TOTAL"]) : "";
	let mediaResumocentrifugacao = registroCentrifugacaoResumo["MEDIA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroCentrifugacaoResumo["MEDIA"]) : "";
	let responsavelResumocentrifugacao = registroCentrifugacaoResumo["RESPONSAVEL"] || "";
</script>

<div class="table">
    <table >
        <tr>
          <td>Data: {dataResumocentrifugacao}</td>
          <td>De tanque: {deTanqueResumocentrifugacao} </td>
          <td>Para tanque: {paraTanqueResumocentrifugacao}</td>
          <td>Volume inicial: {volumeInicialResumocentrifugacao}</td>
        </tr>
        <tr>
          <td>Hora início : {horaInicioResumocentrifugacao}</td>
          <td>Hora Fim: {horaFimResumocentrifugacao}</td>
          <td>EBC: {ebcResumocentrifugacao}</td>
          <td>hL/h: {hlhResumocentrifugacao}</td>
        </tr>
        <tr>
          <td>Total hL: {totalHlResumocentrifugacao}</td>
          <td>Media:{mediaResumocentrifugacao}</td>
        </tr>
        <tr>
          <td>Responsável: {responsavelResumocentrifugacao}</td>
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
 