<script>
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";
    import CervejaForm from "../components/Forms/CervejaForm.svelte";

	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	let lote = decodeURI(url.split("?")[1].split("&")[1].split("=")[1]) || "";

	const pageTitle = "CERVEJA";
	//caminho até a página atual, exceto página inicial.
	const pathToHere = [{label: "MENU PRODUÇÃO", link: "/production/menu"},
	{label: "VISUALIZAR RELATÓRIOS", link: "/production/reports"},
	{label: "APONTAMENTO E INSPEÇÃO", link: `/production/odp/menu?odp=${odp}&lote=${lote}`},
	];
</script>

<main>
	<NavbarAxon pageTitle={`OP: ${odp} | Lote: ${lote}`}/>
	<div class="screen">
		<div class="content">
			<CervejaForm/>
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
		height: 100%;
		width: 100%;
		display: flex;
		background-color: var(--main-bg);
		flex-direction: row;
		padding: 10px 20px 10px;
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
