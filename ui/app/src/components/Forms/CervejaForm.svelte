<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import Loader from '../Navigation/Loader.svelte';
    import PopUpSucesso from '../Cards/PopUpSucesso.svelte';
    import PopUpErro from '../Cards/PopUpErro.svelte';
	import {CervejaFetches} from "../../fetches/CervejaFetches"
	import {TanqueFetches} from "../../fetches/TanqueFetches"

	let loader = true;
	let edited = false;
	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let cervejeiro1, cervejeiro2, tanqueFerm, volumeFerm, tempInicioFerm, extratoInicial, extratoFinal, AbvCalc, volumeUtilFinal, atenApar, dtInicio, dtEncerramento;
	let cervejeiro1Org, cervejeiro2Org, tanqueFermOrg, volumeFermOrg, tempInicioFermOrg, extratoInicialOrg, extratoFinalOrg, AbvCalcOrg, volumeUtilFinalOrg, atenAparOrg, dtInicioOrg, dtEncerramentoOrg;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}
	function atribuicaoDupla(value) {
		return [value, value]
	}

	let itemsData = {}
	async function updateCerveja(e) {
		e.preventDefault();
		const data = {
    		numOperacao: odp,
    		cervejeiro1: cervejeiro1,
    		cervejeiro2: cervejeiro2,
    		tanqueFerm: tanqueFerm,
    		volumeFerm: volumeFerm,
    		tempInicioFerm: tempInicioFerm,
    		extratoInicial: extratoInicial,
    		extratoFinal: extratoFinal,
    		AbvCalc: AbvCalc,
    		volumeUtilFinal: volumeUtilFinal,
    		atenApar: atenApar,
    		dtInicio: dtInicio,
    		dtEncerramento: dtEncerramento
  		};
		itemsData = await CervejaFetches.updateCerveja(data);
		if(itemsData.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};

	let formData = [];
	let tanqueSelect = []
	onMount(async () => {
		formData = await CervejaFetches.fetchCervejaData(odp);
		tanqueSelect = await TanqueFetches.fetchTanqueData();
		[cervejeiro1, cervejeiro1Org] = atribuicaoDupla(formData[0]["CERVEJEIRO_RESPONSAVEL_1"]);
		[cervejeiro2, cervejeiro2Org] = atribuicaoDupla(formData[0]["CERVEJEIRO_RESPONSAVEL_2"]);
		[tanqueFerm, tanqueFermOrg] = atribuicaoDupla(formData[0]["TANQUE_FERMENTACAO"]);
		[volumeFerm, volumeFermOrg] = atribuicaoDupla(formData[0]["VOLUME_FERMENTACAO"]);
		[tempInicioFerm, tempInicioFermOrg] = atribuicaoDupla(formData[0]["TEMP_INICIO_FERMENTACAO"]);
		[extratoInicial, extratoInicialOrg] = atribuicaoDupla(formData[0]["EXTRATO_INICIAL"]);
		[extratoFinal, extratoFinalOrg] = atribuicaoDupla(formData[0]["EXTRATO_FINAL"]);
		[AbvCalc, AbvCalcOrg] = atribuicaoDupla(formData[0]["ABV_CALCULADO"]);
		[volumeUtilFinal, volumeUtilFinalOrg] = atribuicaoDupla(formData[0]["VOLUME_UTIL_FINAL"]);
		[atenApar, atenAparOrg] = atribuicaoDupla(formData[0]["ATEN_APAR"]);
		[dtInicio, dtInicioOrg] = atribuicaoDupla(formData[0]["DT_INICIO_FABRICACAO"] ? (new Date(formData[0]["DT_INICIO_FABRICACAO"])).toISOString().split('T')[0] : null);
		[dtEncerramento, dtEncerramentoOrg] = atribuicaoDupla(formData[0]["DT_ENCERRAMENTO"] ? (new Date(formData[0]["DT_ENCERRAMENTO"])).toISOString().split('T')[0] : null);
		loader = false;
	});

	function checkEdit(){
		if(cervejeiro1 !== cervejeiro1Org || cervejeiro2 !== cervejeiro2Org || tanqueFerm !== tanqueFermOrg || volumeFerm !== volumeFermOrg || tempInicioFerm !== tempInicioFermOrg || 
		extratoInicial !== extratoInicialOrg || extratoFinal !== extratoFinalOrg || AbvCalc !== AbvCalcOrg || volumeUtilFinal !== volumeUtilFinalOrg || 
		atenApar !== atenAparOrg || dtInicio !== dtInicioOrg || dtEncerramento !== dtEncerramentoOrg) {
			edited = true;
		} else {
			edited = false;
		}
	}
</script>
<form on:submit={(e) => updateCerveja(e)}>
	<DefaultTitle titulo={`Cerveja`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="cervejeiro1" class="form-label">Cervejeiro responsável 1</label>
			<input type="text" class="form-control inputTag" id="cervejeiro1" bind:value={cervejeiro1} on:input={checkEdit}/>
		</div>
		<div class="inputDiv">
			<label for="cervejeiro2" class="form-label">Cervejeiro responsável 2</label>
			<input type="text" class="form-control inputTag" id="cervejeiro2" bind:value={cervejeiro2} on:input={checkEdit}/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="tanqueFerm" class="form-label">Tanque ferm.</label>
			<select class="form-select inputTag" placeholder="Selecionar tanque" id="tanqueFerm" bind:value={tanqueFerm} on:change={checkEdit}>
				{#each tanqueSelect as el (tanqueSelect)}
					<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
				{/each}
			</select>
		</div>
		<div class="inputDiv">
			<label for="volumeFerm" class="form-label">Volume ferm. (L)</label>
			<input type="number" class="form-control inputTag" id="volumeFerm"step=".001" bind:value={volumeFerm} on:input={checkEdit}/>
		</div>
		<div class="inputDiv">
			<label for="tempInicioFerm" class="form-label">T. início de ferm. (°C)</label>
			<input type="number" class="form-control inputTag" id="tempInicioFerm" step=".1" bind:value={tempInicioFerm} on:input={checkEdit}/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="extratoInicial" class="form-label">Extrato inicial (Sg)</label>
			<input type="number" class="form-control inputTag" id="extratoInicial" step=".001" bind:value={extratoInicial} on:input={checkEdit}/>
		</div>
		<div class="inputDiv">
			<label for="extratoFinal" class="form-label">Extrato final (Sg)</label>
			<input type="number" class="form-control inputTag" id="extratoFinal" step=".001" bind:value={extratoFinal} on:input={checkEdit}/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="AbvCalc" class="form-label">ABV calculado (%)</label>
			<input type="number" class="form-control inputTag" id="AbvCalc" step=".01" bind:value={AbvCalc} on:input={checkEdit}/>
		</div>
		<div class="inputDiv">
			<label for="volumeUtilFinal" class="form-label">Volume útil final (L)</label>
			<input type="number" class="form-control inputTag" id="volumeUtilFinal" step=".001" bind:value={volumeUtilFinal} on:input={checkEdit}/>
		</div>
		<div class="inputDiv">
			<label for="atenApar" class="form-label">Aten. Apar. (%)</label>
			<input type="number" class="form-control inputTag" id="atenApar" bind:value={atenApar} on:input={checkEdit}/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dtInicio" class="form-label">Dt. início de fabricação</label>
			<input type="date" class="form-control inputTag" id="dtInicio" bind:value={dtInicio} on:input={checkEdit}/>
		</div>
		<div class="inputDiv">
			<label for="dtEncerramento" class="form-label">Dt. encerramento</label>
			<input type="date" class="form-control inputTag" id="dtEncerramento" bind:value={dtEncerramento} on:input={checkEdit}/>
		</div>
	</div>
	<div class="inputsArea">
		{#key edited}
			{#if edited}
				<button type="button" class="btn btn-danger" on:click={() => {window.location.reload()}}>Cancelar alterações</button>
				<button type="submit" class="btn btn-success">Salvar alterações</button>
			{:else}
				<button type="button" class="btn btn-secondary">Cancelar alterações</button>
				<button type="button" class="btn btn-secondary">Salvar alterações</button>
			{/if}
		{/key}
	</div>
	{#if loader}
		<Loader/>
	{/if}
</form>

{#key showPopUpErro}
	{#if showPopUpErro}
		<PopUpErro msg={itemsData.msg} on:message={() => handlePopUpErro(false)}/>
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
		padding-bottom: 65px;
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