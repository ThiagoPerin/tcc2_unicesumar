<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let msg = "Algo deu errado!";

	function close() {
		dispatch('message', {
		text: 'fechaPopUp'
		});
	}
</script>

<div class="fundoPopUpAviso">
	<div class="popUpAviso">
		<div class="popUpTituloArea">
			<h2>{msg}</h2>
		</div>
		<div class="popUpBtnArea">
			<button type="button" class="btn btn-danger" on:click={close}>Tentar novamente</button>
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
		max-width: 75%;
		background-color: var(--default-white);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
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
		text-align: center;
	}

	  .popUpBtnArea {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 10px 0px;
	}

	.popUpAviso button {
		margin: 0px 10px;
	}
</style>