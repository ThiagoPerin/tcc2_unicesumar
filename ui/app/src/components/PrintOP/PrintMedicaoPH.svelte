<script>
  import { Utils } from "../../utils/Utils";
  export let registroMedicaoPh;

  let dataMedicaoPh = registroMedicaoPh["DATA"] ? Utils.dateFormatter((new Date(registroMedicaoPh["DATA"])).toISOString().split('T')[0]) : "";
	let amostraMedicaoPh = registroMedicaoPh["AMOSTRA"] || "";
	let phMedicaoPh = registroMedicaoPh["PH"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registroMedicaoPh["PH"]) : "";
	let responasavelMedicaoPh = registroMedicaoPh["RESPONSAVEL"] || "";
</script>

<div class="table">
    <table>
      <tr>
        <td>Amostra: {dataMedicaoPh}</td>
        <td>Data: {amostraMedicaoPh}</td>
        <td>pH: {phMedicaoPh}</td>
        <td>Responsável: {responasavelMedicaoPh}</td>
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

