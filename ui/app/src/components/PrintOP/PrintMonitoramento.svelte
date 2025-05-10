<script>
    export let registroMonitoramento
    import { Utils } from "../../utils/Utils";

    let dataExtratoTemperatura = registroMonitoramento["DATA"] ? Utils.dateFormatter((new Date(registroMonitoramento["DATA"])).toISOString().split('T')[0]) : "";
	let horaExtratoTemperatura = registroMonitoramento["HORA"] ? Utils.extrairHoraMinutos(registroMonitoramento["HORA"]) : "";
	let extratoExtratoTemperatura = registroMonitoramento["EXTRATO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroMonitoramento["EXTRATO"]) + " Sg" : "";
	let temperaturaExtratoTemperatura = registroMonitoramento["TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registroMonitoramento["TEMPERATURA"]) + " °C" : "";
	let alterTempExtratoTemperatura = registroMonitoramento["ALTERACAO_TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registroMonitoramento["ALTERACAO_TEMPERATURA"]) + " °C" : "";
</script>

<div class="table">
    <table >
        <tr>
            <td>Data: {dataExtratoTemperatura}</td>
            <td>Hora: {horaExtratoTemperatura}</td>
            <td>Extrato (Sg): {extratoExtratoTemperatura}</td>
            <td>temperatura (°C): {temperaturaExtratoTemperatura}</td>
            <td>Alter. T: {alterTempExtratoTemperatura}</td>
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
 