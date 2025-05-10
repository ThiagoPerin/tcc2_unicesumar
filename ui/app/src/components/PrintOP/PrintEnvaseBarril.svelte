<script>
  import { Utils } from "../../utils/Utils";
  export let registroEnvaseBarril;

  let dataEnvaseBarril = registroEnvaseBarril["DATA"] ? Utils.dateFormatter((new Date(registroEnvaseBarril["DATA"])).toISOString().split('T')[0]) : "";
	let tanqueEnvaseBarril = registroEnvaseBarril["TANQUE"] || "";
	let p01EnvaseBarril = registroEnvaseBarril["P01"] || "";
	let p02EnvaseBarril = registroEnvaseBarril["P02"] || "";
	let p20EnvaseBarril = registroEnvaseBarril["P20"] || "";
	let p30EnvaseBarril = registroEnvaseBarril["P30"] || "";
	let growlerEnvaseBarril = registroEnvaseBarril["GROWLER"] ? registroEnvaseBarril["GROWLER"] + " L" : "";
	let oakEnvaseBarril = registroEnvaseBarril["OAK"] ? registroEnvaseBarril["OAK"] + " L" : "";
	let totalEnvaseBarril = registroEnvaseBarril["TOTAL"] ? registroEnvaseBarril["TOTAL"] + " L" : "";
	let observacoesEnvaseBarril = registroEnvaseBarril["OBSERVACOES"] || "";
	let responsavelEnvaseBarril = registroEnvaseBarril["RESPONSAVEL"] || "";
</script>

<div class="table">
    <table >
        <tr>
          <td>Data: {dataEnvaseBarril}</td>
          <td>Tanque: {tanqueEnvaseBarril}</td>
        </tr>
        <tr>
          <td>P01: {p01EnvaseBarril}</td>
          <td>P02: {p02EnvaseBarril}</td>
          <td>P20: {p20EnvaseBarril}</td>
          <td>P30: {p30EnvaseBarril}</td>
        </tr>
        <tr>
          <td>Growler (L): {growlerEnvaseBarril}</td>
          <td>Oak (L): {oakEnvaseBarril}</td>
          <td>Total (L): {totalEnvaseBarril}</td>
          <td>Responsável: {responsavelEnvaseBarril}</td>
        </tr>
        <tr>
          <td>Observações: {observacoesEnvaseBarril}</td>
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