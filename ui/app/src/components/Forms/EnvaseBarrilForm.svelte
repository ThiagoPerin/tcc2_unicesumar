<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {EnvaseBarrilFetches} from "../../fetches/EnvaseBarrilFetches";
	import {TanqueFetches} from '../../fetches/TanqueFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataEnvase = (new Date()).toISOString().split('T')[0];
	let tanque, responsavel, observacoes;
	let p01 = 0, p02 = 0, p20 = 0, p30 = 0, growler = 0, oak = 0, total = 0;

	function calculaTotal() {
		total = p01+(p02*2)+(p20*20)+(p30*30)+growler+oak;
	}

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addRegister(e) {
		const data = {
			numOperacao: odp,
			dataEnvase: dataEnvase,
			tanque: tanque,
			p01: p01,
			p02: p02,
			p20: p20,
			p30: p30,
			growler: growler,
			oak: oak,
			total: total,
			responsavel: responsavel,
			observacoes: observacoes,
		}
		e.preventDefault();
		insertResult = await EnvaseBarrilFetches.addEnvaseBarril(data);
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
	<DefaultTitle titulo={`Envase de Barris`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataEnvase" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="dataEnvase" bind:value={dataEnvase} required/>
		</div>
		<div class="inputDiv">
			<label for="tanqueBarril" class="form-label">Tanque</label>
			<select class="form-select inputTag" placeholder="Selecionar tanque" id="tanqueBarril" bind:value={tanque} required>
				{#each tanqueSelect as el (tanqueSelect)}
					<option value="{el["NUM_TANQUE"]}">{el["NUM_TANQUE"]}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="p01" class="form-label">P01</label>
			<input type="number" class="form-control inputTag" id="p01" bind:value={p01} on:change={calculaTotal} required/>
		</div>
		<div class="inputDiv">
			<label for="p02" class="form-label">P02</label>
			<input type="number" class="form-control inputTag" id="temperap02turaFinal" bind:value={p02} on:change={calculaTotal} required/>
		</div>
		<div class="inputDiv">
			<label for="p20" class="form-label">P20</label>
			<input type="number" class="form-control inputTag" id="p20" bind:value={p20} on:change={calculaTotal} required/>
		</div>
		<div class="inputDiv">
			<label for="p30" class="form-label">P30</label>
			<input type="number" class="form-control inputTag" id="p30" bind:value={p30} on:change={calculaTotal} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="growler" class="form-label">Growler (L)</label>
			<input type="number" class="form-control inputTag" id="growler" bind:value={growler} on:change={calculaTotal} required/>
		</div>
		<div class="inputDiv">
			<label for="oak" class="form-label">Oak (L)</label>
			<input type="number" class="form-control inputTag" id="oak" bind:value={oak} on:change={calculaTotal} required/>
		</div>
		<div class="inputDiv">
			<label for="total" class="form-label">Total (L)</label>
			<input type="number" class="form-control " id="total" bind:value={total} disabled readonly/>
		</div>
		<div class="inputDiv">
			<label for="responsavel" class="form-label">Responsável</label>
			<input type="text" class="form-control inputTag" id="responsavel" bind:value={responsavel} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="textareaDiv">
			<label for="observacoes" class="form-label">Observações</label>
			<textarea class="form-control" id="observacoes" bind:value={observacoes} rows="3" maxlength="100" placeholder="detalhes do envase..."></textarea>
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