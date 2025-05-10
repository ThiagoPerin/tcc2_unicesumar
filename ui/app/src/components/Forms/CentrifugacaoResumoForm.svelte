<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {CentrifugacaoResumoFetches} from '../../fetches/CentrifugacaoResumoFetches';
	import {TanqueFetches} from '../../fetches/TanqueFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataCentrifugacao = (new Date()).toISOString().split('T')[0];
	let deTanque, paraTanque, volume, horaInicio, horaFim, ebc, hlh, total, media, responsavel;

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
			volume: volume,
			horaInicio: horaInicio,
			horaFim: horaFim,
			ebc: ebc,
			hlh: hlh,
			total: total,
			media: media,
			responsavel: responsavel,
		}
		e.preventDefault();
		insertResult = await CentrifugacaoResumoFetches.addCentrifugacaoResumo(data);
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
	<DefaultTitle titulo={`Resumo centrifugação`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="resumo-dataCentrifugacao" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="resumo-dataCentrifugacao" bind:value={dataCentrifugacao} required/>
		</div>
		<div class="inputDiv">
			<label for="resumo-deTanque" class="form-label">De tanque</label>
			<select class="form-select inputTag" placeholder="Selecionar tanque" id="resumo-deTanque" bind:value={deTanque} required>
				{#each tanqueSelect as el (tanqueSelect)}
					<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
				{/each}
			</select>
		</div>
		<div class="inputDiv">
			<label for="resumo-paraTanque" class="form-label">Para tanque</label>
			<select class="form-select inputTag" placeholder="Selecionar tanque" id="resumo-paraTanque" bind:value={paraTanque} required>
				{#each tanqueSelect as el (tanqueSelect)}
					<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
				{/each}
			</select>
		</div>
		<div class="inputDiv">
			<label for="resumo-volume" class="form-label">Volume inicial</label>
			<input type="number" class="form-control inputTag" id="resumo-volume" bind:value={volume}/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="resumo-horaInicio" class="form-label">Hora início</label>
			<input type="time" class="form-control inputTag" id="resumo--horaInicio" bind:value={horaInicio} required/>
		</div>
		<div class="inputDiv">
			<label for="resumo-horaFim" class="form-label">Hora fim</label>
			<input type="time" class="form-control inputTag" id="resumo-horaFim" bind:value={horaFim} required/>
		</div>
		<div class="inputDiv">
			<label for="resumo-ebc" class="form-label">EBC</label>
			<input type="number" class="form-control inputTag" id="resumo-ebc" step=".001" bind:value={ebc} required/>
		</div>
		<div class="inputDiv">
			<label for="resumo-hlh" class="form-label">hL/h</label>
			<input type="number" class="form-control inputTag" id="resumo-hlh" step=".001" bind:value={hlh} required/>
		</div>
		<div class="inputDiv">
			<label for="resumo-total" class="form-label">Total hL</label>
			<input type="number" class="form-control inputTag" id="resumo-total" step=".001" bind:value={total} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="resumo-media" class="form-label">Média</label>
			<input type="number" class="form-control inputTag" id="resumo-media" step=".001" bind:value={media}/>
		</div>
		<div class="inputDiv">
			<label for="resumo-responsavel" class="form-label">Responsável</label>
			<input type="text" class="form-control inputTag" id="resumo-responsavel" bind:value={responsavel} required/>
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