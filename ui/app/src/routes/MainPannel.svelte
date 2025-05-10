<script>
	import MenuCardLink from "../components/Buttons/MenuCardLink.svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
</script>

<main>
	<NavbarAxon/>
	<div class="screen">
		<div class="content">
			<MenuCardLink titulo={"Produção"} destino={"/production/menu"} image={"industry.svg"}/>
			<MenuCardLink titulo={"Cadastros"} destino={"/cadastro/menu"} image={"singup.svg"}/>
			<!-- <MenuCardLink titulo={"Tagmaker"} destino={"/tagmaker"} image={"etiqueta.svg"}/>  -->
			<MenuCardLink titulo={"Dashboards"} destino={"/dashboards"} image={"dashs.svg"}/>
			<MenuCardLink titulo={"Tanques"} destino={"/tanques"} image={"tanques.svg"}/>
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
