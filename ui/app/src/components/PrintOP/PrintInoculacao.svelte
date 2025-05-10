<script>
  import { Utils } from "../../utils/Utils";
  export let registroInoculação
    
  let dataInoculacao = registroInoculação["DATA"] ? Utils.dateFormatter((new Date(registroInoculação["DATA"])).toISOString().split('T')[0]) : "";
	let leveduraInoculacao = registroInoculação["LEVEDURA"] || "";
	let origemLoteInoculacao = registroInoculação["ORIGEM_LOTE"] || "";
	let contagemInoculacao = registroInoculação["CONTAGEM"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroInoculação["CONTAGEM"]) + " x10¹²" : "";
	let validadeInoculacao = registroInoculação["VALIDADE"] || "";
	let qtdInoculacao = registroInoculação["QUANTIDADE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroInoculação["QUANTIDADE"]) + " L" : "";
	let responsavelInoculacao = registroInoculação["RESPONSAVEL"] || "";
</script>

<div class="table">
    <table >
        <tr>
          <td>Data: {dataInoculacao}</td>
          <td>Levedura: {leveduraInoculacao}</td>
          <td>Origem/Lote: {origemLoteInoculacao}</td>
        </tr>
        <tr>
          <td>Contagem (x10¹²): {contagemInoculacao}</td>
          <td>Validade: {validadeInoculacao}</td>
          <td>Quantidade: {qtdInoculacao}</td>
        </tr>
        <tr>
          <td>Responsável: {responsavelInoculacao}</td>
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
 