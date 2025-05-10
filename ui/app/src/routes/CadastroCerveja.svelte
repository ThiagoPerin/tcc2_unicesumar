<script>
	import { onMount } from 'svelte';
    import Loader from "../components/Navigation/Loader.svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";
    import DefaultTitle from '../components/Cards/DefaultTitle.svelte';
    import CadastroCervejaForm from '../components/Forms/CadastroCervejaForm.svelte';
    import CadastroCervejaTableRow from '../components/Tables/CadastroCervejaTableRow.svelte';
    import NoRowsWarn from '../components/Navigation/NoRowsWarn.svelte';
	import {CadastroCervejaFetches} from '../fetches/CadastroCervejaFetches';

	const pageTitle = "CADASTRO DE CERVEJAS";
	const pathToHere = [{label: "CADASTROS", link: "/cadastro/menu"}];

	let loader = false;

	let registros = [];
	onMount(async () => {
		registros = await CadastroCervejaFetches.fetchCadastroCervejaData();
		loader = false;
	});

	async function hanldeRowAction() {
		registros = await CadastroCervejaFetches.fetchCadastroCervejaData();
	}
</script>

<main>
	<NavbarAxon pageTitle={"CADASTRO DE CERVEJAS"}/>
	<div class="screen">
		<div class="content">
			<CadastroCervejaForm/>
			{#key registros}
			{#if registros.length > 0}
			<div class="areaTabela">
				<DefaultTitle titulo={`Registros`}/>
				<div class="tabela table-responsive">
					<table class="table table-hover table-striped">
						<thead>
							<tr>
								<th scope="col">Nome</th>
								<th scope="col">Código</th>
								<th scope="col">Grau alcoólico</th>
								<th scope="col">Registro no mapa</th>
								<th scope="col">Ingredientes</th>
								<th scope="col">Atividades padrão</th>
								<th scope="col">Ações</th>
							</tr>
						</thead>
						<tbody id="corpoTabela">
							{#each registros as registro}
								<CadastroCervejaTableRow registro={registro} on:message={hanldeRowAction}/>
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
			<PageNavigation page={pageTitle} pathToHere={pathToHere}/>
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
		margin-bottom: 1.5%;
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
