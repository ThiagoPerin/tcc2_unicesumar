<script>
	const pageTitle = "CADASTROS";
	import MenuCardLink from "../components/Buttons/MenuCardLink.svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";
</script>

<main>
	<NavbarAxon pageTitle={pageTitle}/>
	<div class="screen">
		<div class="content">
			<MenuCardLink titulo={"Cadastro de Cervejas"} destino={"/cadastro/cerveja"} image={"cervejaCopo.svg"}/>
			<MenuCardLink titulo={"Cadastro de Atividades"} destino={"/cadastro/atividades"} image={"task.svg"}/>
			<PageNavigation page={pageTitle}/>
		</div>
	</div>
</main>

<style>
	main {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: hidden;
	}

	.screen {
		height: calc(100% - 70px);
		width: 100%;
		display: flex;
		flex-direction: row;
		background-color: var(--main-bg);
		padding: 10px 20px 0px;
		align-items: flex-start;
	}

	.content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		z-index: 999;
		position: relative;
		flex-wrap: wrap;
		overflow-y: auto;
	}
	
</style>
