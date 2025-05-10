<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {EnvaseLatasFetches} from "../../fetches/EnvaseLatasFetches";
	import {TanqueFetches} from '../../fetches/TanqueFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataEnvase = (new Date()).toISOString().split('T')[0];
	let tanque, carbonatacao, tamanho, horaInicio, horaFim, quantidade, refugo, lab, litros, acidoAscorbico, responsavel, descarteTampa, amassadaMáquina, amassadaCabine;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addRegister(e) {
		const data = {
			numOperacao: odp,
			dataEnvase: dataEnvase,
			carbonatacao: carbonatacao,
			tanque: tanque,
			tamanho: tamanho,
			horaInicio: horaInicio,
			horaFim: horaFim,
			quantidade: quantidade,
			descarte: refugo,
			lab: lab,
			litros: litros,
			acidoAscorbico: acidoAscorbico,
			responsavel: responsavel,
			descarteTampa: descarteTampa, 
			amassadaMáquina: amassadaMáquina, 
			amassadaCabine: amassadaCabine
		}
		e.preventDefault();
		insertResult = await EnvaseLatasFetches.addEnvaseLatas(data);
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
	<DefaultTitle titulo={`Envase de Garrafas/Latas`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataEnvase" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="dataEnvase" bind:value={dataEnvase} required/>
		</div>
		<div class="inputDiv">
			<label for="carbonatacao" class="form-label">Carbonatação</label>
			<input type="text" class="form-control inputTag" id="carbonatacao" bind:value={carbonatacao} required/>
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
			<label for="tamanho" class="form-label">Tamanho (ml)</label>
			<input type="number" class="form-control inputTag" id="tamanho" bind:value={tamanho} required/>
		</div>
		<div class="inputDiv">
			<label for="descarteTampa" class="form-label">Descarte tampa</label>
			<input type="number" class="form-control inputTag" id="descarteTampa" bind:value={descarteTampa}/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="horaInicio" class="form-label">Hora início</label>
			<input type="time" class="form-control inputTag" id="horaInicio" bind:value={horaInicio} required/>
		</div>
		<div class="inputDiv">
			<label for="horaFim" class="form-label">Hora fim</label>
			<input type="time" class="form-control inputTag" id="horaFim" bind:value={horaFim} required/>
		</div>
		<div class="inputDiv">
			<label for="quantidade" class="form-label">Quantidade (Latas)</label>
			<input type="number" class="form-control inputTag" id="quantidade" bind:value={quantidade} required/>
		</div>
		<div class="inputDiv">
			<label for="refugo" class="form-label">Refugo (Latas)</label>
			<input type="number" class="form-control inputTag" id="descarte" bind:value={refugo}/>
		</div>
		<div class="inputDiv">
			<label for="amassadaMáquina" class="form-label">Amassada máquina</label>
			<input type="number" class="form-control inputTag" id="amassadaMáquina" bind:value={amassadaMáquina}/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="litros" class="form-label">Litros (L)</label>
			<input type="number" class="form-control inputTag" id="litros" step=".001" bind:value={litros} required/>
		</div>
		<div class="inputDiv">
			<label for="acidoAscorbico" class="form-label">Ácido ascórbico (g)</label>
			<input type="number" class="form-control inputTag" id="acidoAscorbico" step=".001" bind:value={acidoAscorbico} required/>
		</div>
		<div class="inputDiv">
			<label for="responsavel" class="form-label">Responsável</label>
			<input type="text" class="form-control inputTag" id="responsavel" bind:value={responsavel} required/>
		</div>
		<div class="inputDiv">
			<label for="lab" class="form-label">Laboratório (Latas)</label>
			<input type="number" class="form-control inputTag" id="lab" bind:value={lab} required/>
		</div>
		<div class="inputDiv">
			<label for="amassadaCabine" class="form-label">Amassada cabine</label>
			<input type="number" class="form-control inputTag" id="amassadaCabine" bind:value={amassadaCabine}/>
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