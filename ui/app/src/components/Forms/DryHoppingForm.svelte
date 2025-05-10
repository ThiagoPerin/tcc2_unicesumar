<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {DryHoppingFetches} from '../../fetches/DryHoppingFetches';
	import {TanqueFetches} from '../../fetches/TanqueFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataDryHopping = (new Date()).toISOString().split('T')[0];
	let tanque, temperatura, produto, validade, lote, alfaAcido, quantidade, unidade, responsavel;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addRegister(e) {
		const data = {
			numOperacao: odp,
			dataDryHopping: dataDryHopping,
			tanque: tanque,
			temperatura: temperatura,
			produto: produto,
			validade: validade,
			lote: lote,
			alfaAcido: alfaAcido,
			quantidade: quantidade,
			unidade: unidade,
			responsavel: responsavel,
		}
		e.preventDefault();
		insertResult = await DryHoppingFetches.addDryHopping(data);
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
	<DefaultTitle titulo={`Dry hopping, adjuntos e clarificação`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataDryHopping" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="dataDryHopping" bind:value={dataDryHopping} required/>
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
			<label for="temperatura" class="form-label">Temperatura (°C)</label>
			<input type="number" class="form-control inputTag" id="temperatura" step=".001" bind:value={temperatura} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="produto" class="form-label">Produto</label>
			<input type="text" class="form-control inputTag" id="produto" bind:value={produto} required/>
		</div>
		<div class="inputDiv">
			<label for="alfaAcido" class="form-label">Alfa ácido (%)</label>
			<input type="number" class="form-control inputTag" id="alfaAcido" step=".001" bind:value={alfaAcido}/>
		</div>
		<div class="inputDiv">
			<label for="quantidade" class="form-label">Quantidade</label>
			<input type="number" class="form-control inputTag" id="quantidade" step=".001" bind:value={quantidade} required/>
		</div>
		<div class="inputDivSelect">
			<label for="quantidade" class="form-label">Unidade</label>
			<select class="form-select" aria-label="Default select example"  bind:value={unidade}>
				<option value="Kg">Kg</option>
				<option value="g">g</option>
				<option value="L">L</option>
				<option value="ml">ml</option>
			</select>
		</div>
		<div class="inputDiv">
			<label for="lote" class="form-label">Lote</label>
			<input type="text" class="form-control inputTag" id="lote" bind:value={lote} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="validade" class="form-label">Validade</label>
			<input type="date" class="form-control inputTag" id="validade" bind:value={validade} required/>
		</div>
		<div class="inputDiv">
			<label for="responsavel" class="form-label">Responsável</label>
			<input type="text" class="form-control inputTag" id="responsavel" bind:value={responsavel} required/>
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

	.inputDiv {
		min-width: 200px;
		max-width: 200px;
		margin: 5px;
	}
	
	.inputDivSelect {
		min-width: 90px;
		max-width: 90px;
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
		.inputsArea {
			justify-content: center;
		}
	}
</style>