<script>
	import { onMount } from 'svelte';
    import Loader from "../components/Navigation/Loader.svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";
    import DefaultTitle from '../components/Cards/DefaultTitle.svelte';
    import MonitoramentoForm from '../components/Forms/MonitoramentoForm.svelte';
    import MonitoramentoTableRow from '../components/Tables/MonitoramentoTableRow.svelte';
    import ChartLineBar from '../components/Charts/ChartLineBar.svelte';
    import NoRowsWarn from '../components/Navigation/NoRowsWarn.svelte';
    import {MonitoramentoFetches} from '../fetches/MonitoramentoFetches';

	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	let lote = decodeURI(url.split("?")[1].split("&")[1].split("=")[1]) || "";

	const pageTitle = "MONITORAMENTO DE EXTRATO E TEMPERATURA";
	//caminho até a página atual, exceto página inicial.
	const pathToHere = [{label: "MENU PRODUÇÃO", link: "/production/menu"},
	{label: "VISUALIZAR RELATÓRIOS", link: "/production/reports"},
	{label: "APONTAMENTO E INSPEÇÃO", link: `/production/odp/menu?odp=${odp}&lote=${lote}`},
	];

	function createChartData() {
		chartLabels = [];
		chartSeries = [{name: "Extrato", type: "bar", data: []}, {name: "Temperatura", type: "line", data: []}];
		for(let registro of registros) {
			chartLabels.push(`${registro["DATA"].split("T")[0]}T${registro["HORA"]}.000Z`)
			chartSeries[0].data.push(registro["EXTRATO"])
			chartSeries[1].data.push(registro["TEMPERATURA"])
		}
	}

	let chartLabels = [];
	let chartSeries = [{name: "Extrato", type: "bar", data: []}, {name: "Temperatura", type: "line", data: []}];
	let loader = false; 

	let registros = [];
	onMount(async () => {
		registros = await MonitoramentoFetches.fetchMonitoramentoData(odp);
		createChartData()
		loader = false;
	});

	async function hanldeRowAction() {
		registros = await MonitoramentoFetches.fetchMonitoramentoData(odp);
		createChartData()
	}
</script>

<main>
	<NavbarAxon pageTitle={`OP: ${odp} | Lote: ${lote}`}/>
	<div class="screen">
		<div class="content">
			<MonitoramentoForm/>
			{#key registros}
			{#if registros.length > 0}
				<div class="areaTabela">
					<DefaultTitle titulo={`Registros`}/>
					<div class="tabela table-responsive">
						<table class="table table-hover table-striped">
							<thead>
								<tr>
									<th scope="col">Data</th>
									<th scope="col">Hora</th>
									<th scope="col">Extrato</th>
									<th scope="col">Temperatura</th>
									<th scope="col">Alter. T</th>
									<th scope="col">Ações</th>
								</tr>
							</thead>
							<tbody id="corpoTabela">
										{#each registros as registro}
											<MonitoramentoTableRow registro={registro} on:message={hanldeRowAction}/>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
						<ChartLineBar tituloYaxis={"Extrato (Sg)"} tituloYaxisOpposite={"Temperatura (°C)"}
						series={chartSeries} labels={chartLabels}/>
					{:else}
						<NoRowsWarn/>
					{/if}
				{/key}
			{#key loader}
				{#if loader}
					<Loader/>
				{/if}
			{/key}
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

	.areaTabela {
		height: fit-content;
		width: 100%;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 2px solid rgb(197, 197, 197);
		background-color: var(--default-white);
		border-radius: 10px;
		margin-bottom: 20px
	}

	.tabela {
    	width: 100%;
    	height:fit-content;
		max-height: 400px;
  	}

  	table {
    	width:100%;
		max-height: 100px;
		overflow-y: auto;
  	}

  	thead {
		position: sticky;
		top: 0px;
		z-index: 9999;
		background-color: var(--default-white);
  	}

  	tr {
    	height: fit-content;
    	text-align: center;
		vertical-align: middle;
  	}
</style>
