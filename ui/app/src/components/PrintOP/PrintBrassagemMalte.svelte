<script>
    export let registrosMalte

    let separacaoMalte = registrosMalte["SEPARACAO"] || "";
	let conferencia1Malte = registrosMalte["CONFERENCIA_1"] || "";
	let conferencia2Malte = registrosMalte["CONFERENCIA_2"] || "";
	let moagemMalte = registrosMalte["MOAGEM"] || "";
</script>

<div class="table">
    <table>
      <tr>
        <td>Separação: {separacaoMalte}</td>
        <td>Conferência 1: {conferencia1Malte}</td>
        <td>Conferência 2: {conferencia2Malte}</td>
        <td>Moagem: {moagemMalte}</td>
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