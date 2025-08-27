<div class="content">
	<div class="areaForm">
		<img src="/images/lupulo-branco.png" alt="Axon" id="logo">
		<form id="form_login" action="/auth/login" method="POST">
			<div class="inputDiv form-group">
				<label for="user" class="form-label">Usuário</label>
				<input type="text" name="user" class="form-control bg-dark text-white" id="user" placeholder="Digite seu usuário..." required>
			</div>
			<div class="inputDiv">
				<label for="password" class="form-label">Senha</label>
				<input type="password" name="password" class="form-control bg-dark text-white" id="password" placeholder="Digite sua senha..." required>
			</div>
			<div class="inputDiv">
				<button type="submit" class="btn btn-outline-success">Entrar</button>
			</div>
		</form>
	</div>
</div>

<style>
	.content {
		height: 100vh;
		width: 100vw;
		background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 10px;
	}

	.areaForm {
		height: 100%;
		width: 100%;
		padding: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}

	#logo {
		width: 100%;
		max-width: 200px;
	}

	form {
		width: 100%;
		max-width: 300px;
		height: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.inputDiv {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		color: #fff;
		font-size: 20px;
	}

	.inputDiv input, .inputDiv button {
		width: 100%;
	}
</style>