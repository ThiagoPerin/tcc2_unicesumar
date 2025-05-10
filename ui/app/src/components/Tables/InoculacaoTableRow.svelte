<script>
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();
	import {InoculacaoFetches} from '../../fetches/InoculacaoFetches';

	let data = registro["DATA"] ? Utils.dateFormatter((new Date(registro["DATA"])).toISOString().split('T')[0]) : "";
	let levedura = registro["LEVEDURA"] || "";
	let origemLote = registro["ORIGEM_LOTE"] || "";
	let contagem = registro["CONTAGEM"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["CONTAGEM"]) + " x10¹²" : "";
	let validade = registro["VALIDADE"] || "";
	let qtd = registro["QUANTIDADE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["QUANTIDADE"]) + " L" : "";
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		
		let itemsData = await InoculacaoFetches.deleteInoculacao(data);
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
	<th scope="row">{levedura}</th>
	<th scope="row">{origemLote}</th>
	<th scope="row">{contagem}</th>
	<th scope="row">{validade}</th>
	<th scope="row">{qtd}</th>
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
