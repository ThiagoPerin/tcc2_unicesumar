<script>
	const pageTitle = "MENU PRODUÇÃO";
    import MenuCardBtn from "../components/Buttons/MenuCardBtn.svelte";
	import MenuCardLink from "../components/Buttons/MenuCardLink.svelte";
    import FindOpPopUp from "../components/Cards/FindOPPopUp.svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";

	let popUp = false
	function handlePopUP(event) {
		popUp = event;
	}

</script>

<main>
	<NavbarAxon pageTitle={"MENU PRODUÇÃO"}/>
	<div class="screen">
		<div class="content">
			<MenuCardLink titulo={"Nova ordem de produção"} destino={"/production/odp/new"} image={"new.svg"}/>
			<MenuCardBtn titulo={"Apontamento e inspeção"} image={"search.svg"} on:message={() => handlePopUP(true)}/>
			<MenuCardLink titulo={"Visualizar ordens"} destino={"/production/reports"} image={"document.svg"}/>
			<MenuCardLink titulo={"Calendário"} destino={"/production/calendar/geral"} image={"calendar.svg"}/>
			<MenuCardLink titulo={"Gantt"} destino={"/production/gantt"} image={"new.svg"}/>
			{#key popUp}
				{#if popUp}
					<FindOpPopUp on:message={() => handlePopUP(false)}/>
				{/if}
			{/key}
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
