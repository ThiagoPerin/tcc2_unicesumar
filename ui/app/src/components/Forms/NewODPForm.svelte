<script>
	import Svelecte from 'svelecte';
	import { onMount } from 'svelte';
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import { OpFetches } from "../../fetches/OpFetches"
	import { CadastroCervejaFetches } from "../../fetches/CadastroCervejaFetches"

	let showPopUpErro = false;
	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}
	let showPopUpSucesso = false;

	let numOperacao;
	let lote;
	let dataEmissao = (new Date()).toISOString().split('T')[0];
	let produto;
	let codigoProduto;
	let tanquePrimario;
	let capacidadeLote;
	let responsavel;
	let cliente;
	let observacoes;

	let itemsData = {}
	async function cadastraOP(e) {
		e.preventDefault();
		const data = {
   			numOperacao: numOperacao,
    		lote: lote,
    		dataEmissao: dataEmissao,
    		produto: produto,
    		codigoProduto: codigoProduto,
    		tanquePrimario: tanquePrimario,
    		capacidadeLote: capacidadeLote,
    		responsavel: responsavel,
    		cliente: cliente,
    		observacoes: observacoes
  		};
		itemsData = await OpFetches.addOp(data);
		if(itemsData.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};

	let itemsDataCerveja = []
	let selection = null;

	let optionsSelectOp = [];
	onMount(async () => {
		itemsDataCerveja = await CadastroCervejaFetches.fetchCadastroCervejaData();
		optionsSelectOp = itemsDataCerveja.map((el, index) => {
				return {value: el["DESCRICAO"], label: `${el["DESCRICAO"]}`}
		})
	});


	function cancel() {
		numOperacao = undefined;
		lote = undefined;
		dataEmissao = (new Date()).toISOString().split('T')[0];
		produto = undefined;
		tanquePrimario = undefined;
		capacidadeLote = undefined;
		responsavel = undefined;
		cliente = undefined;
		observacoes = undefined;
	}

	function informaCodigo() {
		for(const el of itemsDataCerveja) {
			if(el["DESCRICAO"] === produto) {
				codigoProduto = el["COD_CERVEJA"]
			}
		}
	}
</script>
<form on:submit={(e) => cadastraOP(e)}>
	<DefaultTitle titulo={"Nova ordem de produção"}/>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="numOp" class="form-label">Nº operação</label>
			<input type="number" class="form-control inputTag" id="numOp" bind:value={numOperacao} placeholder="0000" required/>
		</div>
		<div class="inputDiv">
			<label for="lote" class="form-label">Nº lote</label>
			<input type="text" class="form-control inputTag" id="lote" bind:value={lote} placeholder="000000/0000" required/>
		</div>
		<div class="inputDiv">
			<label for="dataEmissao" class="form-label">Data de emissão</label>
			<input type="date" class="form-control inputTag" id="dataEmissao" bind:value={dataEmissao} required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="produto" class="form-label">Produto</label>
			{#key optionsSelectOp}
			<Svelecte options={optionsSelectOp} 
			inputId="name"
			bind:readSelection={selection}
			autocomplete="off"
			bind:value={produto}
			placeholder="Selecione o item"
			on:change={informaCodigo}
			required/>	
			{/key}
		</div>
		<div class="inputDiv">
			<label for="codigoProduto" class="form-label">Código do produto</label>
			<input type="text" class="form-control inputTag" id="codigoProduto" bind:value={codigoProduto} disabled/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="tanquePrimario" class="form-label">Tanque primário</label>
			<input type="number" class="form-control inputTag" id="tanquePrimario" bind:value={tanquePrimario} required/>
		</div>
		<div class="inputDiv">
			<label for="capacidadeLote" class="form-label">Capac. total do lote (L)</label>
			<input type="number" class="form-control inputTag" id="capacidadeLote" bind:value={capacidadeLote} placeholder="0000" required/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="responsavel" class="form-label">Responsável pela OP</label>
			<input type="text" class="form-control inputTag" id="responsavel" bind:value={responsavel} required/>
		</div>
		<div class="inputDiv">
			<label for="cliente" class="form-label">Cliente</label>
			<input type="text" class="form-control inputTag" id="cliente" bind:value={cliente}/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="textareaDiv">
			<label for="observacoes" class="form-label">Observações</label>
			<textarea class="form-control" id="observacoes" bind:value={observacoes} rows="3" maxlength="200" placeholder="detalhes da ordem de produção..."></textarea>
		</div>
	</div>
	<div class="inputsArea">
		<button type="button" class="btn btn-outline-danger" on:click={cancel}>Cancelar</button>
		<button type="submit" class="btn btn-success">Confirmar</button>
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

	:global(.svelecte-control) {
		width: 100%;		
		min-width: fit-content;
		max-width: 300px;
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