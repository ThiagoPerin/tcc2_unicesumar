<script>
	import { fly } from 'svelte/transition';
	export let titulo = "";
	export let destino = "";
	export let image = "";
	export let status = 0;
	export let dadoUnico = false;

	function statusColor() {
		if(dadoUnico) {
			return "unico"
		} else if (Boolean(Number(status))) {
			return "ativo"
		} else {
			return
		}
	}
</script>
<a href="/#{destino}" in:fly={{ y: 100, duration: 600 }}>
	<div class="cardBox">
		<div class="blackCard {statusColor()}">
			<img src="/images/icons/{image}" alt="Bodebrown" class="icone" />
		</div>
		<div class="titulo">{titulo}</div>
	</div>
</a>

<style>
	a {
		text-decoration: none;
		color: var(--default-black);
		margin: 20px 10px auto;
		margin-left: 35px;
	}

	.cardBox {
		height: 80px;
		width: 300px;
		border-radius: 10px;
		padding: 10px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: var(--default-white);
		box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.25);
		position: relative;
		transition: all .3s ease;
	}

	.blackCard {
		height: 70px;
		width: 70px;
		border-radius: 12px;
		position: absolute;
		bottom: calc(50% - 35px);
		left: -30px;
		background-color: var(--default-black);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		transition: all .3s ease;
	}

	.icone {
		opacity: 1;
		z-index: 9999;
		height: 40px;
		transition: all .3s ease;
	}

	a:hover .cardBox {
		transform: scale(1.05);
	}

	a:hover .icone {
		transform: scale(1.10) rotate(-90deg);
	}

	a:hover .blackCard {
		transform: rotate(90deg);
	} 

	.ativo {
		background-color: var(--active-button);
	}
	.unico {
		background-color: var(--unique-button);
	}

	.titulo {
		height: 100%;
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 18px;
		text-align: center;
		font-weight: 400;
	}
</style>
