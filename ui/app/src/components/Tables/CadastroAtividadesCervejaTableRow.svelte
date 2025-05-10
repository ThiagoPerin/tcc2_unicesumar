<script>
	import { CadastroAtividadesCervejaFetches } from '../../fetches/CadastroAtividadesCervejaFetches';
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	let nomeAtividade = registro["ATIVIDADE"] || "";
	let codigoAtividade = registro["COD_ATIVIDADE"] || "";

	async function removeItem() {
		const data = {
			id: registro.id,
		}
		let itemsData = await CadastroAtividadesCervejaFetches.deleteCadastroAtividadesCerveja(data);
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
	<th scope="row">{codigoAtividade}</th>
	<th scope="row">{nomeAtividade}</th>
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
