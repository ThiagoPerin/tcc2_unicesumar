<script>
	import { onMount } from 'svelte';
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
	import Loader from "../components/Navigation/Loader.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";
    import DefaultTitle from '../components/Cards/DefaultTitle.svelte';
    import ChartDonut from '../components/Charts/ChartDonut.svelte';
    import ChartLineBar from '../components/Charts/ChartLineBar.svelte';
    import PopUpDetailsEnvase from '../components/Cards/PopUpDetailsEnvase.svelte';
    import {DashboardFetches} from '../fetches/DashboardFetches';

	function createChartBarOPData() {
		opBarLabels = [];
		opBarSeries = [{name: "N° de OP's", type: "bar", data: []}];
		for(let registro of barOp) {
			opBarLabels.push(registro["DT_EMISSAO"])
			opBarSeries[0].data.push(registro["NUM_OP_DIA"])
		}
	}

	const pageTitle = "DASHBOARDS";
	let loader = true;

	let opBarSeries = [];
	let opBarLabels = [];
	let opDonutSeries = [];
	let opDonutLabels = [];
	let lataDonutSeries = [];
	let lataDonutLabels = ["Latas refugo", "Latas lab", "Latas boas"];
	let lataDonutColors = ['#f83e3e', '#3e79f8', '#3ef85d'];

	let donutOp = [];
	let donutLatas = [];
	let barOp = [];
	onMount(async () => {
		donutOp = await DashboardFetches.fetchDashboardDonutOp();
		for(const registro of donutOp) {
			opDonutSeries.push(registro["QTD_OP"]);
			opDonutLabels.push(registro["PRODUTO"]);
		};
		donutLatas = await DashboardFetches.fetchDashboardDonutLatas();
		lataDonutSeries = Object.values(donutLatas[0]).map(Number);
		barOp = await DashboardFetches.fetchDashboardBarOp();
		createChartBarOPData();
		loader = false;
	});

	let showPopUpItem = false;
	function handlePopUPItemEnvase(eventType) {
		showPopUpItem = eventType;
	}

</script>

<main>
	<NavbarAxon pageTitle={"DASHBOARDS"}/>
	<div class="screen">
		<div class="content">
			{#key loader}
				{#if loader}
					<Loader/>
				{:else}
					<div class="areaCharts">
						<DefaultTitle titulo={"Dashboards"}/>
						{#key barOp}
							<div class="chartsBig">
								{#if barOp.length > 0}
									<ChartLineBar series={opBarSeries} labels={opBarLabels} tituloYaxis={"OP's por dia"} titulo={"OP's emitidas"}/>
								{:else}
									<div class="aviso">OP's emitidas - <strong>não há dados</strong></div>
								{/if}
							</div>
						{/key}
						{#key donutOp}
							<div class="chartsSmall">
								{#if donutOp.length > 0}
								<ChartDonut series={opDonutSeries} labels={opDonutLabels} titulo={"OP's criadas por produto"} idInPage={0}/>
								{:else}
									<div class="aviso">OP's criadas por produto - <strong>não há dados</strong></div>
								{/if}
							</div>
						{/key}
						{#key lataDonutSeries}
							<div class="chartsSmall">
								{#if lataDonutSeries.length > 0}
								<ChartDonut series={lataDonutSeries} labels={lataDonutLabels} colors={lataDonutColors} titulo={"Envase de latas"} idInPage={1}/>
								<button on:click={() => handlePopUPItemEnvase(true)} class="details-envase btn btn-info">Mais detalhes</button>
								{:else}
									<div class="aviso"><strong>Envase de latas - <strong>não há dados</strong></div>
								{/if}
							</div>
						{/key}
					</div>
				{/if}
			{/key}
			<PageNavigation page={pageTitle}/>
		</div>
	</div>
</main>

	{#key showPopUpItem}
		{#if showPopUpItem}
			<PopUpDetailsEnvase on:message={() => handlePopUPItemEnvase(false)}/>
		{/if}
	{/key}

<style>
	main {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.screen {
		height: 100%;
		width: 100%;
		display: flex;
		background-color: var(--main-bg);
		flex-direction: column;
		padding: 0px 0px 0px 10px;
		align-items: flex-start;
		overflow-y: hidden;
	}

	.content {
		height: fit-content;
		min-height: 100%;
		width: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		z-index: 999;
		position: relative;
		overflow-y: auto;
		padding-right: 5px;
	}

	.areaCharts {
		width: 100%;
		height: fit-content;
		margin-top: 45px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.chartsBig {
		min-height: fit-content;
		height: 400px;
		width: calc(100% - 10px);
		margin: 5px;
		display: flex;
		margin-bottom: 50px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.chartsSmall {
		position: relative;
		min-height: fit-content;
		height: 400px;
		width: calc(50% - 10px);
		margin: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.aviso {
		height: fit-content;
		width: fit-content;
		background-color: white;
		font-weight: lighter;
		text-align: center;
		padding: 5px;
		border-radius: 10px;
		font-size: 20px;
	}
	
	.details-envase{
		position: absolute;
		bottom: 5px;
		right: 5px;		
	}

	@media screen and (max-width: 1080px){
		.chartsSmall {
		min-height: fit-content;
		height: 400px;
		width: calc(100% - 10px);
		margin: 5px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	}
	
</style>
