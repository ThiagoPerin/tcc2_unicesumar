<script>
	import { CadastroCervejaFetches } from "../fetches/CadastroCervejaFetches";
	const pageTitle = "TAGMAKER";
	const refresh = localStorage.getItem("refreshedInicial");
	if(!refresh || refresh === "fazer") {
		localStorage.setItem("refreshedInicial", "naoFazer");
		window.location.reload()
	} else {
		localStorage.setItem("refreshedInicial", "fazer");
	}

	// @ts-ignore
	import Svelecte from 'svelecte';
	import { onMount } from "svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import BodebrownTag from "../components/Cards/BodebrownTag.svelte";
    import ItemListPopUp from '../components/Cards/ItemListPopUp.svelte';
    import PageNavigation from '../components/Navigation/PageNavigation.svelte';

	let optionsSelectNome = []
	let optionsSelectCodigo = []
	let selection = null;
	let itemsData = [];
	let prentendedData = {
			id: [],
			nome: [],
			codigo: [],
			ingrediente: [],
			grauAlcoolico: [],
			mapa: [],
	}
	let nome = "";
	let codigo = "";
	let quantidade = "";
	let lote = "";
	let validade = "";
	let grauAlcoolico = "";
	let mapa = "";
	let ingrediente = "";
	let selectType = "nome"
	let blockPrint = true;

	function checkBlock() {
		if(nome && codigo && quantidade && lote && validade) {
		if(nome != "" && codigo != "" && quantidade != "" && lote != "" && validade != "") {
				blockPrint = false;
			} else {
				blockPrint = true
			}
		} else {
			blockPrint = true
		}
	}


	onMount(async () => {
		itemsData = await CadastroCervejaFetches.fetchCadastroCervejaData();
		const dataMap = itemsData.map(el => {
			prentendedData.id.push(el.id)
			prentendedData.nome.push(el["DESCRICAO"])
			prentendedData.ingrediente.push(el["INGREDIENTE"])
			prentendedData.codigo.push(el["COD_CERVEJA"])
			prentendedData.grauAlcoolico.push(el["GRAU_ALCOOLICO"])
			prentendedData.mapa.push(el["REGISTRO_MAPA"])
		})

		optionsSelectNome = prentendedData.nome.map((el, index) => {
				return {value: el, label: `${prentendedData.codigo[index]} | ${el}`}
		})
	});

	function changeBeer() {
		let index;
		index = prentendedData.nome.indexOf(nome);
		codigo = prentendedData.codigo[index];
		grauAlcoolico = Number(prentendedData.grauAlcoolico[index]).toFixed(1);
		ingrediente = (prentendedData.ingrediente[index]).toUpperCase().replace("CONTÉM GLÚTEN", "<strong>CONTÉM GLÚTEN</strong>");
		mapa = (prentendedData.mapa[index]).toUpperCase();
	}

	let showPopUpItem = false;
	function handlePopUPItem(eventType) {
		showPopUpItem = eventType;
	}

	function goToPrint() {
		window.location.href = `/app/#/tagprinter?nome=${nome}&grauAlcoolico=${grauAlcoolico}&
		ingrediente=${ingrediente}&lote=${lote}&validade=${validade}&qtd=${quantidade}&mapa=${mapa}`
	}

</script>

<main>
	<NavbarAxon pageTitle={"TAGMAKER"}/>
	<div class="screen">
		<div class="content">
			<div class="areaOptionsBtns">
				<button type="button" class="btn btn-primary" id="newItemBtn" on:click={() => handlePopUPItem(true)}>Visualizar itens</button>
				<a href="/#/cadastro/cerveja"><button type="button" class="btn btn-success" >Cadastrar Cerveja</button></a>
			</div>
			<div class="areaTagBuilding">
				<div class="areaTitulo">
					<h2>INSIRA OS DADOS DA ETIQUETA</h2>
				</div>
				<form>
				<div class="areaInputs">
						<div class="inputDiv">
							<label for="svelecte" class="form-label">Produto</label>
							{#key optionsSelectNome}
								<Svelecte options={optionsSelectNome} 
									inputId="name"
									bind:readSelection={selection}
									autocomplete="off"
									placeholder="Selecione o item"
									bind:value={nome}
									on:change={changeBeer}
									required/>	
							{/key}
						</div>
					<div class="inputDiv">
						<label for="qtd" class="form-label">Quantidade (L)</label>
						<input type="number" class="form-control inputTag" id="qtd"  bind:value={quantidade} on:input={checkBlock} maxlength="4" autocomplete="off" required/>
					</div>
					<div class="inputDiv">
						<label for="lote" class="form-label">Lote</label>
						<input type="text" class="form-control inputTag" id="lote" bind:value={lote} on:input={checkBlock}
						maxlength="11" autocomplete="off" placeholder="000000/0000" pattern={"[0-9]{6}/[0-9]{4}"} required
						title="lote deve ter o formato 000000/0000"/>
					</div>
					<div class="inputDiv">
						<label for="validade" class="form-label">Validade</label>
						<input type="date" class="form-control inputTag" id="validade" bind:value={validade} on:input={checkBlock} autocomplete="off" required/>
					</div>
					{#key blockPrint}
						{#if !blockPrint}
							<div class="inputDiv">
								<button type="submit" class="btn btn-success" on:click={goToPrint}>Imprimir</button>
							</div>
						{:else}
							<div class="inputDiv">
								<button type="submit" class="btn btn-secondary">Imprimir</button>
							</div>
						{/if}
					{/key}
				</div>
			</form>
			</div>
			<div class="areaEtiqueta">
				<div class="areaTitulo">
					<h2>PRÉVIA</h2>
				</div>
				<div class="areaTag">
					{#key lote}
					{#key quantidade}
					{#key validade}
					{#key nome}
						<BodebrownTag {lote} {quantidade} {validade}
						nome={nome || ""} grauAlcoolico={grauAlcoolico || ""}
						ingrediente={ingrediente || ""} mapa={mapa}
						/>
					{/key}
					{/key}
					{/key}
					{/key}
				</div>
			</div>
			<PageNavigation page={pageTitle}/>
		</div>
	</div>

	{#key showPopUpItem}
		{#if showPopUpItem}
			<ItemListPopUp on:message={() => handlePopUPItem(false)}/>
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
		height: 100%;
		width: 100%;
		display: flex;
		background-color: var(--main-bg);
		flex-direction: row;
		padding: 10px 20px;
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
	}

	.areaTagBuilding {
		height: 100%;
		width: 30%;
		display: flex;
		flex-direction: column;
		justify-content:center;
		align-items: center;
		/* overflow: auto; */
	}

	.areaInputs {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content:flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		overflow-y: auto;
		padding: 10px 5px;
		overflow-x: hidden;
	}

	form {
		height: fit-content;
		width: 100%;
	}

	.inputTag {
		min-width: 270px;
	}
	
	.inputDiv {
		margin: 10px;
		max-width: 100%;
		padding-right: 5px;
	}
	
	:global(.svelecte-control) {
		width: 100%;		
		min-width: 370px;
		max-width: 100%;
  	}	

	.areaEtiqueta {
		height: 100%;
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content:center;
		align-items: center;
		overflow: auto;
	}

	.areaTitulo {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.areaTitulo h2{
		color: var(--ligther-black);
		font-size: 25px;
		margin: 0;
		padding: 0;
	}

	.areaTag {
		height: fit-content;
		width: 100%;
		width: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 20px;
	}


	.areaOptionsBtns {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: fit-content;
		width: fit-content;
	}
	.areaOptionsBtns button {
		margin: 0px 5px;		
	}

	@media screen and (max-width: 1040px) and (min-width:600.0001px){
		.screen {
			height: 100%;
			width: 100%;
			display: flex;
			background-color: var(--main-bg);
			flex-direction: row;
			padding: 10px 10px;
			align-items: flex-start;
		}

		.content {
			height: 100%;
			max-height: fit-content;
			width: 100%;
			max-width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			z-index: 999;
			overflow: auto;
			padding: 20px 0px;

		}

		.areaTagBuilding {
			height: fit-content;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content:flex-start;
			align-items: center;
		}

		.areaInputs {
			height: fit-content;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content:center;
			align-items: flex-end;
		}

		.areaEtiqueta {
			height: fit-content;
			min-height: 600px;
			width: 100%;
			max-width: 100%;
			display: flex;
			flex-direction: column;
			justify-content:flex-start;
			align-items: center;
			padding-bottom: 60px;
		}
		.areaTag {
			height: fit-content;
			min-width: fit-content;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}
	@media screen and (max-width: 600px){
		.screen {
			height: 100%;
			width: 100%;
			display: flex;
			background-color: var(--main-bg);
			flex-direction: row;
			padding: 10px 10px;
			align-items: flex-start;
		}

		.content {
			height: 100%;
			max-height: fit-content;
			width: 100%;
			max-width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			z-index: 999;
			overflow: auto;
			padding: 20px 0px;

		}

		.areaTagBuilding {
			height: fit-content;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content:flex-start;
			align-items: center;
		}

		.areaInputs {
			height: fit-content;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content:center;
			align-items: flex-end;
		}

		.areaEtiqueta {
			height: fit-content;
			min-height: 600px;
			width: 100%;
			min-width: 800px;
			max-width: 100%;
			display: flex;
			flex-direction: column;
			justify-content:flex-start;
			align-items: flex-end;
			padding-bottom: 60px;
			overflow-x: scroll;
		}
		.areaTag {
			height: fit-content;
			min-width: fit-content;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}

	@media screen and (max-width: 1080px){
		.areaTitulo {
		height: fit-content;
		width: 100%;
		display: flex;
		margin-top: 30px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	}
	
	/* @media screen and (max-width: 600px){
		.areaEtiqueta {
			height: fit-content;
			min-height: 600px;
			width: fit-content;
			max-width: 200px;
			display: flex;
			flex-direction: column;
			justify-content:flex-start;
			align-items: center;
			overflow-x: scroll;
			background-color: pink;
		}
	} */
</style>
