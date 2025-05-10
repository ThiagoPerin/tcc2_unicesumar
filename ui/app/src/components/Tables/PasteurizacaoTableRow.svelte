<script>
	import { PasteurizacaoFetches } from '../../fetches/PasteurizacaoFetches';
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	let dataInicio = registro["DATA_INICIO"] ? Utils.dateFormatter((new Date(registro["DATA_INICIO"])).toISOString().split('T')[0]) : "";
	let horaInicio = registro["HORA_INICIO"] ? Utils.extrairHoraMinutos(registro["HORA_INICIO"]) : "";
	let dataFim = registro["DATA_FIM"] ? Utils.dateFormatter((new Date(registro["DATA_FIM"])).toISOString().split('T')[0]) : "";
	let horaFim = registro["HORA_FIM"] ? Utils.extrairHoraMinutos(registro["HORA_FIM"]) : "";
	let tanqueEntrada = registro["TANQUE_ENTRADA"] || "";
	let temperaturaEntrada = registro["TEMPERATURA_ENTRADA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registro["TEMPERATURA_ENTRADA"]) + " °C" : "";
	let pressaoEntrada =  registro["PRESSAO_ENTRADA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["PRESSAO_ENTRADA"]) + " Kgf" : "";
	let tanqueSaida = registro["TANQUE_SAIDA"] || "";
	let temperaturaSaida = registro["TEMPERATURA_SAIDA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2,}).format(registro["TEMPERATURA_SAIDA"]) + " °C" : "";
	let pressaoSaida =  registro["PRESSAO_SAIDA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["PRESSAO_SAIDA"]) + " Kgf" : "";
	let pressaoCuba =  registro["PRESSAO_CUBA_SETPOINT"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["PRESSAO_CUBA_SETPOINT"]) + " Kgf" : "";
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await PasteurizacaoFetches.deletePasteurizacao(data);
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
    <th scope="row">{dataInicio}</th>
	<th scope="row">{horaInicio}</th>
    <th scope="row">{dataFim}</th>
	<th scope="row">{horaFim}</th>
	<th scope="row">{tanqueEntrada}</th>
	<th scope="row">{temperaturaEntrada}</th>
	<th scope="row">{pressaoEntrada}</th>
	<th scope="row">{tanqueSaida}</th>
	<th scope="row">{temperaturaSaida}</th>
	<th scope="row">{pressaoSaida}</th>
	<th scope="row">{pressaoCuba}</th>
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
