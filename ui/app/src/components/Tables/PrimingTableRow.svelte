<script>
	import { PrimingFetches } from '../../fetches/PrimingFetches';
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	let data = registro["DATA"] ? Utils.dateFormatter((new Date(registro["DATA"])).toISOString().split('T')[0]) : "";
	let volumeCerveja = registro["VOLUME_CERVEJA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["VOLUME_CERVEJA"]) + " L" : "";
	let tanque = registro["TANQUE"] || "";
	let gLDextrose = registro["GL_DEXTROSE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["GL_DEXTROSE"]) + " g/L" : "";
	let quantidadeDextrose = registro["QUANTIDADE_DEXTROSE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["QUANTIDADE_DEXTROSE"]) + " g" : "";
	let agua =  registro["AGUA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["AGUA"]) + " L" : "";
	let nomeLevedura = registro["NOME_LEVEDURA"] || "";
	let loteLevedura = registro["LOTE_LEVEDURA"] || "";
	let validadeLevedura = registro["VALIDADE_LEVEDURA"] ? Utils.dateFormatter((new Date(registro["VALIDADE_LEVEDURA"])).toISOString().split('T')[0]) : "";
	let gLLevedura = registro["GL_LEVEDURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["GL_LEVEDURA"]) + " g/L" : "";
	let quantidadeLevedura =  registro["QUANTIDAE_PCT_LEVEDURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["QUANTIDAE_PCT_LEVEDURA"]) + " %" : "";
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await PrimingFetches.deletePriming(data);
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
	<th scope="row">{volumeCerveja}</th>
	<th scope="row">{tanque}</th>
	<th scope="row">{gLDextrose}</th>
	<th scope="row">{quantidadeDextrose}</th>
	<th scope="row">{agua}</th>
	<th scope="row">{nomeLevedura}</th>
	<th scope="row">{loteLevedura}</th>
	<th scope="row">{validadeLevedura}</th>
	<th scope="row">{gLLevedura}</th>
	<th scope="row">{quantidadeLevedura}</th>
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
