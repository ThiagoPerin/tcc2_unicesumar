<script>
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();
	import {DryHoppingFetches} from '../../fetches/DryHoppingFetches';

	let data = registro["DATA"] ? Utils.dateFormatter((new Date(registro["DATA"])).toISOString().split('T')[0]) : "";
	let tanque = registro["TANQUE"] || "";
	let temperatura = registro["TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["TEMPERATURA"]) + " °C" : "";
	let produto = registro["PRODUTO"] || "";
	let alfaAcido = registro["ALFA_ACIDO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["ALFA_ACIDO"]) + " %" : "";
	let qtd = registro["QUANTIDADE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["QUANTIDADE"]) : "";
	let unidade = registro["UNIDADE"] || "";
	let lote = registro["LOTE"] || "";
	let validade = registro["VALIDADE"] ? Utils.dateFormatter((new Date(registro["VALIDADE"])).toISOString().split('T')[0]) : "";;
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await DryHoppingFetches.deleteDryHopping(data);
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
	<th scope="row">{tanque}</th>
	<th scope="row">{temperatura}</th>
	<th scope="row">{produto}</th>
	<th scope="row">{alfaAcido}</th>
	<th scope="row">{`${qtd} ${unidade}`}</th>
	<th scope="row">{lote}</th>
	<th scope="row">{validade}</th>
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
