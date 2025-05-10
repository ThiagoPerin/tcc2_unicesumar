<script>
	import {EnvaseLatasFetches} from "../../fetches/EnvaseLatasFetches";
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	let data = registro["DATA"] ? Utils.dateFormatter((new Date(registro["DATA"])).toISOString().split('T')[0]) : "";
	let carbonatacao = registro["CARBONATACAO"];
	let tanque = registro["TANQUE"] || "";
	let tamanho = registro["TAMANHO"] ? registro["TAMANHO"] + " ml" : "";
	let horaInicio = registro["HORA_INICIO"] ? Utils.extrairHoraMinutos(registro["HORA_INICIO"]) : "";
	let horaFim = registro["HORA_FIM"] ? Utils.extrairHoraMinutos(registro["HORA_FIM"]) : "";
	let quantidade = registro["QUANTIDADE"] || "";
	let descarte = registro["DESCARTE"] || "";
	let descarteTampa = registro["DESCARTE_TAMPA"] || "";
	let amassadaMaquina = registro["AMASSADA_MAQUINA"] || "";
	let amassadaCabine = registro["AMASSADA_CABINE"] || "";
	let lab = registro["LAB"] || "";
	let litros = registro["LITROS"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["LITROS"]) + "L" : "";
	let acidoAscorbico = registro["ACIDO_ASCORBICO"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["ACIDO_ASCORBICO"]) + " g" : "";
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await EnvaseLatasFetches.deleteEnvaseLatas(data);
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
	<th scope="row">{carbonatacao}</th>
	<th scope="row">{tanque}</th>
	<th scope="row">{tamanho}</th>
	<th scope="row">{horaInicio}</th>
	<th scope="row">{horaFim}</th>
	<th scope="row">{quantidade}</th>
	<th scope="row">{descarte}</th>
	<th scope="row">{descarteTampa}</th>
	<th scope="row">{amassadaMaquina}</th>
	<th scope="row">{amassadaCabine}</th>
	<th scope="row">{lab}</th>
	<th scope="row">{litros}</th>
	<th scope="row">{acidoAscorbico}</th>
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
