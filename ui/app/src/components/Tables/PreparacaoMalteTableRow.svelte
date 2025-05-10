<script>
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();
	import {PreparacaoMaltesFetches} from '../../fetches/PreparacaoMaltesFetches'

	let separacao = registro["SEPARACAO"] || "";
	let conferencia1 = registro["CONFERENCIA_1"] || "";
	let conferencia2 = registro["CONFERENCIA_2"] || "";
	let moagem = registro["MOAGEM"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}		
		let itemsData = await PreparacaoMaltesFetches.deletePreparacaoMaltes(data);
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
    <th scope="row">{separacao}</th>
	<th scope="row">{conferencia1}</th>
	<th scope="row">{conferencia2}</th>
	<th scope="row">{moagem}</th>
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
