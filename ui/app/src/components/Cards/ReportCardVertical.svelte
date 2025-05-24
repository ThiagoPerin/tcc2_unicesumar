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
	<div class="card-image">
		<i class="fas fa-smile"></i>
	</div>
	<div class="infoCervejaMain">
		<div class="titulo">Cerveja</div>
		{produto}
	</div>
	<div class="areaInfos">
		<div class="infoCerveja">
			<div class="titulo">OP</div>
			{numOperacao}
		</div>
		<div class="infoCerveja">
			<div class="titulo">Lote</div>
			{lote}
		</div>
		<div class="infoCerveja">
			<div class="titulo">Dt. de fabricação</div>
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
		width: 400px;
		max-width: 100%;
		min-height: 450px;
		height: fit-content;
		background-color: var(--default-white);
		border-radius: 15px;
		margin: 10px 10px auto;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
		padding: 10px 0px;
		padding-top: 0px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.card-image {
		width: 100%;
		height: 100px;
		border-radius: 15px 15px 0px 0px;
		border-bottom: 2px solid #b3b3b3a8;
		padding: 0px 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.areaInfos {
		height: 100%;
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		flex-wrap: wrap;
	}

	.infoCerveja, .infoCervejaMain  {
		height: fit-content;
		min-width: 150px;
		width: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 22px;
		overflow: visible;
		word-wrap: break-word;
		text-align: center;
		margin: 5px auto;
		vertical-align: baseline;
	}
	.infoCervejaMain {
		width: 100%;
		min-width: 100%;
	}

	.titulo {
		font-weight: lighter;
		font-size: 18px;
	}

	.actions {
		display: flex;
		flex-direction: row;
	}
	.actions button{
		margin: 5px;
		font-size: 20px;
	}
</style>