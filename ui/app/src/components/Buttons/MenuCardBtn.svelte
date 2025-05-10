<script>
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let titulo = "";
	export let image = "";


	function sendAction() {
		dispatch('message', {
			popUp: true,
		});
	}
</script>
	<div class="cardBox" on:click={sendAction} in:fly={{ y: 200, duration: 600 }}>
		<div class="blackCardArea">
			<div class="blackCard">
				<img src="/images/lupulo-shadow.png" alt="Logo Axon - Beer" class="logoAxonBeer" />
				<img src="/images/icons/{image}" alt="Icone do Botão" class="icone" />
			</div>
		</div>
		<div class="titulo">{titulo}</div>
	</div>

<style>
	.cardBox {
		color: var(--default-black);
		margin: 60px 10px;
		cursor: pointer;
		height: 250px;
		width: 250px;
		border-radius: 10px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		background-color: var(--default-white);
		box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.25);
	}

	.blackCardArea {
		height: 50%;
		width: 100%;
		position: relative;
	}

	.blackCard {
		height: 180px;
		width: 180px;
		border-radius: 12px;
		position: absolute;
		bottom: 0;
		left: calc(50% - 90px);
        background-color: var(--main-color);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		transition: all .3s ease;
	}

	.logoAxonBeer {
		height: 90%;
		position: absolute;
		z-index: 999;
		opacity: 0.1;
		transition: all .3s ease;
	}

	.icone {
		color: var(--default-white);
		opacity: 1;
		z-index: 9999;
		max-width: 66%;
		max-height: 50%;
		transition: all .3s ease;
	}

	.cardBox:hover .icone {
		transform: scale(1.25) rotate(-90deg);
	}
	.cardBox:hover .logoAxonBeer {
		transform: rotate(-90deg);
	}
	.cardBox:hover .blackCard {
		transform: rotate(90deg);
	}

	.titulo {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 20px 0px;
		font-size: 25px;
		text-align: center;
	}
</style>
