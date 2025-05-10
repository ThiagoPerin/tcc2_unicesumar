<script>
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {CadastroCervejaFetches} from '../../fetches/CadastroCervejaFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let nome, codigo, grauAlcoolico, mapa, ingrediente;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addRegistro(e) {
		const data = {
			nome: nome,
			codigo: codigo,
			grauAlcoolico: grauAlcoolico,
			mapa: mapa,
			ingrediente: ingrediente,
		}
		e.preventDefault();
		insertResult = await CadastroCervejaFetches.addCadastroCerveja(data);
		if(insertResult.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};
</script>
<form on:submit={(e) => addRegistro(e)}>
	<DefaultTitle titulo={`Cadastro de cervejas`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="nome" class="form-label">Nome</label>
			<input type="text" class="form-control inputTag" id="nome" autocomplete="off" maxlength="25"
			 bind:value={nome} style="text-transform:uppercase" required/>
		</div>
		<div class="inputDiv">
			<label for="codigo" class="form-label">Código</label>
			<input type="text" class="form-control inputTag" id="codigo" autocomplete="off" maxlength="20"
			 bind:value={codigo} style="text-transform:uppercase" required/>
		</div>
		<div class="inputDiv">
			<label for="alcool" class="form-label">Graduação alcoólica(%)</label>
			<input type="number" class="form-control inputTag" id="alcool" maxlength="3" min="0.1"
			 autocomplete="off" step=".1" bind:value={grauAlcoolico} required/>
		</div>
		<div class="inputDiv">
			<label for="mapa" class="form-label">Registro no Mapa</label>
			<input type="text" class="form-control inputTag" id="mapa" autocomplete="off" maxlength="25"
			 bind:value={mapa} style="text-transform:uppercase" required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="textareaDiv">
			<label for="observacoes" class="form-label">Ingredientes</label>
			<textarea class="form-control" id="observacoes" bind:value={ingrediente} rows="3" maxlength="45" placeholder="Ingredientes da cerveja..." required></textarea>
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