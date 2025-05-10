<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {InoculacaoFetches} from '../../fetches/InoculacaoFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataInoculacao = (new Date()).toISOString().split('T')[0];
	let levedura, origemLote, contagem, validade, quantidade, responsavel;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addInoculacao(e) {
		e.preventDefault();
		const data = {
			numOperacao: odp,
			dataInoculacao: dataInoculacao,
			levedura: levedura,
			origemLote: origemLote,
			contagem: contagem,
			validade: validade,
			quantidade: quantidade,
			responsavel: responsavel,
		}

		insertResult = await InoculacaoFetches.addInoculacao(data);
		if(insertResult.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};
</script>
<form on:submit={(e) => addInoculacao(e)}>
	<DefaultTitle titulo={`Inoculação de levedura`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="dataInoculacao" class="form-label">Data</label>
			<input type="date" class="form-control inputTag" id="dataInoculacao" bind:value={dataInoculacao} required/>
		</div>
		<div class="inputDiv">
			<label for="levedura" class="form-label">Levedura</label>
			<input type="text" class="form-control inputTag" id="levedura" bind:value={levedura} required/>
		</div>
		<div class="inputDiv">
			<label for="origemLote" class="form-label">Origem/Lote</label>
			<input type="text" class="form-control inputTag" id="origemLote" bind:value={origemLote} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="contagem" class="form-label">Contagem (x10¹²)</label>
			<input type="number" class="form-control inputTag" id="contagem" step=".01" bind:value={contagem} required/>
		</div>
		<div class="inputDiv">
			<label for="validade" class="form-label">Validade</label>
			<input type="text" class="form-control inputTag" id="validade" bind:value={validade} required/>
		</div>
		<div class="inputDiv">
			<label for="quantidade" class="form-label">Quantidade</label>
			<input type="number" class="form-control inputTag" id="quantidade" step=".001" bind:value={quantidade} required/>
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