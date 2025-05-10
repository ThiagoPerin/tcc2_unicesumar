<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpSucesso from '../Cards/PopUpSucesso.svelte';
    import PopUpErro from '../Cards/PopUpErro.svelte';
	import {FermentacaoForcadaFetches} from "../../fetches/FermentacaoForcadaFetches";

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataFermentacao, hora, extratoInicial, diasTeste, horasAgit, extratoFinal, observacoes, responsavel;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let itemsData = {}
	async function addRegistro(e) {
		e.preventDefault();
		const data = {
    		numOperacao: odp,
    		dataFermentacao: dataFermentacao,
    		hora: hora,
    		extratoInicial: extratoInicial,
    		diasTeste: diasTeste,
    		horasAgit: horasAgit,
    		extratoFinal: extratoFinal,
    		observacoes: observacoes,
    		responsavel: responsavel,
  		};
		itemsData = await FermentacaoForcadaFetches.addFermentacaoForcada(data);
		if(itemsData.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};
</script>
<form on:submit={(e) => addRegistro(e)}>
	<DefaultTitle titulo={`Fermentação forçada`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataFermentacao" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="dataFermentacao" bind:value={dataFermentacao} required/>
		</div>
		<div class="inputDiv">
			<label for="hora" class="form-label">Hora</label>
			<input type="time" class="form-control inputTag" id="hora" bind:value={hora} required/>
		</div>
		<div class="inputDiv">
			<label for="extartoInicial" class="form-label">Extrato inicial</label>
			<input type="number" class="form-control inputTag" id="extartoInicial" step=".001" bind:value={extratoInicial} required/>
		</div>
		<div class="inputDiv">
			<label for="extratoFinal" class="form-label">Extrato final</label>
			<input type="number" class="form-control inputTag" id="extratoFinal" step=".001" bind:value={extratoFinal} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="diasTeste" class="form-label">Dias teste</label>
			<input type="number" class="form-control inputTag" id="diasTeste" bind:value={diasTeste} required/>
		</div>
		<div class="inputDiv">
			<label for="horasAgit" class="form-label">Horas agit. (h)</label>
			<input type="number" class="form-control inputTag" id="horasAgit" bind:value={horasAgit} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="textareaDiv">
			<label for="observacoes" class="form-label">Observações</label>
			<textarea class="form-control" id="observacoes" bind:value={observacoes} rows="3" maxlength="200" placeholder="detalhes da fermentação forçada..."></textarea>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="responsavel" class="form-label">Responsável</label>
			<input type="text" class="form-control inputTag" id="responsavel" bind:value={responsavel} required/>
		</div>
	</div>
	<div class="inputsArea">
		<button type="submit" class="btn btn-success">Salvar alterações</button>	
	</div>
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

	.textareaDiv {
		min-width: 320px;
		max-width: 320px;
		margin: 5px;
	}

	textarea {
  		max-height: 150px;
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