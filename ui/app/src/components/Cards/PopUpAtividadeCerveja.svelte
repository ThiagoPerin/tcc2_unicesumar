<script>
	import { CadastroAtividadesDefaultFetches } from '../../fetches/CadastroAtividadesDefaultFetches';
	import { CadastroAtividadesCervejaFetches } from '../../fetches/CadastroAtividadesCervejaFetches';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
    import CadastroAtividadesCervejaTableRow from '../Tables/CadastroAtividadesCervejaTableRow.svelte';
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	export let cerveja;
	export let codigoCerveja;

	let atividade, codigoAtividade, diasExecutar, duracaoAtividade, horarioExecucao;
	let insertResult = {}
	let showPopUpSucesso = false;
	let showPopUpErro = false;

	async function addRegister(e) {
		const data = {
			cerveja: cerveja,
			codigoCerveja: codigoCerveja,
			atividade: atividade,
			codigoAtividade: codigoAtividade,
		}
		e.preventDefault();
		insertResult = await CadastroAtividadesCervejaFetches.addCadastroAtividadesCerveja(data);
		if(insertResult.success) {
			reload();
		} else {
			showPopUpErro = true;
		}
	};

	async function reload() {
		showPopUpSucesso = true;
		atividade = null;
		codigoAtividade = null;
		diasExecutar = null;
		duracaoAtividade = null;
		horarioExecucao = null;
		atividadesCerveja = await CadastroAtividadesCervejaFetches.fetchCadastroAtividadesCervejaData(codigoCerveja);
		setTimeout(() => {
			showPopUpSucesso = false;
		}, 1000)
	}
	
		function atividadeSelecionada() {
			for(const el of atividadesPadrao) {
				if(atividade === el["ATIVIDADE"]) {
					codigoAtividade = el["COD_ATIVIDADE"];
					diasExecutar = el["DIAS_EXECUTAR"];
					duracaoAtividade = el["DURACAO"];
					horarioExecucao = el["HORARIO_EXECUCAO"];
				}
			}
		}

	let atividadesPadrao = [];
	let atividadesCerveja = [];
	onMount(async () => {
		atividadesCerveja = await CadastroAtividadesCervejaFetches.fetchCadastroAtividadesCervejaData(codigoCerveja);
		atividadesPadrao = await CadastroAtividadesDefaultFetches.fetchCadastroAtividadesDefaultData();
	});
</script>

<div class="fundoPopUpAviso">
	<div class="popUpAviso">
		<div id="fechar" on:click={close}><i class="fas fa-times"/></div>
		<div class="popUpTituloArea">
			<h2>Atividades padrão para {cerveja}</h2>
		</div>
		<div class="popUpContentArea">
			<form on:submit={(e) => addRegister(e)} autocomplete="off">
				<div class="inputsArea">
					<div class="inputDiv">
						<label for="atividade" class="form-label">Atividade</label>
						<select class="form-select inputTag" id="atividade" bind:value={atividade} on:change={atividadeSelecionada} required>
							{#each atividadesPadrao as el (atividadesPadrao)}
								<option value="{el["ATIVIDADE"]}">{el["ATIVIDADE"]}</option>
							{/each}
						</select>
					</div>
					<div class="inputDiv">
						<label for="codigoAtividade" class="form-label">Código da atividade</label>
						<input type="number" class="form-control inputTag" id="codigoAtividade" bind:value={codigoAtividade} disabled/>
					</div>
					<div class="inputDiv">
						<label for="diasExecutar" class="form-label">Início da atividade (dias)</label>
						<input type="number" class="form-control inputTag inputTagNumber" id="diasExecutar" bind:value={diasExecutar} disabled/>
					</div>
					<div class="inputDiv">
						<label for="duracaoAtividade" class="form-label">Duração (dias)</label>
						<input type="number" class="form-control inputTag inputTagNumber" id="duracaoAtividade" bind:value={duracaoAtividade} disabled/>
					</div>
					<div class="inputDiv">
						<label for="horarioExecucao" class="form-label">Horário de execução</label>
						<input type="time" class="form-control inputTag" id="horarioExecucao" bind:value={horarioExecucao} disabled/>
					</div>
				</div>
				<div class="inputsArea">
					<button type="submit" class="btn btn-success">Adicionar atividade</button>
				</div>
				<div class="areaTabela">
					<div class="tabela table-responsive">
						<table class="table table-hover table-striped">
							<thead>
								<tr>
									<th scope="col">Código da atividade</th>
									<th scope="col">Atividade</th>
									<th scope="col">Ações</th>
								</tr>
							</thead>
							<tbody id="corpoTabela">
								{#key atividadesCerveja}
									{#each atividadesCerveja as registro}
										<CadastroAtividadesCervejaTableRow registro={registro} on:message={reload}/>
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
		/* max-height: 70%; */
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
