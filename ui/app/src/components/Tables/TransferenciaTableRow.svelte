<script>
	import { TransferenciaFetches } from "../../fetches/TransferenciaFetches";
	import { Utils } from "../../utils/Utils";
	export let registro;
	import { createEventDispatcher } from 'svelte';
    import PopUpConfirmacao from '../Cards/PopUpConfirmacao.svelte';
	const dispatch = createEventDispatcher();

	const tiposTransferencia = ["", "Entre tanques", "Abastecimento", "Esvaziamento"]
	const tiposSetas = ["", "right", "up", "down"]

	let tipo = registro["TIPO_OPERACAO"] ? tiposTransferencia[Number(registro["TIPO_OPERACAO"])] : "";
	let seta = registro["TIPO_OPERACAO"] ? tiposSetas[Number(registro["TIPO_OPERACAO"])] : "";
	let data = registro["DATA"] ? Utils.dateFormatter((new Date(registro["DATA"])).toISOString().split('T')[0]) : "";
	let deTanque = registro["DE_TANQUE"] || "";
	let paraTanque = registro["PARA_TANQUE"] || "";
	let temperatura = registro["TEMPERATURA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["TEMPERATURA"]) + "°C" : "";
	let purga = registro["PURGA"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["PURGA"]) + "L" : "";
	let trasnfTotal = registro["TRANSF_TOTAL"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["TRANSF_TOTAL"]) + "L" : "";
	let descarte = registro["DESCARTE"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["DESCARTE"]) + "L" : "";
	let carb = registro["CARB"] ? Intl.NumberFormat("pt-BR", {style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3,}).format(registro["CARB"]) + "Kgf" : "";
	let observacoes = registro["OBSERVACOES"] || "";
	let responsavel = registro["RESPONSAVEL"] || "";

	async function removeItem() {
		const data = {
			numOperacao: registro["NUM_OPERACAO"],
			id: registro.id,
		}
		let itemsData = await TransferenciaFetches.deleteTransferencia(data);
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
    <th scope="row">{tipo}</th>
    <th scope="row">{data}</th>
	<th scope="row">{deTanque}</th>
	<th scope="row"><i class="fas fa-long-arrow-alt-{seta}"/></th>
	<th scope="row">{paraTanque}</th>
	<th scope="row">{temperatura}</th>
	<th scope="row">{purga}</th>
	<th scope="row">{trasnfTotal}</th>
	<th scope="row">{descarte}</th>
	<th scope="row">{carb}</th>
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
