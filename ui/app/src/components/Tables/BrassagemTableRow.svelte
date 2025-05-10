<script>
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	import {BrassagemFetches} from '../../fetches/BrassagemFetches';
	import { Utils } from "../../utils/Utils";

	const dispatch = createEventDispatcher();

	let dataEnvaseSaca = registro["DATA_ENVASE_SACA"] ? Utils.dateFormatter((new Date(registro["DATA_ENVASE_SACA"])).toISOString().split('T')[0]) : "";
	let turno = registro["TURNO"] || "";
	let lote = registro["LOTE"] || "";
	let validade = registro["VALIDADE"] ? Utils.dateFormatter((new Date(registro["VALIDADE"])).toISOString().split('T')[0]) : "";
	let posicaoSuperior =  registro["POSICAO_SUPERIOR"] || "";
	let posicaoInferior = registro["POSICAO_INFERIOR"] || "";
	let dia = registro["DIA"] ? Utils.dateFormatter((new Date(registro["DIA"])).toISOString().split('T')[0]) : ""|| "";
	let horaMashIn = registro["HORA_MASH_IN"] ? Utils.extrairHoraMinutos(registro["HORA_MASH_IN"]) : "";
	let densidadePrimario = registro["DENSIDADE_PRIMARIO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["DENSIDADE_PRIMARIO"]) : "";
	let phLab = registro["PH_LAB"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registro["PH_LAB"]) : "";
	let densidadeFinalSparge =  registro["DENSIDADE_FINAL_SPARGE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["DENSIDADE_FINAL_SPARGE"]) : "";
	let horaInicioMashOut = registro["HORA_INICIO_MASH_OUT"] ? Utils.extrairHoraMinutos(registro["HORA_INICIO_MASH_OUT"]) : "";
	let volume = registro["VOLUME"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["VOLUME"]) + " L" : "";
	let temperaturaMedicaoVolume = registro["TEMPERATURA_MEDICAO_VOLUME"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1,}).format(registro["TEMPERATURA_MEDICAO_VOLUME"]) + " °C" : "";
	let densidadeFabrica = registro["DENSIDADE_FABRICA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1,}).format(registro["DENSIDADE_FABRICA"]) : "";
	let pesoTina = registro["PESO_TINA_PCT"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registro["PESO_TINA_PCT"]) + " %" : "";
	let densidadeLab = registro["DENSIDADE_LAB"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["DENSIDADE_LAB"]) : "";
	let horaInicioFervura = registro["HORA_INICIO_FERVURA"] ? Utils.extrairHoraMinutos(registro["HORA_INICIO_FERVURA"]) : "";
	let medicaoCorrecaoPh = registro["MEDICAO_CORRECAO_PH"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registro["MEDICAO_CORRECAO_PH"]) : "";
	let volumeFinalFervura = registro["VOLUME_FINAL_FERVURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["VOLUME_FINAL_FERVURA"]) + " L" : "";
	let pesoFinalTina = registro["PESO_TINA_FINAL"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registro["PESO_TINA_FINAL"]) +  " %" : "";
	let trub = registro["TRUB"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["TRUB"]) + " L" : "";
	let densidadeFinalFab = registro["DENSIDADE_FINAL_FABRICA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["DENSIDADE_FINAL_FABRICA"]) : "";
	let densidadeFinalLab = registro["DENSIDADE_FINAL_LAB"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["DENSIDADE_FINAL_LAB"]) : "";
	let temperaturaTransf = registro["TEMPERATURA_TRANSFERENCIA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1,}).format(registro["TEMPERATURA_TRANSFERENCIA"]) + " °C" : "";
	let volumeTransf = registro["VOLUME_TRANSFERIDO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["VOLUME_TRANSFERIDO"]) + " L" : "";
	let horaFim = registro["HORA_FIM_TRANSFERENCIA"] ? Utils.extrairHoraMinutos(registro["HORA_FIM_TRANSFERENCIA"]) : "";
	let keg = registro["KEG"] || "";
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		
		let itemsData = await BrassagemFetches.deleteBrassagem(data);
		if(itemsData.success) {
			showPopUpConfirmacao = false;
			dispatch('message', {
				updtatedRow: true,
			});
		} else {
			showPopUpConfirmacao = false;
			dispatch('message', {
				updtatedRow: false,
			});
		}
	};

	let showPopUpConfirmacao = false;
	function handlePopUpConfirmacao(eventType) {
		showPopUpConfirmacao = eventType
	}	
</script>

<tr>
    <th scope="row">{dataEnvaseSaca}</th>
	<th scope="row">{turno}</th>
	<th scope="row">{lote}</th>
	<th scope="row">{validade}</th>
	<th scope="row">{posicaoSuperior}</th>
	<th scope="row">{posicaoInferior}</th>
	<th scope="row">{dia}</th>
	<th scope="row">{horaMashIn}</th>
	<th scope="row">{densidadePrimario}</th>
	<th scope="row">{phLab}</th>
	<th scope="row">{densidadeFinalSparge}</th>
	<th scope="row">{horaInicioMashOut}</th>
	<th scope="row">{volume}</th>
	<th scope="row">{temperaturaMedicaoVolume}</th>
	<th scope="row">{pesoTina}</th>
	<th scope="row">{densidadeFabrica}</th>
	<th scope="row">{densidadeLab}</th>
	<th scope="row">{horaInicioFervura}</th>
	<th scope="row">{medicaoCorrecaoPh}</th>
	<th scope="row">{volumeFinalFervura}</th>
	<th scope="row">{pesoFinalTina}</th>
	<th scope="row">{trub}</th>
	<th scope="row">{densidadeFinalFab}</th>
	<th scope="row">{densidadeFinalLab}</th>
	<th scope="row">{temperaturaTransf}</th>
	<th scope="row">{volumeTransf}</th>
	<th scope="row">{horaFim}</th>
	<th scope="row">{keg}</th>
	<th scope="row">{responsavel}</th>
	<th scope="row"><button type="button" class="btn btn-outline-danger" title="Remover registro" on:click={() => handlePopUpConfirmacao(true)}><i class="fas fa-trash-alt"></i></button></th>
</tr>



{#key showPopUpConfirmacao}
	{#if showPopUpConfirmacao}
		<PopUpConfirmacao on:close={() => handlePopUpConfirmacao(false)} on:confirmed={removeItem}/>
	{/if}
{/key}

<style>
    tr {
        text-align: center;
    }

    th {
        vertical-align: middle;
        align-items: center;
		font-weight: lighter;
    }
</style>
