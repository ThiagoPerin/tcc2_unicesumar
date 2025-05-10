<script>
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
    import PopUpAtividadeCerveja from '../Cards/PopUpAtividadeCerveja.svelte';
	const dispatch = createEventDispatcher();
	import {CadastroCervejaFetches} from '../../fetches/CadastroCervejaFetches';

	let nome = registro["DESCRICAO"] || "";
	let codigo = registro["COD_CERVEJA"] || "";
	let grauAlcoolico = registro["GRAU_ALCOOLICO"] || "";
	let mapa = registro["REGISTRO_MAPA"] || "";
	let ingredientes = registro["INGREDIENTE"] || "";



	async function removeItem() {
		const data = {
			id: registro.id,
		}
		let itemsData = await CadastroCervejaFetches.deleteCadastroCerveja(data);
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

	let showPopUpAtividadesCerveja = false;
	function handlePopUpAtividadesCerveja(eventType) {
		showPopUpAtividadesCerveja = eventType
	}
</script>

<tr>
	<th scope="row" class="leftALign">{nome}</th>
	<th scope="row">{codigo}</th>
	<th scope="row">{grauAlcoolico}</th>
	<th scope="row">{mapa}</th>
	<th scope="row" class="leftALign">{ingredientes}</th>
	<th scope="row"><button type="button" class="btn btn-outline-primary" title="Visualizar atividades padrão" on:click={() => handlePopUpAtividadesCerveja(true)}><i class="fas fa-pencil-alt"/></button></th>
	<th scope="row"><button type="button" class="btn btn-outline-danger" title="Remover registro" on:click={() => handlePopUpConfirmacao(true)}><i class="fas fa-trash-alt"/></button></th>
</tr>



{#key showPopUpConfirmacao}
	{#if showPopUpConfirmacao}
		<PopUpConfirmacao on:close={() => handlePopUpConfirmacao(false)} on:confirmed={removeItem}/>
	{/if}
{/key}

{#key showPopUpAtividadesCerveja}
	{#if showPopUpAtividadesCerveja}
		<PopUpAtividadeCerveja cerveja={nome} codigoCerveja={codigo} on:close={() => handlePopUpAtividadesCerveja(false)} on:confirmed={removeItem}/>
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

	.leftALign {
		text-align: left;
	}
</style>
