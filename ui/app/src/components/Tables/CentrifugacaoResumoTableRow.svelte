<script>
	import {CentrifugacaoResumoFetches} from "../../fetches/CentrifugacaoResumoFetches";
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	let data = registro["DATA"] ? Utils.dateFormatter((new Date(registro["DATA"])).toISOString().split('T')[0]) : "";
	let deTanque = registro["DE_TANQUE"] || "";
	let paraTanque = registro["PARA_TANQUE"];
	let volumeInicial = registro["VOLUME"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["VOLUME"]) + " L" : "";
	let horaInicio = registro["HORA_INICIO"] ? Utils.extrairHoraMinutos(registro["HORA_INICIO"]) : "";
	let horaFim = registro["HORA_FIM"] ? Utils.extrairHoraMinutos(registro["HORA_FIM"]) : "";
	let hlh = registro["HLH"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["HLH"]) : "";
	let ebc = registro["EBC"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["EBC"]) : "";
	let totalHl = registro["TOTAL"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["TOTAL"]) : "";
	let media = registro["MEDIA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["MEDIA"]) : "";
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await CentrifugacaoResumoFetches.deleteCentrifugacaoResumo(data);
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
    <th scope="row">{data}</th>
	<th scope="row">{deTanque}</th>
	<th scope="row">{paraTanque}</th>
	<th scope="row">{volumeInicial}</th>
	<th scope="row">{horaInicio}</th>
	<th scope="row">{horaFim}</th>
	<th scope="row">{ebc}</th>
	<th scope="row">{hlh}</th>
	<th scope="row">{totalHl}</th>
	<th scope="row">{media}</th>
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
