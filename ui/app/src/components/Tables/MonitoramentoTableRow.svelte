<script>
	import {MonitoramentoFetches} from '../../fetches/MonitoramentoFetches';
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	let data = registro["DATA"] ? Utils.dateFormatter((new Date(registro["DATA"])).toISOString().split('T')[0]) : "";
	let hora = registro["HORA"] ? Utils.extrairHoraMinutos(registro["HORA"]) : "";
	let extrato = registro["EXTRATO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["EXTRATO"]) + " Sg" : "";
	let temperatura = registro["TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registro["TEMPERATURA"]) + " °C" : "";
	let alterTemp = registro["ALTERACAO_TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registro["ALTERACAO_TEMPERATURA"]) + " °C" : "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await MonitoramentoFetches.deleteMonitoramento(data);
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
	<th scope="row">{hora}</th>
	<th scope="row">{extrato}</th>
	<th scope="row">{temperatura}</th>
	<th scope="row">{alterTemp}</th>
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
