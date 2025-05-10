<script>
	import { Utils } from "../../utils/Utils";
	export let registro;

	let dataInicio = registro["DATA_INICIO"] ? Utils.dateFormatter((new Date(registro["DATA_INICIO"])).toISOString().split('T')[0]) : "";
	let horaInicio = registro["HORA_INICIO"] ? Utils.extrairHoraMinutos(registro["HORA_INICIO"]) : "";
	let dataFim = registro["DATA_FIM"] ? Utils.dateFormatter((new Date(registro["DATA_FIM"])).toISOString().split('T')[0]) : "";
	let horaFim = registro["HORA_FIM"] ? Utils.extrairHoraMinutos(registro["HORA_FIM"]) : "";
	let tanqueEntrada = registro["TANQUE_ENTRADA"] || "";
	let temperaturaEntrada = registro["TEMPERATURA_ENTRADA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registro["TEMPERATURA_ENTRADA"]) + " °C" : "";
	let pressaoEntrada =  registro["PRESSAO_ENTRADA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["PRESSAO_ENTRADA"]) + " Kgf" : "";
	let tanqueSaida = registro["TANQUE_SAIDA"] || "";
	let temperaturaSaida = registro["TEMPERATURA_SAIDA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registro["TEMPERATURA_SAIDA"]) + " °C" : "";
	let pressaoSaida =  registro["PRESSAO_SAIDA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["PRESSAO_SAIDA"]) + " Kgf" : "";
	let pressaoCuba =  registro["PRESSAO_CUBA_SETPOINT"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["PRESSAO_CUBA_SETPOINT"]) + " Kgf" : "";
	let responsavel = registro["RESPONSAVEL"] || "";
  </script>
  
  <div class="table">
	<table >
	  <tr>
		<td>Data Início: {dataInicio}</td>
		<td>Hora Início: {horaInicio}</td>
		<td>Data fim: {dataFim}</td>
		<td>Hora fim: {horaFim}</td>
	  </tr>
	  <tr>
		<th>Tanque de entrada</th>
	  </tr>
	  <tr>
		<td>Tanque: {tanqueEntrada}</td>
		<td>Temperatura: {temperaturaEntrada}</td>
		<td>Pressão: {pressaoEntrada}</td>
	  </tr>
	  <tr>
		<th>Tanque de saída</th>
	  </tr>
	  <tr>
		<td>Tanque: {tanqueSaida}</td>
		<td>Temperatura: {temperaturaSaida}</td>
		<td>Pressão: {pressaoSaida}</td>
	  </tr>
	  <tr>
		<td>Pressão cuba setpoint: {pressaoCuba}</td>
		<td>Responsável: {responsavel}</td>
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