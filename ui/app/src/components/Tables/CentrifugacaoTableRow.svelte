<script>
	import {CentrifugacaoFetches} from '../../fetches/CentrifugacaoFetches';
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	let data = registro["DATA"] ? Utils.dateFormatter((new Date(registro["DATA"])).toISOString().split('T')[0]) : "";
	let deTanque = registro["DE_TANQUE"];
	let paraTanque = registro["PARA_TANQUE"] || "";
	let temperatura = registro["TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1,}).format(registro["TEMPERATURA"]) + " °C" : "";
	let hora = registro["HORA"] ? Utils.extrairHoraMinutos(registro["HORA"]) : "";
	let ebc = registro["EBC"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["EBC"]) : "";
	let hlh = registro["HLH"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["HLH"]) : "";
	let acumulado = registro["ACUMULADO_HL"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["ACUMULADO_HL"]) : "";
	let observacoes = registro["OBSERVACOES"] || "";
	let fim = registro["FIM"] ? Boolean(Number(registro["FIM"])) : "";
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await CentrifugacaoFetches.deleteCentrifugacao(data);
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
	<th scope="row">{temperatura}</th>
	<th scope="row">{hora}</th>
	<th scope="row">{ebc}</th>
	<th scope="row">{hlh}</th>
	<th scope="row">{acumulado}</th>
	<th scope="row">{observacoes}</th>
	{#if fim === true}
		<th scope="row"><i class="fa-solid fa-check"/></th>
	{:else}
		<th scope="row">{fim}</th>
	{/if}
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
