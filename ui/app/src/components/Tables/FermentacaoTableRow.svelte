<script>
	import {FermentacaoForcadaFetches} from "../../fetches/FermentacaoForcadaFetches";
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	let data = registro["DT_FERM"] ? Utils.dateFormatter((new Date(registro["DT_FERM"])).toISOString().split('T')[0]) : "";
	let hora = registro["HORA"] ? Utils.extrairHoraMinutos(registro["HORA"]) : "";
	let extratoInicial = registro["EXTRATO_INICIAL_FERM"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["EXTRATO_INICIAL_FERM"]) : "";
	let extratoFinal = registro["EXTRATO_FINAL_FERM"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["EXTRATO_FINAL_FERM"]) : "";
	let diasTeste = registro["DIAS_TESTE_FERM"] || "";
	let horasAgit = registro["HORAS_AGIT_FERM"] || "";
	let observacoes = registro["OBSERVACOES_FERM"] || "";
	let responasavel = registro["RESPONSAVEL_FERM"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await FermentacaoForcadaFetches.deleteFermentacaoForcada(data);
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
	<th scope="row">{extratoInicial}</th>
	<th scope="row">{extratoFinal}</th>
	<th scope="row">{diasTeste}</th>
	<th scope="row">{horasAgit}</th>
	<th scope="row">{observacoes}</th>
	<th scope="row">{responasavel}</th>
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
