<script>
    import { Utils } from "../../utils/Utils";
    export let fermentacaoforçada;

    let dataFermentacaoForcada = fermentacaoforçada["DT_FERM"]? Utils.dateFormatter(new Date(fermentacaoforçada["DT_FERM"]).toISOString().split("T")[0]) : "";
    let extratoInicialFermentacaoForcada =fermentacaoforçada["EXTRATO_INICIAL_FERM"] || "";
    let extratoFinalFermentacaoForcada = fermentacaoforçada["DIAS_TESTE_FERM"] || "";
    let diasTesteFermentacaoForcada = fermentacaoforçada["HORAS_AGIT_FERM"] || "";
    let horasAgitFermentacaoForcada = fermentacaoforçada["EXTRATO_FINAL_FERM"] ? fermentacaoforçada["EXTRATO_FINAL_FERM"] : "";
    let observacoesFermentacaoForcada = fermentacaoforçada["OBSERVACOES_FERM"] || "";
    let responsavelFermentacaoForcada = fermentacaoforçada["RESPONSAVEL_FERM"] || "";
</script>

<div class="table">
    <table>
        <tr>
            <td>Data: {dataFermentacaoForcada}</td>
            <td>Extrato inicial: {extratoInicialFermentacaoForcada}</td>
            <td>Extrato final: {extratoFinalFermentacaoForcada}</td>
        </tr>
        <tr>
            <td>Dias teste: {diasTesteFermentacaoForcada}</td>
            <td>Horas agit. (h): {horasAgitFermentacaoForcada}</td>
        </tr>
        <tr>
            <td>Observações: {observacoesFermentacaoForcada}</td>
        </tr>
        <tr>
            <td>Responsável: {responsavelFermentacaoForcada}</td>
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
