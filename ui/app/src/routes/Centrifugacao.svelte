<script>
	import { onMount } from 'svelte';
    import Loader from "../components/Navigation/Loader.svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";
    import DefaultTitle from '../components/Cards/DefaultTitle.svelte';
    import CentrifugacaoForm from '../components/Forms/CentrifugacaoForm.svelte';
    import CentrifugacaoTableRow from '../components/Tables/CentrifugacaoTableRow.svelte';
    import CentrifugacaoResumoTableRow from '../components/Tables/CentrifugacaoResumoTableRow.svelte';
    import NoRowsWarn from '../components/Navigation/NoRowsWarn.svelte';
    import CentrifugacaoResumoForm from '../components/Forms/CentrifugacaoResumoForm.svelte';
	import {CentrifugacaoFetches} from '../fetches/CentrifugacaoFetches';
	import {CentrifugacaoResumoFetches} from '../fetches/CentrifugacaoResumoFetches';

	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	let lote = decodeURI(url.split("?")[1].split("&")[1].split("=")[1]) || "";

	const pageTitle = "CENTRIFUGAÇÃO";
	//caminho até a página atual, exceto página inicial.
	const pathToHere = [{label: "MENU PRODUÇÃO", link: "/production/menu"},
	{label: "VISUALIZAR RELATÓRIOS", link: "/production/reports"},
	{label: "APONTAMENTO E INSPEÇÃO", link: `/production/odp/menu?odp=${odp}&lote=${lote}`},
	];

	// function calculaResumo(registroOriginal) {
	// 	let ultimo = 0, primeiro = 0, horaInicio, resumo = [];
	// 	for(let [i, registro] of registroOriginal.entries()) {
	// 		if(primeiro === ultimo) {
	// 			horaInicio = registro["HORA"];
	// 			primeiro = i;
	// 		}
	// 		if(registro["FIM"] == 1) {
	// 			resumo.push({
	// 				data: registro["DATA"],deTanque: registro["DE_TANQUE"],
	// 				paraTanque: registro["PARA_TANQUE"],volumeInicial: "-- // --",
	// 				horaInicio: horaInicio,horaFim: registro["HORA"],
	// 				hlH: registro["HLH"],ebc: registro["EBC"],
	// 				totalHl: registro["ACUMULADO_HL"],media: "-- // --",
	// 				responsavel: registro["RESPONSAVEL"],
	// 			})
	// 			primeiro = i + 1;
	// 		}
	// 		ultimo++;
	// 	}
	// 	return resumo;
	// }

	let loader = true;

	let registrosGeral = [];
	let registrosResumo = [];
	onMount(async () => {
		registrosGeral = await CentrifugacaoFetches.fetchCentrifugacaoData(odp);
		registrosResumo = await CentrifugacaoResumoFetches.fetchCentrifugacaoResumoData(odp);
		// registrosResumo = calculaResumo(registrosGeral)
		loader = false;
	});

	async function hanldeRowAction() {
		registrosGeral = await CentrifugacaoFetches.fetchCentrifugacaoData(odp);
		registrosResumo = await CentrifugacaoResumoFetches.fetchCentrifugacaoResumoData(odp);
		// registrosResumo = calculaResumo(registrosGeral)
	}
</script>

<main>
	<NavbarAxon pageTitle={`OP: ${odp} | Lote: ${lote}`}/>
	<div class="screen">
		<div class="content">
			{#key registrosGeral}
				<CentrifugacaoForm registros={registrosGeral}/>
			{/key}
			{#key registrosGeral}
			{#if registrosGeral.length > 0}
			<div class="areaTabela">
				<DefaultTitle titulo={`Registros`}/>
				<div class="tabela table-responsive">
					<table class="table table-hover table-striped">
						<thead>
							<tr>
								<th scope="col">Data</th>
								<th scope="col">De tanque</th>
								<th scope="col">Para tanque</th>
								<th scope="col">Temperatura</th>
								<th scope="col">Hora</th>
								<th scope="col">EBC</th>
								<th scope="col">hL/h</th>
								<th scope="col">Acumulado hL</th>
								<th scope="col">Observações</th>
								<th scope="col">Fim</th>
								<th scope="col">Responsável</th>
								<th scope="col">Ações</th>
							</tr>
						</thead>
						<tbody id="corpoTabela">
									{#each registrosGeral as registro}
										<CentrifugacaoTableRow registro={registro} on:message={hanldeRowAction}/>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
						{:else}
							<NoRowsWarn/>
						{/if}
					{/key}
			<CentrifugacaoResumoForm/>
			{#key registrosResumo}
			{#if registrosResumo.length > 0}
			<div class="areaTabela">
				<DefaultTitle titulo={`Resumo de centrifugação`}/>
				<div class="tabela table-responsive">
					<table class="table table-hover table-striped">
						<thead>
							<tr>
								<th scope="col">Data</th>
								<th scope="col">De tanque</th>
								<th scope="col">Para tanque</th>
								<th scope="col">Volume inicial</th>
								<th scope="col">Hora início</th>
								<th scope="col">Hora Fim</th>
								<th scope="col">EBC</th>
								<th scope="col">hL/h</th>
								<th scope="col">Total hL</th>
								<th scope="col">Media</th>
								<th scope="col">Responsável</th>
								<th scope="col">Ações</th>
							</tr>
						</thead>
						<tbody id="corpoTabela">
									{#each registrosResumo as registro}
										<CentrifugacaoResumoTableRow registro={registro}  on:message={hanldeRowAction}/>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
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
		margin: 10px 0px;
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
