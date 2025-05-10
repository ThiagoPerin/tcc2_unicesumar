<script>
	import { CadastroAtividadesCustomFetches } from "../../fetches/CadastroAtividadesCustomFetches";
	export let registro;
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { Utils } from "../../utils/Utils";

	let numOperacao = registro["NUM_OPERACAO"] || "";
	let nomeAtividade = registro["ATIVIDADE"] || "";
	let inicio = registro["DATA_INICIO"] ? Utils.dateFormatter((new Date(registro["DATA_INICIO"])).toISOString().split('T')[0]) : "";
	let fim = registro["DATA_FINAL"] ? Utils.dateFormatter((new Date(registro["DATA_FINAL"])).toISOString().split('T')[0]) : "";
	let horarioExecucao = registro["HORARIO_EXECUCAO"] ? Utils.extrairHoraMinutos(registro["HORARIO_EXECUCAO"]) : "";
	let descricao = registro["DESCRICAO"] || "";

	async function removeItem() {
		const data = {
			id: registro.id,
		}
		let itemsData = await CadastroAtividadesCustomFetches.deleteCadastroAtividadesCustom(data);
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
	<th scope="row">{numOperacao}</th>
	<th scope="row">{nomeAtividade}</th>
	<th scope="row">{inicio}</th>
	<th scope="row">{fim}</th>
	<th scope="row">{horarioExecucao}</th>
	<th scope="row">{descricao}</th>
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
