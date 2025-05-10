<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {PreparacaoMaltesFetches} from '../../fetches/PreparacaoMaltesFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let separacao, conferencia1, conferencia2, moagem;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addInoculacao(e) {
		const data = {
			numOperacao: odp,
			separacao: separacao,
			conferencia1: conferencia1,
			conferencia2: conferencia2,
			moagem: moagem,
		}
		e.preventDefault();
		insertResult = await PreparacaoMaltesFetches.addPreparacaoMaltes(data);
		if(insertResult.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};
</script>
<form on:submit={(e) => addInoculacao(e)}>
	<DefaultTitle titulo={`Preparação de maltes`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="separacao" class="form-label">Separação</label>
			<input type="text" class="form-control inputTag" id="separacao" bind:value={separacao} required/>
		</div>
		<div class="inputDiv">
			<label for="conferencia1" class="form-label">Conferência 1</label>
			<input type="text" class="form-control inputTag" id="conferencia1" bind:value={conferencia1} required/>
		</div>
		<div class="inputDiv">
			<label for="conferencia2" class="form-label">Conferência 2</label>
			<input type="text" class="form-control inputTag" id="conferencia2" bind:value={conferencia2} required/>
		</div>
		<div class="inputDiv">
			<label for="moagem" class="form-label">Moagem</label>
			<input type="text" class="form-control inputTag" id="moagem" bind:value={moagem} required/>
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