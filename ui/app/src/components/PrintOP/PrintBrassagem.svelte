<script>
    import { Utils } from "../../utils/Utils";

    export let registroBrassagem;

    let dataEnvaseSacaBrassagem = registroBrassagem["DATA_ENVASE_SACA"] ? Utils.dateFormatter((new Date(registroBrassagem["DATA_ENVASE_SACA"])).toISOString().split('T')[0]) : "";
	let turnoBrassagem = registroBrassagem["TURNO"] || "";
	let loteBrassagem = registroBrassagem["LOTE"] || "";
	let validadeBrassagem = registroBrassagem["VALIDADE"] ? Utils.dateFormatter((new Date(registroBrassagem["VALIDADE"])).toISOString().split('T')[0]) : "";
	let posicaoSuperiorBrassagem =  registroBrassagem["POSICAO_SUPERIOR"] || "";
	let posicaoInferiorBrassagem = registroBrassagem["POSICAO_INFERIOR"] || "";
	let diaBrassagem = registroBrassagem["DIA"] ? Utils.dateFormatter((new Date(registroBrassagem["DIA"])).toISOString().split('T')[0]) : ""|| "";
	let horaMashInBrassagem = registroBrassagem["HORA_MASH_IN"] ? Utils.extrairHoraMinutos(registroBrassagem["HORA_MASH_IN"] ) : "";
	let densidadePrimarioBrassagem = registroBrassagem["DENSIDADE_PRIMARIO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroBrassagem["DENSIDADE_PRIMARIO"]) : "";
	let phLabBrassagem = registroBrassagem["PH_LAB"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registroBrassagem["PH_LAB"]) : "";
	let densidadeFinalSpargeBrassagem =  registroBrassagem["DENSIDADE_FINAL_SPARGE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroBrassagem["DENSIDADE_FINAL_SPARGE"]) : "";
	let horaInicioMashOutBrassagem = registroBrassagem["HORA_INICIO_MASH_OUT"]  ? Utils.extrairHoraMinutos(registroBrassagem["HORA_INICIO_MASH_OUT"] ) : "";
	let volumeBrassagem = registroBrassagem["VOLUME"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroBrassagem["VOLUME"]) + " L" : "";
	let temperaturaMedicaoVolumeBrassagem = registroBrassagem["TEMPERATURA_MEDICAO_VOLUME"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1,}).format(registroBrassagem["TEMPERATURA_MEDICAO_VOLUME"]) + " °C" : "";
	let densidadeFabricaBrassagem = registroBrassagem["DENSIDADE_FABRICA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1,}).format(registroBrassagem["DENSIDADE_FABRICA"]) : "";
	let pesoTinaBrassagem = registroBrassagem["PESO_TINA_PCT"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registroBrassagem["PESO_TINA_PCT"]) + " %" : "";
	let densidadeLabBrassagem = registroBrassagem["DENSIDADE_LAB"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroBrassagem["DENSIDADE_LAB"]) : "";
	let horaInicioFervuraBrassagem = registroBrassagem["HORA_INICIO_FERVURA"]  ? Utils.extrairHoraMinutos(registroBrassagem["HORA_INICIO_FERVURA"] ) : "";
	let medicaoCorrecaoPhBrassagem = registroBrassagem["MEDICAO_CORRECAO_PH"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registroBrassagem["MEDICAO_CORRECAO_PH"]) : "";
	let volumeFinalFervuraBrassagem = registroBrassagem["VOLUME_FINAL_FERVURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroBrassagem["VOLUME_FINAL_FERVURA"]) + " L" : "";
	let pesoFinalTinaBrassagem = registroBrassagem["PESO_TINA_FINAL"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registroBrassagem["PESO_TINA_FINAL"]) +  " %" : "";
	let trubBrassagem = registroBrassagem["TRUB"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroBrassagem["TRUB"]) + " L" : "";
	let densidadeFinalFabBrassagem = registroBrassagem["DENSIDADE_FINAL_FABRICA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroBrassagem["DENSIDADE_FINAL_FABRICA"]) : "";
	let densidadeFinalLabBrassagem = registroBrassagem["DENSIDADE_FINAL_LAB"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroBrassagem["DENSIDADE_FINAL_LAB"]) : "";
	let temperaturaTransfBrassagem = registroBrassagem["TEMPERATURA_TRANSFERENCIA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1,}).format(registroBrassagem["TEMPERATURA_TRANSFERENCIA"]) + " °C" : "";
	let volumeTransfBrassagem = registroBrassagem["VOLUME_TRANSFERIDO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registroBrassagem["VOLUME_TRANSFERIDO"]) + " L" : "";
	let horaFimBrassagem = registroBrassagem["HORA_FIM_TRANSFERENCIA"]  ? Utils.extrairHoraMinutos(registroBrassagem["HORA_FIM_TRANSFERENCIA"] ) : "";
	let kegBrassagem = registroBrassagem["KEG"] || "";
	let responsavelBrassagem = registroBrassagem["RESPONSAVEL"] || "";
</script>

<div class="tableBrassagem">
    
    <table>
        <tr>
            <th>Dados Malte pilsen </th>
        </tr>
        <tr>
            <td>Data envase saca: {dataEnvaseSacaBrassagem} </td>
            <td>Turno: {turnoBrassagem}</td>
        </tr>
        <tr>
            <td>lote: {loteBrassagem}</td>
            <td>Validade: {validadeBrassagem}</td>
        </tr>
    </table>

    <table>
        <tr>
            <th>Ajuste Moagem</th>
        </tr>
        <tr>
            <td>Pos. Superior: {posicaoSuperiorBrassagem}</td>
            <td>Pos. Inferior: {posicaoInferiorBrassagem}</td>
        </tr>
    </table>
    <table>
        <tr>
            <th>Mash</th>
        </tr>
        <tr>
            <td>Dia: {diaBrassagem}</td>
            <td>Hora mash in: {horaMashInBrassagem}</td>
            <td>Densidade primário: {densidadePrimarioBrassagem}</td>
        </tr>
        <tr>
            <td>pH Lab: {phLabBrassagem}</td>
            <td>Dens. Fin. de Sparge: {densidadeFinalSpargeBrassagem}</td>
            <td>Hora início mash out: {horaInicioMashOutBrassagem}</td>
        </tr>
    </table>
    <table>
        <tr>
            <th>Pré-Boil</th>
        </tr>
        <tr>
            <td>Volume (L): {volumeBrassagem}</td>
            <td>Temp. Medição de Vol. (°C): {temperaturaMedicaoVolumeBrassagem}</td>
            <td>Peso da tina (%): { pesoTinaBrassagem }</td>
        </tr>
        <tr>
            <td>Densidade Fábrica: {densidadeFabricaBrassagem}</td>
            <td>Densidade laboratório: {densidadeLabBrassagem}</td>
        </tr>
    </table>
    <table>
        <tr>
            <th>Fervura</th>
        </tr>
        <tr>
            <td>Hora início: {horaInicioFervuraBrassagem}</td>
            <td>Medição/Correção pH: {medicaoCorrecaoPhBrassagem}</td>
            <td>Volume final (L): {volumeFinalFervuraBrassagem}</td>
            <td>Peso da tina final (L): {pesoFinalTinaBrassagem}</td>
        </tr>
        <tr>
            <td>Trub (L): {trubBrassagem}</td>
            <td>Densidade final Fáb.:{densidadeFinalFabBrassagem}</td>
            <td>Densidade final Lab.:{densidadeFinalLabBrassagem}</td>
        </tr>
    </table>
    <table>
        <tr>
            <th>Transferência</th>
        </tr>
        <tr>
            <td>Temperatura (°C): {temperaturaTransfBrassagem}</td>
            <td>Volume trasnferido (L): {volumeTransfBrassagem}</td>
            <td>Hora fim: {horaFimBrassagem}</td>
        </tr>
    </table>

    <table>
        <tr>
            <td>KEG's p/ Transf. Levedura: {kegBrassagem}</td>
            <td>Responsável: {responsavelBrassagem}</td>
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

    .tableBrassagem {
        border: 2px solid black;
        border-radius: 10px;
        padding: 15px;
        margin: 5px;
        width: 100%;
    }
</style>
