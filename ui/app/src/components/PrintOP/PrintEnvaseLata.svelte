<script>
  import { Utils } from "../../utils/Utils";
  export let registroEnvaseLata

  let dataEnvaseLata = registroEnvaseLata["DATA"] ? Utils.dateFormatter((new Date(registroEnvaseLata["DATA"])).toISOString().split('T')[0]) : "";
	let carbonatacaoEnvaseLata = registroEnvaseLata["CARBONATACAO"] || "";
	let tanqueEnvaseLata = registroEnvaseLata["TANQUE"] || "";
	let tamanhoEnvaseLata = registroEnvaseLata["TAMANHO"] ? registroEnvaseLata["TAMANHO"] + " ml" : "";
	let horaInicioEnvaseLata = registroEnvaseLata["HORA_INICIO"] ? Utils.extrairHoraMinutos(registroEnvaseLata["HORA_INICIO"] ) : "";
	let horaFimEnvaseLata = registroEnvaseLata["HORA_FIM"] ? Utils.extrairHoraMinutos(registroEnvaseLata["HORA_FIM"]) : "";
	let quantidadeEnvaseLata = registroEnvaseLata["QUANTIDADE"] || "";
	let descarteEnvaseLata = registroEnvaseLata["DESCARTE"] || "";
	let descarteTampaEnvaseLata = registroEnvaseLata["DESCARTE_TAMPA"] || "";
	let amassadaMaquinaEnvaseLata = registroEnvaseLata["AMASSADA_MAQUINA"] || "";
	let amassadaCabineEnvaseLata = registroEnvaseLata["AMASSADA_CABINE"] || "";
	let labEnvaseLata = registroEnvaseLata["LAB"] || "";
	let litrosEnvaseLata = registroEnvaseLata["LITROS"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroEnvaseLata["LITROS"]) + "L" : "";
	let acidoAscorbicoEnvaseLata = registroEnvaseLata["ACIDO_ASCORBICO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroEnvaseLata["ACIDO_ASCORBICO"]) + " g" : "";
	let responsaveEnvaseLata = registroEnvaseLata["RESPONSAVEL"] || "";
</script>

<div class="table">
    <table >
        <tr>
          <td>Data: {dataEnvaseLata}</td>
          <td>Carbonatação: {carbonatacaoEnvaseLata}</td>
          <td>Tanque: {tanqueEnvaseLata}</td>
          <td>Tamanho (ml): {tamanhoEnvaseLata}</td>
          <td>Hora início: {horaInicioEnvaseLata}</td>
        </tr>
        <tr>
          <td>Hora fim: {horaFimEnvaseLata}</td>
          <td>Quantidade (Latas): {quantidadeEnvaseLata}</td>
          <td>Refugo (Latas): {descarteEnvaseLata}</td>
          <td>Descarte tampa: {descarteTampaEnvaseLata}</td>
          <td>Amassada máquina: {amassadaMaquinaEnvaseLata}</td>
          <td>Amassada cabine: {amassadaCabineEnvaseLata}</td>
        </tr>
        <tr>
          <td>Laboratório (Latas): {labEnvaseLata}</td>
          <td>Litros (L): {litrosEnvaseLata}</td>
          <td>Ácido ascórbico (g): {acidoAscorbicoEnvaseLata}</td>
          <td>Responsável: {responsaveEnvaseLata}</td>
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