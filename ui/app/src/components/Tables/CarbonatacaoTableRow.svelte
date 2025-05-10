<script>
	import {CarbonatacaoFetches} from '../../fetches/CarbonatacaoFetches';
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	let data = registro["DATA"] ? Utils.dateFormatter((new Date(registro["DATA"])).toISOString().split('T')[0]) : "";
	let tanque = registro["TANQUE"] || "";
	let temperaturaInicio = registro["TEMPERATURA_INICIO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["TEMPERATURA_INICIO"]) : "";
	let temperaturaFim = registro["TEMPERATURA_FIM"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["TEMPERATURA_FIM"]) + " °C" : "";
	let horaInicio = registro["HORA_INICIO"] ? Utils.extrairHoraMinutos(registro["HORA_INICIO"]) : "";
	let horaFim = registro["HORA_FIM"] ? Utils.extrairHoraMinutos(registro["HORA_FIM"]) : "";
	let pressao = registro["PRESSAO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["PRESSAO"]) : "";
	let observacoes = registro["OBSERVACOES"] || "";
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await CarbonatacaoFetches.deleteCarbonatacao(data);
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
	<th scope="row">{temperaturaInicio}</th>
	<th scope="row">{temperaturaFim}</th>
	<th scope="row">{horaInicio}</th>
	<th scope="row">{horaFim}</th>
	<th scope="row">{pressao}</th>
	<th scope="row">{observacoes}</th>
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
