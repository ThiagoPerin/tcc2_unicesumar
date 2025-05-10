<script>
	
</script>

<div class="content">
	<img src="/images/lupulo-shadow.png" alt="Axon" id="lupulo-shadow">
	<div class="area-warn">
		<img src="/images/Axon Beer - branco fundo transparente.png" alt="Axon" id="logoAxon">
		<div class="aviso">Ooops... Acesso Negado!</div>
		<div class="area-btns">
			<a href="https://axontechnology.freshdesk.com/">
				<button type="button" class="btn btn-primary">Suporte Axon</button>
			</a>
			<a href="/logout">
				<button type="button" class="btn btn-danger">Sair</button>
			</a>
		</div>
	</div>
</div>

<style>
	.content {
		position: relative;
		height: 100vh;
		width: 100vw;
		background: radial-gradient(circle at 24.1% 68.8%, #666666 0%, var(--main-color) 99.4%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 60px;
	}

	.area-warn {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column; 
		justify-content: space-around;
		align-items: center;
		z-index: 9999;
	}

	.aviso {
		font-size: 34px;
		color: var(--default-white);
		font-weight: lighter;
		text-align: center;
	}

	.area-btns {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	a {
		margin: 10px;
	}

	#logoAxon {
		width: 33%;
		min-width: 200px;
	}

	#lupulo-shadow {
		height: 100%;
		position: absolute;
		z-index: 999;
		opacity: 0.05;
	}
</style>