<script>
	import Svelecte from 'svelecte';
	import { onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';
    import PopUpErro from './PopUpErro.svelte';
	import { OpFetches } from "../../fetches/OpFetches";
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('message', {
			text: 'fechaPopUp'
		});
	}

	let selection = null;
	let selectedValue;

	let showPopUpErro = false;
	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let itemsData = {}

	let optionsSelectOp = [];
	onMount(async () => {
		itemsData = await OpFetches.fetchOpData();
		optionsSelectOp = itemsData.map((el, index) => {
				return {value: `${el["NUM_OPERACAO"]}&${el["LOTE"]}`, label: `0P: ${el["NUM_OPERACAO"]} | LOTE: ${el["LOTE"]}`}
		})
	});
</script>

<div class="fundoPopUp">
	<div class="popUp">
		<div class="popUpTituloArea">
			<!-- <h2>Cadastrar item</h2> -->
			<div id="fechar" on:click={close}>
				<i class="fas fa-times" id="fechar"></i>
			</div>
		</div>
		<div class="inputsArea">
			<div class="inputDiv">
					<label for="svelecte" class="form-label">Operação</label>
					{#key optionsSelectOp}
						<Svelecte options={optionsSelectOp} 
							inputId="name"
							bind:readSelection={selection}
							autocomplete="off"
							bind:value={selectedValue}
							placeholder="Selecione o item"
							required
							/>	
					{/key}
			</div>
			{#key selection}
				{#if selection}
					<a href="/#/production/odp/menu?odp={selectedValue.split("&")[0]}&lote={selectedValue.split("&")[1]}"><button type="button" class="btn btn-primary">ir para OP</button></a>
				{:else}
					<button type="button" class="btn btn-secondary">ir para OP</button>
				{/if}
			{/key}
		</div>
	</div>
</div>


{#key showPopUpErro}
	{#if showPopUpErro}
	<PopUpErro msg={itemsData.msg} on:message={() => handlePopUpErro(false)}/>
	{/if}
{/key}

<style>
	.fundoPopUp {
		min-height: 100vh;
		height: fit-content;
		width: 100vw;
		top: 0;
		left: 0;
		position: fixed;
		z-index: 999999999999;
		background-color: var(--default-black-lower-opacity);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: auto;
  	}

  	.popUp {
		height: fit-content;
		width: fit-content;
		background-color: var(--default-white);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 20px;
		border-radius: 15px;
  	}
	
	.popUpTituloArea {
		position: relative;
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#fechar {
		position: absolute;
		font-size: 30px;
		top: -5px;
		right: -5px;
		color: var(--ligther-black);
	}

	#fechar:hover {
		cursor: pointer;
	}

	.inputsArea {
		height: fit-content;
		width: fit-content;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: center;
		flex-wrap: wrap;
	}

	.inputDiv {
		min-width: 280px;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0px 5px;
	}

	.inputDiv :global(.svelecte-control) {
		width: 100%;
  	}	
</style>