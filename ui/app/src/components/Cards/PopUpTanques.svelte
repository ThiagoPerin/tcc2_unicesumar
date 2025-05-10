<script>
	import { TanqueFetches } from "../../fetches/TanqueFetches";
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
    import TanquesTableRow from '../Tables/TanquesTableRow.svelte';
	const dispatch = createEventDispatcher();
	
	function close() {
		dispatch('close');
	}

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let numTanque, capacidade;
	let insertResult = {}
	let showPopUpSucesso = false;
	let showPopUpErro = false;

	async function addRegister(e) {
		const data = {
			numTanque: numTanque,
			capacidade: capacidade,
		}
		e.preventDefault();
		insertResult = await TanqueFetches.addTanqueRegister(data);
		if(insertResult.success) {
			reload();
		} else {
			showPopUpErro = true;
		}
	};

	async function reload() {
		showPopUpSucesso = true;
		numTanque = null;
		capacidade = null;
		registros = await TanqueFetches.fetchTanqueData();
		setTimeout(() => {
			showPopUpSucesso = false;
		}, 1000)
	}

	let registros = [];
	onMount(async () => {
		registros = await TanqueFetches.fetchTanqueData();
	});
</script>

<div class="fundoPopUpAviso">
	<div class="popUpAviso">
		<div id="fechar" on:click={close}><i class="fas fa-times"/></div>
		<div class="popUpTituloArea">
			<h2>Cadastro de Tanques</h2>
		</div>
		<div class="popUpContentArea">
			<form on:submit={(e) => addRegister(e)} autocomplete="off">
				<div class="inputsArea">
					<div class="inputDiv">
						<label for="numTanque" class="form-label">Número do tanque</label>
						<input type="number" class="form-control inputTag inputTagNumber" id="numTanque" bind:value={numTanque} required/>
					</div>
					<div class="inputDiv">
						<label for="capacidade" class="form-label">Capacidade (L)</label>
						<input type="number" class="form-control inputTag" id="capacidade" bind:value={capacidade} required/>
					</div>
					<button type="submit" class="btn btn-success">Adicionar tanque</button>
				</div>
				<div class="areaTabela">
					<div class="tabela table-responsive">
						<table class="table table-hover table-striped">
							<thead>
								<tr>
									<th scope="col">Número do Tanque</th>
									<th scope="col">Capacidade</th>
									<th scope="col">Ações</th>
								</tr>
							</thead>
							<tbody id="corpoTabela">
								{#key registros}
									{#each registros as registro}
										<TanquesTableRow registro={registro} on:message={reload}/>
									{/each}
								{/key}
							</tbody>
						</table>
					</div>
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
		height: 100vh;
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
		position: relative;
		height: fit-content;
		max-width: 80%;
		min-width: 40%;
		width: fit-content;
		background-color: var(--default-white);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 10px 20px;
		border-radius: 15px;
  	}

	#fechar {
		position: absolute;
		top: 0px;
		right: 10px;
		font-size: 30px;
		cursor: pointer;
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
		align-items: flex-end;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.inputDiv {
		min-width: 200px;
		max-width: 200px;
		margin: 5px;
	}

	button {
		margin: 5px;
	}

	.popUpContentArea {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		overflow: auto;
		padding: 10px 0px;
	}

	.areaTabela {
		height: fit-content;
		width: 100%;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 2px solid rgb(197, 197, 197);
		background-color: var(--default-white);
		border-radius: 10px;
		margin: 20px 0px;
	}

	.tabela {
    	width: 100%;
    	height:fit-content;
		max-height: 300px;
  	}

  	table {
    	width:100%;
		max-height: 100px;
		overflow-y: auto;
  	}

  	thead {
		position: sticky;
		top: 0px;
		z-index: 9999;
		background-color: var(--default-white);
  	}

  	tr {
    	height: fit-content;
    	text-align: center;
		vertical-align: middle;
  	}


	@media screen and (max-width: 520px) {
		.inputsArea {
			justify-content: center;
		}
	}

	.inputTagNumber::-webkit-outer-spin-button,
	.inputTagNumber::-webkit-inner-spin-button {
    	-webkit-appearance: none;
    	margin: 0;
	}
</style>
