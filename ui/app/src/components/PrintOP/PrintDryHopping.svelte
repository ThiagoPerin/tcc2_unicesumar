<script>
  import { Utils } from "../../utils/Utils";
  export let registroDryHopping;
  
  let dataDryHopping = registroDryHopping["DATA"] ? Utils.dateFormatter((new Date(registroDryHopping["DATA"])).toISOString().split('T')[0]) : "";
	let tanqueDryHopping = registroDryHopping["TANQUE"] || "";
	let temperaturaDryHopping = registroDryHopping["TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroDryHopping["TEMPERATURA"]) + " °C" : "";
	let produtoDryHopping = registroDryHopping["PRODUTO"] || "";
	let alfaAcidoDryHopping = registroDryHopping["ALFA_ACIDO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroDryHopping["ALFA_ACIDO"]) + " %" : "";
	let qtdDryHopping = registroDryHopping["QUANTIDADE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroDryHopping["QUANTIDADE"]) : "";
	let unidadeDryHopping = registroDryHopping["UNIDADE"] || "";
	let loteDryHopping = registroDryHopping["LOTE"] || "";
	let validadeDryHopping = registroDryHopping["VALIDADE"] ? Utils.dateFormatter((new Date(registroDryHopping["VALIDADE"])).toISOString().split('T')[0]) : "";;
	let responsavelDryHopping = registroDryHopping["RESPONSAVEL"] || "";
</script>

<div class="table">
    <table >
        <tr>
          <td>Data: {dataDryHopping}</td>
          <td>Tanque: {tanqueDryHopping}</td>
          <td>Temperatura (°C): {temperaturaDryHopping}</td>
        </tr>
        <tr>
          <td>Produto:{produtoDryHopping}</td>
          <td>Alfa ácido (%):{alfaAcidoDryHopping}</td>
          <td>Quantidade: {qtdDryHopping}</td>
          <td>Unidade: {unidadeDryHopping}</td>
          <td>Lote:{loteDryHopping}</td>
        </tr>
        <tr>
          <td>Validade: {validadeDryHopping}</td>
          <td>Responsável: {responsavelDryHopping}</td>
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