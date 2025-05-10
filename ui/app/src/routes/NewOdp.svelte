<script>
    import NewOdpForm from "../components/Forms/NewODPForm.svelte";
	const pageTitle = "NOVA OP";
		//caminho até a página atual, exceto página inicial.
	const pathToHere = [{label: "MENU PRODUÇÃO", link: "/production/menu"}];
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";

</script>

<main>
	<NavbarAxon pageTitle={"NOVA OP"}/>
	<div class="screen">
		<div class="content">
			<NewOdpForm/>
			<PageNavigation pathToHere={pathToHere} page={pageTitle}/>
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
		padding: 10px 20px;
		align-items: flex-start;
	}

	.content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		z-index: 999;
		position: relative;
		flex-wrap: wrap;
		overflow-y: auto;
		padding-right: 5px;
	}
	
</style>
