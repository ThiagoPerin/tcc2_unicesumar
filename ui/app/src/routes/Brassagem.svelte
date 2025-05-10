<script>
	import { onMount } from 'svelte';
    import Loader from "../components/Navigation/Loader.svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";
    import DefaultTitle from '../components/Cards/DefaultTitle.svelte';
    import BrassagemForm from '../components/Forms/BrassagemForm.svelte';
    import BrassagemTableRow from '../components/Tables/BrassagemTableRow.svelte';
    import PreparacaoMalteForm from '../components/Forms/PreparacaoMalteForm.svelte';
    import PreparacaoMalteTableRow from '../components/Tables/PreparacaoMalteTableRow.svelte';
    import NoRowsWarn from '../components/Navigation/NoRowsWarn.svelte';
	import {BrassagemFetches} from '../fetches/BrassagemFetches'
	import {PreparacaoMaltesFetches} from '../fetches/PreparacaoMaltesFetches'

	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	let lote = decodeURI(url.split("?")[1].split("&")[1].split("=")[1]) || "";

	const pageTitle = "BRASSAGEM";
	//caminho até a página atual, exceto página inicial.
	const pathToHere = [{label: "MENU PRODUÇÃO", link: "/production/menu"},
	{label: "VISUALIZAR RELATÓRIOS", link: "/production/reports"},
	{label: "APONTAMENTO E INSPEÇÃO", link: `/production/odp/menu?odp=${odp}&lote=${lote}`},
	];

	let loader = true;

	let registros = [];
	let registrosMalte = [];
	onMount(async () => {
		registros = await BrassagemFetches.fetchBrassagemData(odp);
		registrosMalte = await PreparacaoMaltesFetches.fetchPreparacaoMaltesData(odp);
		loader = false;
	});

	async function hanldeRowAction() {
		registros = await BrassagemFetches.fetchBrassagemData(odp);
		registrosMalte = await PreparacaoMaltesFetches.fetchPreparacaoMaltesData(odp);
	}
</script>

<main>
	<NavbarAxon pageTitle={`OP: ${odp} | Lote: ${lote}`}/>
	<div class="screen">
		<div class="content">
			<BrassagemForm/>
			{#key registros}
			{#if registros.length > 0}
			<div class="areaTabela">
				<DefaultTitle titulo={`Registros`}/>
				<div class="tabela table-responsive">
					<table class="table table-hover table-striped">
						<thead class="preHeader">
							<tr>
								<th scope="col" colspan="4">Dados Malte pilsen</th>
								<th scope="col" colspan="2">Ajuste Moagem</th>
								<th scope="col" colspan="6">Mash</th>
								<th scope="col" colspan="5">Pré-Boil</th>
								<th scope="col" colspan="7">Fervura</th>
								<th scope="col" colspan="3">Transferência</th>
								<th scope="col" colspan="3"></th>
							</tr>
						</thead>
						<thead>
							<tr>
								<th scope="col">Data envase saca</th>
								<th scope="col">Turno</th>
								<th scope="col">Lote</th>
								<th scope="col">Validade</th>
								<th scope="col">Pos. Superior</th>
								<th scope="col">Pos. Inferior</th>
								<th scope="col">Dia</th>
								<th scope="col">Hr. Mash in</th>
								<th scope="col">Dens. Primário</th>
								<th scope="col">pH Lab</th>
								<th scope="col">Dens. Fin. de Sparge</th>
								<th scope="col">Hr. Início mash out</th>
								<th scope="col">Volume</th>
								<th scope="col">Temp. Medição de Vol.</th>
								<th scope="col">Peso da tina</th>
								<th scope="col">Dens. Fábrica</th>
								<th scope="col">Dens. Lab</th>
								<th scope="col">Hr. Início</th>
								<th scope="col">Medição/Correção pH</th>
								<th scope="col">Volume final</th>
								<th scope="col">Peso da tina final</th>
								<th scope="col">Trub</th>
								<th scope="col">Dens. Final fáb.</th>
								<th scope="col">Dens. Final lab.</th>
								<th scope="col">Temperatura</th>
								<th scope="col">Volume trasnferido</th>
								<th scope="col">Hora fim</th>
								<th scope="col">KEG's p/ Transf. Levedura</th>
								<th scope="col">Resnponsável</th>
								<th scope="col">Ações</th>
							</tr>
						</thead>
						<tbody id="corpoTabela">
									{#each registros as registro}
										<BrassagemTableRow registro={registro} on:message={hanldeRowAction}/>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
						{:else}
							<NoRowsWarn/>
						{/if}
					{/key}

			<PreparacaoMalteForm/>
			{#key registrosMalte}
			{#if registrosMalte.length > 0}
			<div class="areaTabela">
				<DefaultTitle titulo={`Registros`}/>
				<div class="tabela table-responsive">
					<table class="table table-hover table-striped">
						<thead>
							<tr>
								<th scope="col">Separação</th>
								<th scope="col">Conferência 1</th>
								<th scope="col">Conferência 2</th>
								<th scope="col">Moagem</th>
								<th scope="col">Ações</th>
							</tr>
						</thead>
						<tbody id="corpoTabela">
									{#each registrosMalte as registro}
										<PreparacaoMalteTableRow registro={registro} on:message={hanldeRowAction}/>
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
		border: 2px solid #c5c5c5;
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

	th {
		min-width: 130px;
	}

	  .table .preHeader > tr > th { border: 1px solid #c5c5c5; }
</style>
