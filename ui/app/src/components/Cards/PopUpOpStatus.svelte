<script>
	import Svelecte from 'svelecte';
	export let op;
	export let statusAtual;

	let selection = null;
	let novoStatus;
	const possibleStatus = [
		{status: "Em produção", value: "0"},
		{status: "Finalizado", value: "1"},
		{status: "Cancelado", value: "2"},
	];

	let optionsSelectOp = []
	for(let el of possibleStatus) {
		if(Number(el.value) !== Number(statusAtual)) optionsSelectOp.push({value: el.value, label: `${el.status}`})
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
	function confirm() {
		dispatch('confirmed', { text: novoStatus });
	}
</script>

<div class="fundoPopUpAviso">
	<div class="popUpAviso">
		<div class="popUpTituloArea">
			<h2>Mudança de status OP: <strong>{op}</strong></h2>
		</div>
		<div class="areaSelecao">
			{#key optionsSelectOp}
				<Svelecte options={optionsSelectOp} 
					inputId="statusOp"
					bind:readSelection={selection}
					autocomplete="off"
					bind:value={novoStatus}
					placeholder="Selecione o novo status"
					required/>	
			{/key}
		</div>
		<div class="popUpBtnArea">
			{#key novoStatus}
				<button type="button" class="btn btn-danger" on:click={close}>Cancelar</button>
				{#if novoStatus}
					<button type="button" class="btn btn-success" on:click={confirm}>Confirmar</button>
				{:else}
					<button type="button" class="btn btn-secondary" disabled>Confirmar</button>
				{/if}
			{/key}
		</div>
	</div>
</div>

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
		width:fit-content;
		max-width: 500px;
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

	.areaSelecao {
		height: fit-content;
		width: 100%;
		padding: 15px 10px;
	}

	h2 {
		font-weight: lighter;
	}

	:global(.svelecte-control) {
		min-width: 100%;
		max-width: 100%;
  	}
</style>