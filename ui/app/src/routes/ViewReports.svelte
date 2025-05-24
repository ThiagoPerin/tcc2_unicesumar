<script>
	const pageTitle = "VISUALIZAR RELATÓRIOS";
	//caminho até a página atual, exceto página inicial.
	const pathToHere = [{label: "MENU PRODUÇÃO", link: "/production/menu"}];
	let viewMode = window.innerWidth <= 585 ? "grid" : localStorage.getItem("viewModeGrid") || "list";
	function changeViewMode() {
		viewMode = viewMode === "list" ? "grid" : "list";
		localStorage.setItem("viewModeGrid", viewMode);
	}
	window.addEventListener("resize", () => {
		viewMode = window.innerWidth <= 585 ? "grid" : localStorage.getItem("viewModeGrid")
	})
    import SearchBtn from "../components/Buttons/SearchBtn.svelte";
    import ReportCardHorizontal from "../components/Cards/ReportCardHorizontal.svelte";
    import ReportCardVertical from "../components/Cards/ReportCardVertical.svelte";
    import Loader from "../components/Navigation/Loader.svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";
	import { onMount } from 'svelte';  
    import NoInfoWarnBig from "../components/Navigation/NoInfoWarnBig.svelte";
	import { OpFetches } from "../fetches/OpFetches";

	let loader = true;
	let activesFilter = true;
	let search = "";
	let odpList = [];
	let odpListFull = [];
	function handleSearch(event){
			if(event){ 
				search = event.detail.text
			};
			odpList = odpListFull.filter(el => {
				if((el["PRODUTO"]).toLowerCase().includes(search.toLowerCase()) ||
				(el["NUM_OPERACAO"].toString()).includes(search) ||
				(el["LOTE"].toLowerCase()).includes(search)) {
					return el
				}
			})
			if(activesFilter) {
				odpList = odpList.filter(el => {
				if(Number(el["STATUS"]) === 0) {
					return el
				}
			})
		}
	};

	onMount(async () => {
		odpListFull = await OpFetches.fetchOpData();
		odpList = odpListFull;
		handleSearch();
		loader = false;
	});
</script>

<main>
	<NavbarAxon pageTitle={pageTitle}/>
	<div class="screen">
		<div class="content">
			<div class="areaReports">
				<div class="searchArea">
					<div class="filtros">
						<SearchBtn on:message={handleSearch}/>
						<div class="form-check checkItem">
							<input class="form-check-input" type="checkbox" value="" id="defaultCheck1"  bind:checked={activesFilter} on:change={() => handleSearch(null)}>
							<label class="form-check-label" for="defaultCheck1">
							  Apenas OP's ativas
							</label>
						</div>
						<a href="/#/production/odp/new">
							<button type="button" class="btn btn-success"><i class="fas fa-plus"/> Nova OP</button>
						</a>
					</div>
					<div class="viewOptions">
						{#key viewMode}
							{#if viewMode === "grid"}
								<button type="button" class="btn btn-primary btn-sm" disabled>
									<i class="fa-solid fa-table-cells-large"></i>
								</button>
								<button type="button" class="btn btn-outline-primary btn-sm" on:click={changeViewMode}>
									<i class="fa-solid fa-bars"></i>
								</button>
							{:else}
								<button type="button" class="btn btn-outline-primary btn-sm" on:click={changeViewMode}>
									<i class="fa-solid fa-table-cells-large"></i>
								</button>
								<button type="button" class="btn btn-primary btn-sm" disabled>
									<i class="fa-solid fa-bars"></i>
								</button>
							{/if}
						{/key}
					</div>
				</div>
				<div class="reports {viewMode === "grid" ? "reports-column" : "reports-row"}">
					{#if odpList.length > 0}
						{#key viewMode}
							{#if viewMode === "grid"}
								{#key odpList}
									{#each odpList as odp}
										<ReportCardVertical {odp} />
									{/each}
								{/key}
							{:else}
								{#key odpList}
									{#each odpList as odp}
										<ReportCardHorizontal {odp} />
									{/each}
								{/key}
							{/if}
						{/key}
					{:else}
						<NoInfoWarnBig msg={"Parece que ainda não há OP's criadas."}/>
					{/if}
					{#key loader}
						{#if loader}
							<Loader/>
						{/if}
					{/key}
				</div>
			</div>
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
		padding-right: 5px;
	}

	.areaReports {
		margin-top: 45px;
		height: calc(100% - 45px);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.searchArea {
		height: fit-content;
		padding: 15px 0px 5px;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #b3b3b3a8;
	}

	.filtros {
		height: fit-content;
		width: fit-content;
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.checkItem {
		margin: 0px 15px;
	}
	
	.viewOptions {
		display: flex;
		flex-direction: row;
		height: fit-content;
		width: fit-content;
		gap: 5px;
	}

	.reports {
		height: 100%;
		width: 100%;
		min-height: fit-content;
		overflow-y: auto;
		padding: 5px;
	}

	.reports-row {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.reports-column {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-around;
	}


	@media screen and (max-width: 585px) {
		.viewOptions {
			display: none;
		}
	}
</style>
