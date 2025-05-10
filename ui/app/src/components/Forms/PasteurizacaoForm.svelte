<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import { PasteurizacaoFetches } from '../../fetches/PasteurizacaoFetches';
	import { TanqueFetches } from '../../fetches/TanqueFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataInicio, horaInicio, dataFim, horaFim, pressaoCuba, tanqueEntrada, temperaturaEntrada, pressaoEntrada, tanqueSaida, temperaturaSaida, pressaoSaida, responsavel;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addRegistro(e) {
		const data = {
			numOperacao: odp,
			dataInicio: dataInicio,
			horaInicio: horaInicio,
			dataFim: dataFim,
			horaFim: horaFim,
			pressaoCuba: pressaoCuba,
			tanqueEntrada: tanqueEntrada,
			temperaturaEntrada: temperaturaEntrada,
			pressaoEntrada: pressaoEntrada,
			tanqueSaida: tanqueSaida,
			temperaturaSaida: temperaturaSaida,
			pressaoSaida: pressaoSaida,
			responsavel: responsavel,
		}
		e.preventDefault();
		insertResult = await PasteurizacaoFetches.addPasteurizacao(data);
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
<form on:submit={(e) => addRegistro(e)}>
	<DefaultTitle titulo={`Pasteurização`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataInicio" class="form-label">Data início</label>
			<input type="date" class="form-control inputTag" id="dataInicio" bind:value={dataInicio} required/>
		</div>
		<div class="inputDiv">
			<label for="horaInicio" class="form-label">Hora início</label>
			<input type="time" class="form-control inputTag" id="horaInicio" bind:value={horaInicio} required/>
		</div>
		<div class="inputDiv">
			<label for="dataFim" class="form-label">Data fim</label>
			<input type="date" class="form-control inputTag" id="dataFim" bind:value={dataFim} required/>
		</div>
		<div class="inputDiv">
			<label for="horaFim" class="form-label">Hora fim</label>
			<input type="time" class="form-control inputTag" id="horaFim" bind:value={horaFim} required/>
		</div>
	</div>
	<div class="isolatedArea">
		<div class="isolatedAreaTitle">Tanque de entrada</div>
		<div class="inputsAreaIsolated">
			<div class="inputDiv">
				<label for="tanqueEntrada" class="form-label">Tanque</label>
				<select class="form-select inputTag" placeholder="Selecionar tanque" id="tanqueEntrada" bind:value={tanqueEntrada} required>
					{#each tanqueSelect as el (tanqueSelect)}
						<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
					{/each}
				</select>
			</div>
			<div class="inputDiv">
				<label for="temperaturaEntrada" class="form-label">Temperatura (°C)</label>
				<input type="number" class="form-control inputTag" id="temperaturaEntrada" step=".01" bind:value={temperaturaEntrada} required/>
			</div>
			<div class="inputDiv">
				<label for="pressaoEntrada" class="form-label">Pressão (Kgf)</label>
				<input type="number" class="form-control inputTag" id="pressaoEntrada" step=".001" bind:value={pressaoEntrada} required/>
			</div>
		</div>
	</div>
	<div class="isolatedArea">
		<div class="isolatedAreaTitle">Tanque de saída</div>
		<div class="inputsAreaIsolated">
			<div class="inputDiv">
				<label for="tanqueSaida" class="form-label">Tanque</label>
				<select class="form-select inputTag" placeholder="Selecionar tanque" id="tanqueSaida" bind:value={tanqueSaida} required>
					{#each tanqueSelect as el (tanqueSelect)}
						<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
					{/each}
				</select>
			</div>
			<div class="inputDiv">
				<label for="temperaturaSaida" class="form-label">Temperatura (°C)</label>
				<input type="number" class="form-control inputTag" id="temperaturaSaida" step=".01" bind:value={temperaturaSaida} required/>
			</div>
			<div class="inputDiv">
				<label for="pressaoSaida" class="form-label">Pressão (Kgf)</label>
				<input type="number" class="form-control inputTag" id="pressaoSaida" step=".001" bind:value={pressaoSaida} required/>
			</div>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="pressaoCuba" class="form-label">Pressão cuba setpoint (Kgf)</label>
			<input type="number" class="form-control inputTag" id="pressaoCuba" step=".001" bind:value={pressaoCuba} required/>
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
		flex-direction: row;
		flex-wrap: wrap;
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

	.isolatedArea {
		height: fit-content;
		width: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 10px 20px 0px 0px;
	}

	.inputsAreaIsolated {
		height: fit-content;
		width: fit-content;
		max-width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 10px;
		border-radius: 10px;
		border: 1px solid var(--breadcrumb-gray);
	}
	.isolatedAreaTitle {
		font-size: 18px;
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