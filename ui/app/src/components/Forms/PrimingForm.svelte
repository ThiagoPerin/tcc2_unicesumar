<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import { PrimingFetches } from '../../fetches/PrimingFetches';
	import { TanqueFetches } from '../../fetches/TanqueFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataPriming = (new Date()).toISOString().split('T')[0];
	let tanque, volumeCerveja, responsavel, gLDextrose, quantidade, agua, nome, lote, validade, gLLevedura, quantidadePct;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addRegister(e) {
		const data = {
			numOperacao: odp,
			dataPriming: dataPriming,
			volumeCerveja: volumeCerveja,
			tanque: tanque,
			responsavel: responsavel,
			gLDextrose: gLDextrose,
			quantidade: quantidade,
			agua: agua,
			nome: nome,
			lote: lote,
			validade: validade,
			gLLevedura: gLLevedura,
			quantidadePct: quantidadePct,
		}
		e.preventDefault();
		insertResult = await PrimingFetches.addPriming(data);
		if(insertResult.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};

	let tanqueSelect = []
	onMount(async () => {
		tanqueSelect = await TanqueFetches.fetchTanqueData();
	});
</script>
<form on:submit={(e) => addRegister(e)}>
	<DefaultTitle titulo={`Priming`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataPriming" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="dataPriming" bind:value={dataPriming} required/>
		</div>
		<div class="inputDiv">
			<label for="volumeCerveja" class="form-label">Volume cerveja (L)</label>
			<input type="number" class="form-control inputTag" id="volumeCerveja" step=".001" bind:value={volumeCerveja} required/>
		</div>
		<div class="inputDiv">
			<label for="tanque" class="form-label">Tanque</label>
			<select class="form-select inputTag" placeholder="Selecionar tanque" id="tanque" bind:value={tanque} required>
				{#each tanqueSelect as el (tanqueSelect)}
					<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
				{/each}
			</select>
		</div>
		<div class="inputDiv">
			<label for="responsavel" class="form-label">Responsável</label>
			<input type="text" class="form-control inputTag" id="responsavel" bind:value={responsavel} required/>
		</div>
	</div>
	<div class="isolatedAreaTitle">Dextrose</div>
	<div class="inputsAreaIsolated">
		<div class="inputDiv">
			<label for="gLDextrose" class="form-label">g/L</label>
			<input type="number" class="form-control inputTag" id="horaIgLDextrosenicio" step=".001" bind:value={gLDextrose} required/>
		</div>
		<div class="inputDiv">
			<label for="quantidade" class="form-label">Quantidade (g)</label>
			<input type="number" class="form-control inputTag" id="quantidade" step=".001" bind:value={quantidade} required/>
		</div>
		<div class="inputDiv">
			<label for="agua" class="form-label">Água (L)</label>
			<input type="number" class="form-control inputTag" id="agua" step=".001" bind:value={agua} required/>
		</div>
	</div>
	<div class="isolatedAreaTitle">Levedura</div>
	<div class="inputsAreaIsolated">
		<div class="inputDiv">
			<label for="nome" class="form-label">Nome</label>
			<input type="text" class="form-control inputTag" id="nome" bind:value={nome} required/>
		</div>
		<div class="inputDiv">
			<label for="lote" class="form-label">Lote</label>
			<input type="text" class="form-control inputTag" id="lote" bind:value={lote} required/>
		</div>
		<div class="inputDiv">
			<label for="validade" class="form-label">Validade</label>
			<input type="date" class="form-control inputTag" id="validade" bind:value={validade} required/>
		</div>
		<div class="inputDiv">
			<label for="gLLevedura" class="form-label">g/L</label>
			<input type="number" class="form-control inputTag" id="gLLevedura" step=".001" bind:value={gLLevedura} required/>
		</div>
		<div class="inputDiv">
			<label for="quantidadePct" class="form-label">Qtd. pct. (%)</label>
			<input type="number" class="form-control inputTag" id="quantidadePct" step=".001" bind:value={quantidadePct} required/>
		</div>
	</div>
	<div class="inputsArea">
		<button type="submit" class="btn btn-success">Adicionar registro</button>
	</div>
</form>

{#key showPopUpErro}
	{#if showPopUpErro}
		<PopUpErro msg={insertResult.msg} on:message={() => handlePopUpErro(false)}/>
	{/if}
{/key}

{#key showPopUpSucesso}
	{#if showPopUpSucesso}
		<PopUpSucesso/>
	{/if}
{/key}



<style>
	form {
		position: relative;
		margin-top: 45px;
		min-height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.inputsArea {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.inputsAreaIsolated {
		height: fit-content;
		width: fit-content;
		max-width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 10px;
		border-radius: 10px;
		border: 1px solid var(--breadcrumb-gray);
	}
	.isolatedAreaTitle {
		margin-top: 10px;
		font-size: 18px;
	}

	.inputDiv {
		min-width: 200px;
		max-width: 200px;
		margin: 5px;
	}

	button {
		margin: 10px;
	}

	@media screen and (max-width: 650px) {
		form {
			margin-top: 30px;
		}
	}
	@media screen and (max-width: 480px) {
		.inputsArea, .inputsAreaIsolated {
			justify-content: center;
		}
	}
</style>