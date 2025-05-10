<script>
	import { OpFetches } from "../../fetches/OpFetches";
	import { createEventDispatcher } from 'svelte';
	import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	const dispatch = createEventDispatcher();
	
	function close() {
		dispatch('close');
	}
	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}
	export let id, odp, lote;

	let odpNova = odp;
	let loteNovo = lote;
	let username;
	let insertResult = {}
	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let edited = false;

	async function alterOpInfo(e) {
		const data = {
			id: id,
			numOperacao: odp,
			lote: lote,
			numOperacaoNovo: odpNova,
			loteNovo: loteNovo,
			username: username,
		}
		e.preventDefault();
		insertResult = await OpFetches.editOpInfo(data);
		if(insertResult.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};

	function checkEdit() {
		edited = odp !== odpNova || lote !== loteNovo;
	}
</script>

<div class="fundoPopUpAviso">
	<div class="popUpAviso">
		<div class="popUpTituloArea">
			<h2>Alterar informações da OP: {odp} | lote: {lote}</h2>
		</div>
		<div class="popUpContentArea">
			<form on:submit={(e) => alterOpInfo(e)} autocomplete="off">
				<div class="inputsArea">
					<div class="inputDiv">
						<label for="op" class="form-label">OP</label>
						<input type="number" class="form-control inputTag inputTagNumber" id="op" bind:value={odpNova} on:input={checkEdit} required/>
					</div>
					<div class="inputDiv">
						<label for="lote" class="form-label">Lote</label>
						<input type="text" class="form-control inputTag" id="lote" bind:value={loteNovo} on:input={checkEdit} required/>
					</div>
					<div class="inputDiv">
						<label for="username" class="form-label">Usuário</label>
						<input type="text" class="form-control inputTag" id="username" bind:value={username} on:input={checkEdit} required/>
					</div>
				</div>
				<div class="popUpBtnArea">
					<button type="button" class="btn btn-danger" on:click={close}>Cancelar</button>
					{#if edited}
						<button type="submit" class="btn btn-success">Salvar Alterações</button>
					{:else}
						<button type="button" class="btn btn-secondary" disabled>Salvar Alterações</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>

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
	.fundoPopUpAviso {
		min-height: 100vh;
		height: fit-content;
		width: 100vw;
		top: 0;
		left: 0;
		position: fixed;
		z-index: 9999999999999;
		background-color: var(--default-black-lower-opacity);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: auto;
  	}

	.popUpAviso {
		height: fit-content;
		max-width: 45%;
		width: fit-content;
		background-color: var(--default-white);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-radius: 15px;
  	}

	.popUpAviso button {
		margin: 0px 10px;
	}

	h2 {
		text-align: center;
		font-size: 25px;
	}

	.popUpContentArea {
		height: fit-content;
		width: 100%;
	}

	form {
		position: relative;
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
		justify-content: center;
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

	.popUpBtnArea {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 10px 0px;
	}


	@media screen and (max-width: 480px) {
		.inputsArea {
			justify-content: center;
		}
	}

	@media screen and (max-width: 900px) {
		.popUpAviso {
			width: 50vw;
		}
		.popUpAviso button {
			margin: 8px 10px;
		}
	}


	.inputTagNumber::-webkit-outer-spin-button,
	.inputTagNumber::-webkit-inner-spin-button {
    	/* display: none; <- Crashes Chrome on hover */
    	-webkit-appearance: none;
    	margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
	}
</style>
