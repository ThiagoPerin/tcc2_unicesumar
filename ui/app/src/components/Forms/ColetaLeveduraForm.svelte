<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {ColetaLeveduraFetches} from '../../fetches/ColetaLeveduraFetches';
	import {TanqueFetches} from '../../fetches/TanqueFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataColeta = (new Date()).toISOString().split('T')[0];
	let tanque, temperatura, destino, lote, quantidade, responsavel, observacoes;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addRegister(e) {
		const data = {
			numOperacao: odp,
			dataColeta: dataColeta,
			tanque: tanque,
			temperatura: temperatura,
			destino: destino,
			lote: lote,
			quantidade: quantidade,
			responsavel: responsavel,
			observacoes: observacoes,
		}
		e.preventDefault();
		insertResult = await ColetaLeveduraFetches.addColetaLevedura(data);
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
	<DefaultTitle titulo={`Coleta de levedura`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataColeta" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="dataColeta" bind:value={dataColeta} required/>
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
		<div class="inputDiv">
			<label for="destino" class="form-label">Destino</label>
			<input type="text" class="form-control inputTag" id="destino" bind:value={destino} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="lote" class="form-label">Lote</label>
			<input type="text" class="form-control inputTag" id="lote" bind:value={lote} required/>
		</div>
		<div class="inputDiv">
			<label for="quantidade" class="form-label">Quantidade (L)</label>
			<input type="number" class="form-control inputTag" id="quantidade" step=".001" bind:value={quantidade} required/>
		</div>
		<div class="inputDiv">
			<label for="responsavel" class="form-label">Responsável</label>
			<input type="text" class="form-control inputTag" id="responsavel" bind:value={responsavel} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="textareaDiv">
			<label for="observacoes" class="form-label">Observações</label>
			<textarea class="form-control" id="observacoes" bind:value={observacoes} rows="3" maxlength="200" placeholder="detalhes da coleta de levedura..."></textarea>
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

	button {
		margin: 10px;
	}

	.textareaDiv {
		min-width: 320px;
		max-width: 320px;
		margin: 5px;
	}

	textarea {
  		max-height: 150px;
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