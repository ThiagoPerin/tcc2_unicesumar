<script>
	export let titulo = "Você tem certeza?";
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
	function confirm() {
		dispatch('confirmed');
	}
</script>

<div class="fundoPopUpAviso">
	<div class="popUpAviso">
		<div class="popUpTituloArea">
			<h2>{titulo}</h2>
		</div>
		<div class="popUpBtnArea">
			<button type="button" class="btn btn-danger" on:click={close}>Não</button>
			<button type="button" class="btn btn-success" on:click={confirm}>Sim</button>
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
		text-align: center;
  	}

	.popUpAviso {
		height: fit-content;
		width: 30%;
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

	@media screen and (max-width: 900px) {
		.popUpAviso {
			width: 50vw;
		}
		.popUpAviso button {
			margin: 8px 10px;
		}
	}
</style>
