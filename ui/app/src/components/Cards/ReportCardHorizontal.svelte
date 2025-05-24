<script>
    import OdpStatusBadge from "../Badges/OdpStatusBadge.svelte";
    import PopUpAlteraNumOp from "./PopUpAlteraNumOp.svelte";
	import { Utils } from "../../utils/Utils";

	let popUpAlteraOp = false;
	function handlePopUpAlteraOp(eventType) {
		popUpAlteraOp = eventType
	}

	export let odp = {};
	let produto = odp["PRODUTO"] || "";
	let numOperacao = odp["NUM_OPERACAO"] || "";
	let lote = odp["LOTE"] || "";
	let dataEmissao = odp["DT_EMISSAO"] ? Utils.dateFormatter(odp["DT_EMISSAO"]) : "";
	let status = odp["STATUS"] ? Number(odp["STATUS"]) : 0;
</script>

<div class="card">
	<div class="areaInfos">
		<div class="infoCerveja">
			<div class="titulo">Cerveja</div>
			{produto}
		</div>
		<div class="infoCerveja">
			<div class="titulo">OP</div>
			{numOperacao}
		</div>
		<div class="infoCerveja">
			<div class="titulo">Lote</div>
			{lote}
		</div>
		<div class="infoCerveja">
			<div class="titulo">Data de fabricação</div>
			{dataEmissao}
		</div>
		<div class="infoCerveja">
			<div class="titulo">Status</div>
			<OdpStatusBadge status={status} op={numOperacao} lote={lote}/>
		</div>
	</div>
	<div class="actions">
		<button type="button" class="btn btn-outline-danger" on:click={() => {handlePopUpAlteraOp(true)}}><i class="fa-solid fa-gear"/></button>
		<a href="/#/production/odp/printdocsop?odp={numOperacao}&lote={lote}" title="Imprimir"><button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-print"/></button></a>
		<a href="/#/production/odp/menu?odp={numOperacao}&lote={lote}" title="Editar"><button type="button" class="btn btn-outline-primary"><i class="fa-solid fa-pen-to-square"/></button></a> 
	</div>
</div>

{#if popUpAlteraOp}
	<PopUpAlteraNumOp on:close={() => handlePopUpAlteraOp(false)} id={odp.id} odp={numOperacao} lote={lote}/>
{/if}

<style>
	.card {
		min-width: 100%;
		height: fit-content;
		background-color: var(--default-white);
		border-radius: 10px;
		margin: 10px 0px;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
		padding: 20px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.areaInfos {
		min-height: 100%;
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.infoCerveja {
		height: fit-content;
		width: 210px;
		max-width: 210px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 25px;
		overflow: visible;
		word-wrap: break-word;
		text-align: center;
		margin: 5px auto;
	}

	.infoCerveja .titulo {
		font-weight: lighter;
		font-size: 20px;
	}

	.actions {
		display: flex;
		flex-direction: row;
	}

	@media screen and (max-width: 820px) {
		.actions {
			display: flex;
			flex-direction: column;
		}
	}

	.actions button{
		margin: 5px;
		font-size: 20px;
	}
</style>