<script>
    export let registroCerveja

    let cervejeiro1 = registroCerveja["CERVEJEIRO_RESPONSAVEL_1"] || "";
	let cervejeiro2 = registroCerveja["CERVEJEIRO_RESPONSAVEL_2"] || "";
	let tanqueFerm = registroCerveja["TANQUE_FERMENTACAO"] || "";
	let volumeFerm = registroCerveja["VOLUME_FERMENTACAO"] || "";
	let tempInicioFerm = registroCerveja["TEMP_INICIO_FERMENTACAO"] || "";
	let extratoInicial = registroCerveja["EXTRATO_INICIAL"] || "";
	let extratoFinal = registroCerveja["EXTRATO_FINAL"] || "";
	let AbvCalc = registroCerveja["ABV_CALCULADO"] || "";
	let volumeUtilFinal = registroCerveja["VOLUME_UTIL_FINAL"] || "";
	let atenApar = registroCerveja["ATEN_APAR"] || "";
	let dtInicio = registroCerveja["DT_INICIO_FABRICACAO"] ? (new Date(registroCerveja["DT_ENCERRAMENTO"])).toISOString().split('T')[0] : "";
	let dtEncerramento = registroCerveja["DT_ENCERRAMENTO"] ? (new Date(registroCerveja["DT_ENCERRAMENTO"])).toISOString().split('T')[0] : "";
</script>
<div class="table">
    <table >
        <tr>
            <td>Cervejeiro responsável 1: {cervejeiro1}</td>
            <td>Cervejeiro responsável 2: {cervejeiro2}</td>
        </tr>
        <tr>
            <td>Tanque ferm.: {tanqueFerm}</td>
            <td>Volume ferm. (L): {volumeFerm}</td>
            <td>T. início de ferm. (°C): {tempInicioFerm}</td>
        </tr>
        <tr>
            <td>Extrato inicial (Sg): {extratoInicial}</td>
            <td>Extrato final (Sg): {extratoFinal}</td>
        </tr>
        <tr>
            <td>ABV calculado (%): {AbvCalc}</td>
            <td>Volume útil final (L): {volumeUtilFinal}</td>
            <td>Aten. Apar. (%): {atenApar}</td>
        </tr>
        <tr>
            <td>Dt. início de fabricação: {dtInicio}</td>
            <td>Dt. encerramento: {dtEncerramento}</td>
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