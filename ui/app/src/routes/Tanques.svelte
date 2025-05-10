<script>
	const pageTitle = "TANQUES";
	import {flip} from 'svelte/animate';
	import {fade} from 'svelte/transition';
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";
    import TanqueCard from "../components/Cards/TanqueCard.svelte";
	import { onMount } from 'svelte';
    import NoRowsWarn from "../components/Navigation/NoRowsWarn.svelte";
    import PopUpTanques from "../components/Cards/PopUpTanques.svelte";
    import SearchBtn from "../components/Buttons/SearchBtn.svelte";
	import { TanqueFetches } from "../fetches/TanqueFetches";

	let popUpTanques = false;

	async function hanldePopUpTanques(eventType) {
		popUpTanques = eventType;
		if(!eventType) {
			registrosFull = await TanqueFetches.fetchTanqueDashboard();
			registros = registrosFull;
		}
	}

	function handleSearch(event){
		let search = event.detail.text
		registros = registrosFull.filter(el => {
			if(
			(el["PRODUTO"] && (el["PRODUTO"].toLowerCase()).includes(search.toLowerCase())) ||
			(el["OP_ATUAL"] && (el["OP_ATUAL"].toString()).includes(search)) ||
			(el["NUM_TANQUE"] && (el["NUM_TANQUE"].toString()).includes(search)) ||
			(el["LOTE"] && (el["LOTE"].toLowerCase()).includes(search))){
				 return el
			}
		})
	}

	let registrosFull = [];
	let registros = [];
	onMount(async () => {
		registrosFull = await TanqueFetches.fetchTanqueDashboard();
		registros = registrosFull
	});
</script>

<main>
	<NavbarAxon pageTitle={pageTitle}/>
	<div class="screen">
		<div class="content">
			<div class="filterArea">
				<PageNavigation page={pageTitle} position={"static"}/>
				<div class="buttonsArea">
					<SearchBtn on:message={handleSearch}/>
					<button type="button" class="btn btn-success cadastroBtn" on:click={() => hanldePopUpTanques(true)}>Cadastro de Tanques</button>
				</div>
			</div>
			<div class="areaTanques">
				{#if registros.length > 0}
					{#each registros as registro (registros)}
						<div class="card-wrapper" animate:flip="{{ delay: 0, duration: 700 }}" transition:fade="{{ delay: 0, duration: 300 }}">
							<TanqueCard tanqueInfo={registro}/>
						</div>
					{/each}
				{:else}
					<NoRowsWarn msg={"Ainda não há dados sobre os tanques"}/>
				{/if}
			</div>
		</div>
	</div>

	{#key popUpTanques}
		{#if popUpTanques}
			<PopUpTanques on:close={() => hanldePopUpTanques(false)}/>
		{/if}
	{/key}
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
		flex-direction: row;
		align-items: center;
		justify-content: center;
		z-index: 999;
		flex-wrap: wrap;
		position: relative;
	}

	.filterArea {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: relative;
		flex-wrap: wrap;
	}

	.buttonsArea {
		height: fit-content;
		width: fit-content;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.cadastroBtn {
		margin: 5px 10px;
	}

	.areaTanques {
		height: calc(100% - 60px);
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		z-index: 9999;
		position: relative;
		flex-wrap: wrap;
		overflow-y: auto;
		border-top: 1px solid #b3b3b3a8;
	}

	@media screen and (max-width: 580px) {
		.areaTanques {
			height: calc(100% - 120px);
		}
	}
</style>
