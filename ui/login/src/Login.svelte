<script>

</script>

<div class="content">
	<div class="areaForm">
		<form id="form_login" action="/login" method="POST">
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

	<div class="areaBrands">
		<img src="/images/bodebrownWhiteLogo.png" alt="Bodebrown" id="logoBode">
		<img src="/images/axonIDhorizontalwhite.png" alt="Axon" id="logoAxon">
	</div>
</div>

<style>
	.content {
		height: 100vh;
		width: 100vw;
		background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 60px;
	}

	.areaForm {
		height: 100%;
		width: 40%;
		padding: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}

	form {
		width: 100%;
		height: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.inputDiv {
		margin: 10px 0px;
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.inputDiv button {
		width: 100%;
	}
	.inputDiv input {
		width: 100%;
		/* border: none; */
	}
	.inputDiv Label {
		color: #fff;
		font-size: 20px;
	}

	.areaBrands {
		height: 100%;
		width: 60%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}
	#logoBode {
		width: 80%;
	}

	#logoAxon {
		width: 70%;
	}

		@media screen and (max-width: 800px){
		.content {
			height: 100vh;
				width: 100vw;
				background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
				display: flex;
				flex-direction: column-reverse;
				justify-content: center;
				align-items: center;
				padding: 60px;
		}

		.areaBrands {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	.areaForm {
		height: fit-content;
		width: 100%;
		padding: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		/* background-color: darkred; */
	}
	}
</style>