<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {CentrifugacaoFetches} from '../../fetches/CentrifugacaoFetches';
	import {TanqueFetches} from '../../fetches/TanqueFetches';

	export let registros = [];
	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataCentrifugacao = (new Date()).toISOString().split('T')[0];
	let deTanque, paraTanque, temperatura, hora, ebc, hlh, acumulado, observacoes, responsavel;
	let fim = false;

	function prePreencher() {
		const registrosAtuais = registros.at(-1);
		deTanque = registrosAtuais["DE_TANQUE"]
		paraTanque = registrosAtuais["PARA_TANQUE"]
		temperatura = registrosAtuais["TEMPERATURA"]
		ebc = registrosAtuais["EBC"]
		hlh = registrosAtuais["HLH"]
		acumulado = registrosAtuais["ACUMULADO_HL"]
		observacoes = registrosAtuais["OBSERVACOES"]
		responsavel = registrosAtuais["RESPONSAVEL"]
	}

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addRegister(e) {
		const data = {
			numOperacao: odp,
			dataCentrifugacao: dataCentrifugacao,
			deTanque: deTanque,
			paraTanque: paraTanque,
			temperatura: temperatura,
			hora: hora,
			ebc: ebc,
			hlh: hlh,
			acumulado: acumulado,
			observacoes: observacoes,
			responsavel: responsavel,
			fim: fim,
		}
		e.preventDefault();
		insertResult = await CentrifugacaoFetches.addCentrifugacao(data);
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
	<DefaultTitle titulo={`Dados de centrifugação`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataCentrifugacao" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="dataCentrifugacao" bind:value={dataCentrifugacao} required/>
		</div>
		<div class="inputDiv">
			<label for="deTanque" class="form-label">De tanque</label>
			<select class="form-select inputTag" placeholder="Selecionar tanque" id="deTanque" bind:value={deTanque} required>
				{#each tanqueSelect as el (tanqueSelect)}
					<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
				{/each}
			</select>
		</div>
		<div class="inputDiv">
			<label for="paraTanque" class="form-label">Para tanque</label>
			<select class="form-select inputTag" placeholder="Selecionar tanque" id="paraTanque" bind:value={paraTanque} required>
				{#each tanqueSelect as el (tanqueSelect)}
					<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
				{/each}
			</select>
		</div>
		<div class="inputDiv">
			<label for="temperatura" class="form-label">Temperatura (°C)</label>
			<input type="number" class="form-control inputTag" id="temperatura" step=".1" bind:value={temperatura} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="hora" class="form-label">Hora</label>
			<input type="time" class="form-control inputTag" id="hora" bind:value={hora} required/>
		</div>
		<div class="inputDiv">
			<label for="ebc" class="form-label">EBC</label>
			<input type="number" class="form-control inputTag" id="ebc" step=".001" bind:value={ebc} required/>
		</div>
		<div class="inputDiv">
			<label for="hlh" class="form-label">hL/h</label>
			<input type="number" class="form-control inputTag" id="hlh" step=".001" bind:value={hlh} required/>
		</div>
		<div class="inputDiv">
			<label for="acumulado" class="form-label">Acumulado hL</label>
			<input type="number" class="form-control inputTag" id="acumulado" step=".001" bind:value={acumulado} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="textareaDiv">
			<label for="observacoes" class="form-label">Observações</label>
			<textarea class="form-control" id="observacoes" bind:value={observacoes} rows="3" maxlength="100" placeholder="detalhes da centrifugação..."></textarea>
		</div>
		<div class="inputDiv">
			<label for="responsavel" class="form-label">Responsável</label>
			<input type="text" class="form-control inputTag" id="responsavel" bind:value={responsavel} required/>
		</div>
		<div class="inputDiv">
			<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" bind:checked={fim}/>
			<label for="responsavel" class="form-label">Fim da centrifugação</label>
		</div>
	</div>
	<div class="inputsArea">
		{#if registros.length !== 0}
			<button type="button" class="btn btn-primary" on:click={prePreencher}>Pré-preencher</button>
		{:else}
			<button type="button" class="btn btn-secondary" disabled>Pré-preencher</button>
		{/if}
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
		align-items: flex-end;
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