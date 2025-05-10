<script>
	import {EnvaseBarrilFetches} from "../../fetches/EnvaseBarrilFetches";
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	let data = registro["DATA"] ? Utils.dateFormatter((new Date(registro["DATA"])).toISOString().split('T')[0]) : "";
	let tanque = registro["TANQUE"] || "";
	let p01 = registro["P01"] || "0";
	let p02 = registro["P02"] || "0";
	let p20 = registro["P20"] || "0";
	let p30 = registro["P30"] || "0";
	let growler = registro["GROWLER"] ? registro["GROWLER"] + " L" : "0 L";
	let oak = registro["OAK"] ? registro["OAK"] + " L" : "0 L";
	let total = registro["TOTAL"] ? registro["TOTAL"] + " L" : "0 L";
	let observacoes = registro["OBSERVACOES"] || "";
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await EnvaseBarrilFetches.deleteEnvaseBarril(data);
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
	<th scope="row">{p01}</th>
	<th scope="row">{p02}</th>
	<th scope="row">{p20}</th>
	<th scope="row">{p30}</th>
	<th scope="row">{growler}</th>
	<th scope="row">{oak}</th>
	<th scope="row">{total}</th>
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
