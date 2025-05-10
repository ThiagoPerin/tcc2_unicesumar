<script>
	import { OpFetches } from "../../fetches/OpFetches";
	import { CadastroAtividadesCustomFetches } from "../../fetches/CadastroAtividadesCustomFetches";
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
    import CadastroAtividadesCustomTableRow from '../Tables/CadastroAtividadesCustomTableRow.svelte';
	const dispatch = createEventDispatcher();

	let url = window.location.href;
	let numOperacao = url.includes("?") ? decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) : null;
	let opAutomatica = numOperacao ? true : false;
	
	function close() {
		dispatch('close');
	}

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let nomeAtividade, inicio, fim, horarioExecucao, descricao;
	let insertResult = {}
	let showPopUpSucesso = false;
	let showPopUpErro = false;
	export let dataInicio;
	inicio = dataInicio ? (new Date(dataInicio)).toISOString().split('T')[0] : null;

	async function addRegister(e) {
		const data = {
			numOperacao: numOperacao,
			nomeAtividade: nomeAtividade,
			inicio: inicio,
			fim: fim,
			horarioExecucao: horarioExecucao,
			descricao: descricao,
		}
		e.preventDefault();
		insertResult = await CadastroAtividadesCustomFetches.addCadastroAtividadesCustom(data);
		if(insertResult.success) {
			reload();
		} else {
			showPopUpErro = true;
		}
	};

	async function reload() {
		showPopUpSucesso = true;
		nomeAtividade = null;
		inicio = null;
		fim = null;
		horarioExecucao = null;
		descricao = null;
		registros = await CadastroAtividadesCustomFetches.fetchCadastroAtividadesCustomData(opAutomatica, numOperacao);
		setTimeout(() => {
			showPopUpSucesso = false;
		}, 1000)
	}

	let registros = [];
	let opList = [];
	onMount(async () => {
		registros = await CadastroAtividadesCustomFetches.fetchCadastroAtividadesCustomData(opAutomatica, numOperacao);
		opList = await OpFetches.fetchOpData();
	});
</script>

<div class="fundoPopUpAviso">
	<div class="popUpAviso">
		<div id="fechar" on:click={close}><i class="fas fa-times"/></div>
		<div class="popUpTituloArea">
			<h2>Adicionar atividade customizada {opAutomatica ? `OP: ${numOperacao}` : ""}</h2>
		</div>
		<div class="popUpContentArea">
			<form on:submit={(e) => addRegister(e)} autocomplete="off">
				<div class="inputsArea">
					<div class="inputDiv">
						<label for="numOperacao" class="form-label">OP</label>
						{#if opAutomatica}
							<input type="number" class="form-control inputTag" id="numOperacao" bind:value={numOperacao} disabled/>
						{:else}
							<select class="form-select inputTag" placeholder="Selecionar tanque" id="numOperacao" bind:value={numOperacao} required>
								{#each opList as el (opList)}
									<option value="{el["NUM_OPERACAO"]}">{el["NUM_OPERACAO"]}</option>
								{/each}
							</select>
						{/if}
					</div>
					<div class="inputDiv">
						<label for="nomeAtividade" class="form-label">Nome</label>
						<input type="text" class="form-control inputTag" id="nomeAtividade" bind:value={nomeAtividade} required/>
					</div>
					<div class="inputDiv">
						<label for="inicio" class="form-label">Data Início</label>
						<input type="date" class="form-control inputTag" id="inicio" bind:value={inicio} required/>
					</div>
					<div class="inputDiv">
						<label for="fim" class="form-label">Data fim</label>
						<input type="date" class="form-control inputTag" id="fim" bind:value={fim}/>
					</div>
					<div class="inputDiv">
						<label for="horarioExecucao" class="form-label">Horário de execução</label>
						<input type="time" class="form-control inputTag" id="horarioExecucao" bind:value={horarioExecucao}/>
					</div>
				</div>
				<div class="inputsArea">
					<div class="textareaDiv">
						<label for="descricao" class="form-label">Descrição</label>
						<textarea class="form-control" id="descricao" bind:value={descricao} rows="3" maxlength="200" placeholder="Descrição da atividade..."></textarea>
					</div>
					<button type="submit" class="btn btn-success">Adicionar atividade</button>
				</div>
				<div class="areaTabela">
					<div class="tabela table-responsive">
						<table class="table table-hover table-striped">
							<thead>
								<tr>
									<th scope="col">OP</th>
									<th scope="col">Nome tividade</th>
									<th scope="col">Data Início</th>
									<th scope="col">Data fim</th>
									<th scope="col">Horário de execução</th>
									<th scope="col">Descrição</th>
									<th scope="col">Ações</th>
								</tr>
							</thead>
							<tbody id="corpoTabela">
								{#key registros}
									{#each registros as registro}
										<CadastroAtividadesCustomTableRow registro={registro} on:message={reload}/>
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
		position: fixed;
		min-height: 100vh;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
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

	.textareaDiv {
		width: 320px;
		max-width: 100%;
		margin: 5px;
	}

	textarea {
  		max-height: 150px;
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
		max-height: 200px;
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

	/* .inputTagNumber::-webkit-outer-spin-button,
	.inputTagNumber::-webkit-inner-spin-button {
    	-webkit-appearance: none;
    	margin: 0;
	} */
</style>
