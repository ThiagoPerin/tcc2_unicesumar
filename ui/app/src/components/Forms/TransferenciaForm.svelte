<script lang="ts">
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import { TransferenciaFetches } from "../../fetches/TransferenciaFetches";
	import { TanqueFetches } from '../../fetches/TanqueFetches';
	import { TipoOperacao } from '../../fetches/types/TipoOperacao';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let tipoOperacao: TipoOperacao = TipoOperacao.TRANSFERENCIA;
	let dataTransferencia = (new Date()).toISOString().split('T')[0];
	let deTanque, paraTanque, temperatura, purga, transfTotal, descarte, carb, responsavel, observacoes;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {} as any; // Dami ordenou, mas nao recomendou.
	async function addRegister(e) {
		const data = {
			numOperacao: odp,
			tipoOperacao: tipoOperacao,
			dataTransferencia: dataTransferencia,
			deTanque: deTanque,
			paraTanque: paraTanque,
			temperatura: temperatura,
			purga: purga,
			transfTotal: transfTotal,
			descarte: descarte,
			carb: carb,
			responsavel: responsavel,
			observacoes: observacoes,
		}
		e.preventDefault();
		insertResult = await TransferenciaFetches.addTransferencia(data);
		if(insertResult.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};

	function changeOperationType() {
		deTanque = undefined;
		paraTanque = undefined;
		transferenciaMaxima = undefined;
	}

	let transferenciaMaxima;
	async function maxVolume() {
		const tanquesView = await TanqueFetches.fetchTanqueDashboard();

		const tanqueDeOrigem = tanquesView.find(el => el["NUM_TANQUE"] === deTanque);
		const volumeMaxTanqueOrigem = Number(tanqueDeOrigem?.["VOLUME"]) || 0;

		const tanqueDeDestino = tanquesView.find(el => el["NUM_TANQUE"] === paraTanque);
		const volumeAtualParaTanque = Number(tanqueDeDestino?.["VOLUME"]) || 0;
		const capacidadeParaTanque = Number(tanqueDeDestino?.["CAPACIDADE"]) || 0;
		const volumeMaxTanqueDestino = capacidadeParaTanque - volumeAtualParaTanque;

		if (tipoOperacao === TipoOperacao.TRANSFERENCIA) {
			transferenciaMaxima = Math.min(volumeMaxTanqueOrigem, volumeMaxTanqueDestino);
		} else if (tipoOperacao === TipoOperacao.ABASTECIMENTO) {
			transferenciaMaxima = volumeMaxTanqueDestino;
		} else if (tipoOperacao === TipoOperacao.ESVAZIAMENTO) {
			transferenciaMaxima = volumeMaxTanqueOrigem;
		} else {
			return;
		}
	}

	let tanqueSelect = []
	onMount(async () => {
		tanqueSelect = await TanqueFetches.fetchTanqueData();
	});
</script>
<form on:submit={(e) => addRegister(e)}>
	<DefaultTitle titulo={`Transferências (purgas e descartes)`}/>
	<div class="inputsArea">
		<div class="form-check radio-option">
			<input class="form-check-input" type="radio" name="tipoOperacao" id="tipoOperacao1" on:click={changeOperationType} value={TipoOperacao.TRANSFERENCIA} bind:group={tipoOperacao}>
			<label class="form-check-label" for="tipoOperacao1">Entre tanques</label>
		</div>
		<div class="form-check radio-option">
			<input class="form-check-input" type="radio" name="tipoOperacao" id="tipoOperacao2" on:click={changeOperationType} value={TipoOperacao.ABASTECIMENTO} bind:group={tipoOperacao}>
			<label class="form-check-label" for="tipoOperacao2">Abastecimento</label>
		</div>
		<div class="form-check radio-option">
			<input class="form-check-input" type="radio" name="tipoOperacao" id="tipoOperacao3" on:click={changeOperationType} value={TipoOperacao.ESVAZIAMENTO} bind:group={tipoOperacao}>
			<label class="form-check-label" for="tipoOperacao3">Esvaziamento</label>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataTransferencia" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="dataTransferencia" bind:value={dataTransferencia} required/>
		</div>
		<div class="inputDiv">
			<label for="deTanque" class="form-label">De tanque</label>
			<select class="form-select inputTag" placeholder="Selecionar tanque" id="deTanque" bind:value={deTanque} on:change={maxVolume} disabled={tipoOperacao == TipoOperacao.ABASTECIMENTO} required={tipoOperacao !== TipoOperacao.ABASTECIMENTO}>
				{#each tanqueSelect.filter(el => el["NUM_TANQUE"] !== paraTanque) as el (el["NUM_TANQUE"])}
					<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
				{/each}
			</select>
		</div>
		<div class="inputDiv">
			<label for="paraTanque" class="form-label">Para tanque</label>
			<select class="form-select inputTag" placeholder="Selecionar tanque" id="paraTanque" bind:value={paraTanque} on:change={maxVolume} disabled={tipoOperacao == TipoOperacao.ESVAZIAMENTO} required={tipoOperacao !== TipoOperacao.ESVAZIAMENTO}>
				{#each tanqueSelect.filter(el => el["NUM_TANQUE"] !== deTanque) as el (el["NUM_TANQUE"])}
					<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="transfTotal" class="form-label">Transferência (L)</label>
			<input type="number" class="form-control inputTag" id="transfTotal" step=".001" bind:value={transfTotal} min="0" max="{transferenciaMaxima}" disabled={!(deTanque || paraTanque)} required/>
			{#key transferenciaMaxima}
				{#if transferenciaMaxima !== undefined}
					<div class="input-alert">Máximo possível: {transferenciaMaxima} L.</div>
				{/if}
			{/key}
		</div>
		<div class="inputDiv">
			<label for="responsavel" class="form-label">Desacarte (L)</label>
			<input type="number" class="form-control inputTag" id="descarte" step=".001" bind:value={descarte}/>
		</div>
		<div class="inputDiv">
			<label for="purga" class="form-label">Purga (L)</label>
			<input type="number" class="form-control inputTag" id="purga" step=".001" bind:value={purga}/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="temperatura" class="form-label">Temperatura (°C)</label>
			<input type="number" class="form-control inputTag" id="temperatura" step=".001" bind:value={temperatura}/>
		</div>
		<div class="inputDiv">
			<label for="carb" class="form-label">Carb (Kgf)</label>
			<input type="number" class="form-control inputTag" id="carb" step=".001" bind:value={carb}/>
		</div>
		<div class="inputDiv">
			<label for="responsavel" class="form-label">Responsável</label>
			<input type="text" class="form-control inputTag" id="responsavel" bind:value={responsavel} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="textareaDiv">
			<label for="observacoes" class="form-label">Observações</label>
			<textarea class="form-control" id="observacoes" bind:value={observacoes} rows="3" maxlength="100" placeholder="detalhes da transferência..."></textarea>
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
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.radio-option {
		margin: 10px;
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

	.input-alert {
		color: red;
		/* font-weight: lighter; */
		font-size: 12px;
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