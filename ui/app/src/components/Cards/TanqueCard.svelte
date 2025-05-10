<script>
	import TanqueBadge from "../Badges/TanqueBadge.svelte";
    import PopUpTanqueDetalhado from "./PopUpTanqueDetalhado.svelte";
	export let tanqueInfo;
	const op = tanqueInfo["OP_ATUAL"] || "S/I";
	const lote = tanqueInfo["LOTE"]  || "S/I";
	const produto = tanqueInfo["PRODUTO"]  || "S/I";
	const tanqueId = tanqueInfo["NUM_TANQUE"]  || "";
	const volume = Number(tanqueInfo["VOLUME"])  || 0;
	const capacidade = Number(tanqueInfo["CAPACIDADE"])  || 0;
	const temperatura = Number(tanqueInfo["TEMPERATURA"])  || 0;
	const carb = Number(tanqueInfo["CARB"])  || 0;
	let volumePct =  volume > capacidade ? 100 : 100 * volume / capacidade;
	function temVolume(text, feminino) { 
		if(volume > 0) {
			return text;
		} else {
			return feminino ? `ÚLTIMA ${text}` : `ÚLTIMO ${text}`;
		}
	}

	let popUpTanqueDetalhado = false;
	function hanldePopUpTanques(eventType) {
		popUpTanqueDetalhado = eventType
	}
</script>

<div class="card">
	<div class="titulo">
		{#if volume > 0}
			<span class="badge bg-success">{produto}</span>
		{:else}
			<span class="badge bg-danger">Tanque vazio</span>
		{/if}
		<div class="info" on:click={() => hanldePopUpTanques(true)}>
			<i class="fas fa-info-circle"/>
		</div>
	</div>
	<div class="tanque">
		<div class="chapeu"/>
		<div class="retangulo">
			<div class="liquido" style="height: calc({volumePct}% - 20px); {volumePct >= 96 ? 'border-radius: 16px;' : ''}"/>
		<div class="contentCard">
			<TanqueBadge titulo={temVolume("OP", true)} value={op} />
			<TanqueBadge titulo={temVolume("LOTE", false)} value={lote} />
			<TanqueBadge titulo={"TEMPERATURA"} value={`${temperatura}°C`} />
			<TanqueBadge titulo={"PRESSÃO"} value={`${carb.toFixed(2)} Kgf`} />
			<TanqueBadge titulo={"VOLUME"} value={`${volume}L`} />
			<TanqueBadge titulo={"CAPACIDADE"} value={`${capacidade}L`} />
		</div>
	</div>
	<div class="baixo">
		<div class="tanqueId" style="color: {volume > 0 ? "#ffce47" : "var(--default-white)"};">{tanqueId}</div>
		<div class="trapezio"/>
		<div class="coluna1"/>
		<div class="coluna2"/>
	</div>
</div>
</div>

{#key popUpTanqueDetalhado}
	{#if popUpTanqueDetalhado}
		<PopUpTanqueDetalhado tanque={tanqueId} on:close={() => hanldePopUpTanques(false)}/>
	{/if}
{/key}

<style>
	.card {
		position: relative;
		height: fit-content;
		width: fit-content;
		padding: 5px 10px;
		background-color: var(--default-white);
		border-radius: 15px;
		margin: 10px;
		border: none;
		background: var(--main-bg);
		box-shadow:  5px 5px 10px #999999,
					-5px -5px 10px #dbdbdb;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.titulo {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.info {
		font-size: 20px;
		color: var(--ligther-black);
		cursor: pointer;
	}

	.tanque {
		height: 500px;
		width: 220px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.chapeu {
		height: 20px;
		width: 45%;
		background-color: var(--tank-gray);
		border-radius: 5px 5px 0px 0px;
		border: 2px solid var(--ligther-black);
		border-bottom: none;
	}

	.retangulo {
		height: calc(100% - 140px);
		width: 100%;
		background-color: var(--tank-gray);
		border-radius: 15px 15px 0px 0px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px;
		border: 2px solid var(--ligther-black);
		border-bottom: none;
		position: relative;
	}
	.liquido {
		height: calc(60% - 20px);
		width: calc(100% - 20px);
		background-image: linear-gradient(
			0deg,
			#e0a500 20%,
			#ffce47 55%,
			#ffec42 100%
		);
		position: absolute;
		bottom: 10px;
		left: 10px;
		border-radius: 0px 0px 16px 16px;
	}

	.contentCard {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 16px;
		backdrop-filter: blur(1.1px);
		-webkit-backdrop-filter: blur(1.1px);
		border: 2px solid var(--ligther-black);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.baixo {
		position: relative;
		height: 120px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
	.trapezio {
		width: 100%;
		height: 0;
		border-left: 90px solid transparent;
		border-right: 90px solid transparent;
		border-top: 80px solid var(--tank-gray);
	}

	.coluna1 {
		height: 100%;
		width: 15px;
		position: absolute;
		top: 0;
		left: 0;
		background-color: var(--tank-gray);
		border: 2px solid var(--ligther-black);
		border-top: none;
	}
	.coluna2 {
		height: 100%;
		width: 15px;
		position: absolute;
		top: 0;
		right: 0;
		background-color: var(--tank-gray);
		border: 2px solid var(--ligther-black);
		border-top: none;
	}

	.tanqueId {
		position: absolute;
		top: 25%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0.8;
		font-size: 45px;
		font-weight: bold;
	}
</style>
