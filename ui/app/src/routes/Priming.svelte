<script>
	import { onMount } from 'svelte';
    import Loader from "../components/Navigation/Loader.svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";
    import DefaultTitle from '../components/Cards/DefaultTitle.svelte';
    import PrimingForm from '../components/Forms/PrimingForm.svelte';
    import PrimingTableRow from '../components/Tables/PrimingTableRow.svelte';
    import NoRowsWarn from '../components/Navigation/NoRowsWarn.svelte';
    import { PrimingFetches } from '../fetches/PrimingFetches';

	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	let lote = decodeURI(url.split("?")[1].split("&")[1].split("=")[1]) || "";

	const pageTitle = "PRIMING";
	//caminho até a página atual, exceto página inicial.
	const pathToHere = [{label: "MENU PRODUÇÃO", link: "/production/menu"},
	{label: "VISUALIZAR RELATÓRIOS", link: "/production/reports"},
	{label: "APONTAMENTO E INSPEÇÃO", link: `/production/odp/menu?odp=${odp}&lote=${lote}`},
	];

	let loader = true;

	let registros = [];
	onMount(async () => {
		registros = await PrimingFetches.fetchPrimingData(odp);
		loader = false;
	});

	async function hanldeRowAction() {
		registros = await PrimingFetches.fetchPrimingData(odp);
	}
</script>

<main>
	<NavbarAxon pageTitle={`OP: ${odp} | Lote: ${lote}`}/>
	<div class="screen">
		<div class="content">
			<PrimingForm/>
			{#key registros}
			{#if registros.length > 0}
			<div class="areaTabela">
				<DefaultTitle titulo={`Registros`}/>
				<div class="tabela table-responsive">
					<table class="table table-hover table-striped">
						<thead class="preHeader">
							<tr>
								<th scope="col" colspan="3"></th>
								<th scope="col" colspan="3">Dextrose</th>
								<th scope="col" colspan="5">Levedura</th>
								<th scope="col" colspan="2"></th>
							</tr>
						</thead>
						<thead>
							<tr>
								<th scope="col">Data</th>
								<th scope="col">Volume Cerveja</th>
								<th scope="col">Tanque</th>
								<th scope="col">g/L</th>
								<th scope="col">Qtd.</th>
								<th scope="col">Água</th>
								<th scope="col">Nome</th>
								<th scope="col">Lote</th>
								<th scope="col">Validade</th>
								<th scope="col">g/L</th>
								<th scope="col">Qtd. pct.</th>
								<th scope="col">Responsável</th>
								<th scope="col">Ações</th>
							</tr>
						</thead>
						<tbody id="corpoTabela">
									{#each registros as registro}
										<PrimingTableRow registro={registro} on:message={hanldeRowAction}/>
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

	  .table .preHeader > tr > th { border: 1px solid #c5c5c5; }
</style>
