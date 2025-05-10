<script>
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {CadastroAtividadesDefaultFetches} from '../../fetches/CadastroAtividadesDefaultFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let nomeAtividade, codigoAtividade, diasExecutar, duracaoAtividade, horarioExecucao;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addRegistro(e) {
		const data = {
			codigoAtividade: codigoAtividade,
			nomeAtividade: nomeAtividade,
			diasExecutar: diasExecutar,
			duracaoAtividade: duracaoAtividade,
			horarioExecucao: horarioExecucao,
		}
		e.preventDefault();
		insertResult = await CadastroAtividadesDefaultFetches.addCadastroAtividadesDefault(data);
		if(insertResult.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};
</script>
<form on:submit={(e) => addRegistro(e)}>
	<DefaultTitle titulo={`Cadastro de Atividades`}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="codigoAtividade" class="form-label">Código da atividade</label>
			<input type="number" class="form-control inputTag" id="codigoAtividade" bind:value={codigoAtividade} required/>
		</div>
		<div class="inputDiv">
			<label for="nomeAtividade" class="form-label">Nome</label>
			<input type="text" class="form-control inputTag" id="nomeAtividade" bind:value={nomeAtividade} style="text-transform:uppercase" required/>
		</div>
		<div class="inputDiv">
			<label for="diasExecutar" class="form-label">Início da atividade (dias)</label>
			<input type="number" class="form-control inputTag inputTagNumber" id="diasExecutar" bind:value={diasExecutar} required/>
		</div>
		<div class="inputDiv">
			<label for="duracaoAtividade" class="form-label">Duração (dias)</label>
			<input type="number" class="form-control inputTag inputTagNumber" id="duracaoAtividade" bind:value={duracaoAtividade} required/>
		</div>
		<div class="inputDiv">
			<label for="horarioExecucao" class="form-label">Horário de execução</label>
			<input type="time" class="form-control inputTag" id="horarioExecucao" bind:value={horarioExecucao}/>
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

	.inputTagNumber::-webkit-outer-spin-button,
	.inputTagNumber::-webkit-inner-spin-button {
    	-webkit-appearance: none;
    	margin: 0;
	}
</style>