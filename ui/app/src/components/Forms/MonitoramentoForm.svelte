<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {MonitoramentoFetches} from '../../fetches/MonitoramentoFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataMonitoramento = (new Date()).toISOString().split('T')[0];
	let hora, extrato, temperatura, alteracao

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addInoculacao(e) {
		const data = {
			numOperacao: odp,
			dataMonitoramento: dataMonitoramento,
			hora: hora,
			extrato: extrato,
			temperatura: temperatura,
			alteracao: alteracao,
		}
		e.preventDefault();
		insertResult = await MonitoramentoFetches.addMonitoramento(data);
		if(insertResult.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};
</script>
<form on:submit={(e) => addInoculacao(e)}>
	<DefaultTitle titulo={`Monitoramento de extrato e temperatura`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataInoculacao" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="dataInoculacao" bind:value={dataMonitoramento} required/>
		</div>
		<div class="inputDiv">
			<label for="levedura" class="form-label">Hora</label>
			<input type="time" class="form-control inputTag" id="levedura" bind:value={hora} required/>
		</div>
		<div class="inputDiv">
			<label for="origemLote" class="form-label">Extrato (Sg)</label>
			<input type="number" class="form-control inputTag" id="origemLote" step=".001" bind:value={extrato} required/>
		</div>
		<div class="inputDiv">
			<label for="origemLote" class="form-label">temperatura (°C)</label>
			<input type="number" class="form-control inputTag" id="origemLote" step=".01" bind:value={temperatura} required/>
		</div>
		<div class="inputDiv">
			<label for="origemLote" class="form-label">Alter. T</label>
			<input type="number" class="form-control inputTag" id="origemLote" step=".01" bind:value={alteracao} required/>
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