<script>
	export let msg = "Ainda não há registros."
</script>

<div class="aviso">
	<div class="bubble-1">
		<div class="inside-bubble bubble-2"/>
		<div class="inside-bubble bubble-3"/>
		<div class="inside-bubble bubble-4"/>
		<img src="/images/BeerTank.png" alt="Tanque de cerveja" class="tanque"/>
		<img src="/images/BeerBottle2.png" alt="Garrafa de cerveja" class="garrafa"/>
		<img src="/images/bolhas.png" alt="Bolhas de cerveja" class="bolhas"/>
	</div>
	<div class="titulo">{msg}</div>
</div>

<style>
	.aviso {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.titulo {
		font-family: sans-serif;
		margin: 10px 0px;
		padding: 0;
		font-size: 30px;
		font-weight: 800;
		background: linear-gradient(180deg, var(--beer-orange) 0%, var(--beer-dark-orange-gradient) 100%);
		background-clip: text;
		color: transparent;
		text-align: center;
		padding: 1%;
	}

	.bubble-1 {
		position: relative;
		aspect-ratio: 1/1;
		height: 230px;
		border-radius: 50%;
		box-shadow: -6px -1px 4px 0px var(--default-black)33;
		box-shadow: 6px 0px 4px 0px var(--default-black)33;
		background: linear-gradient(180deg, var(--beer-red-gradient) 0%, var(--beer-orange) 79.87%);
		z-index: 9;
	}
	.inside-bubble {
		position: absolute;
		height: 100%;
		width: 100%;
		border-radius: 50%;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto 0;
	}
	.bubble-2 {
		background: linear-gradient(0deg, var(--beer-dark-orange-gradient) 10.07%, rgba(3, 140, 107, 0) 89.93%);
		z-index: 99;
	}
	.bubble-3 {
		background: linear-gradient(90deg, var(--beer-orange) 10.07%, rgba(255, 38, 38, 0) 89.93%);
		z-index: 999;
	}
	.bubble-4 {
		background: linear-gradient(46.72deg, var(--beer-orange) 24.86%, var(--beer-dark-orange-gradient) 50.45%);
		box-shadow: 0px 4px 25px 0px var(--default-black) inset;
		box-shadow: 0px -4px 25px 0px var(--default-black) inset;
		z-index: 9999;
	}

	.tanque {
		position: absolute;
		bottom: 0;
		left: 35%;
		height: 95%;
  		transform: scaleX(-1);
		z-index: 99999;
		transition: all .5s ease;
	}
	.garrafa {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto 0;
		right: 50%;
		height: 60%;
  		transform: scaleX(-1);
		z-index: 99999;
		transition: all .5s ease;
	}
	.bolhas {
		position: absolute;
		bottom: -90px;
		right: 50%;
		height: 80%;
  		transform: scaleX(-1);
		z-index: 999999;
		transition: all .5s ease;
	}

	.bubble-1:hover {
		cursor: url('/images/cerveja-cursor.png'), auto;
	}
	.bubble-1:hover .tanque {
		transform: scaleX(-1) translate(-16px, -15px);
	}
	.bubble-1:hover .garrafa {
		transform: scaleX(-1) translate(-12px, 8px);
	}
	.bubble-1:hover .bolhas {
		transform: scaleX(-1) translate(4px, -12px);
	}
</style>