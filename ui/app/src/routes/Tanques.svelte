<script>
	const pageTitle = "TANQUES";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
	import PageNavigation from "../components/Navigation/PageNavigation.svelte";
    import TanquesTableRow from "../components/Tables/TanquesTableRow.svelte";
    import PopUpErro from "../components/Cards/PopUpErro.svelte";
    import PopUpSucesso from "../components/Cards/PopUpSucesso.svelte";
    import { onMount } from "svelte";
    import { TanqueFetches } from "../fetches/TanqueFetches";

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType;
	}

	let numTanque, capacidade;
	let insertResult = {};
	let showPopUpSucesso = false;
	let showPopUpErro = false;

	async function addRegister(e) {
		const data = {
			numTanque: numTanque,
			capacidade: capacidade,
		};
		e.preventDefault();
		insertResult = await TanqueFetches.addTanqueRegister(data);
		if (insertResult.success) {
			reload();
		} else {
			showPopUpErro = true;
		}
	}

	async function reload() {
		showPopUpSucesso = true;
		numTanque = null;
		capacidade = null;
		registros = await TanqueFetches.fetchTanqueData();
		setTimeout(() => {
			showPopUpSucesso = false;
		}, 1000);
	}

	let registros = [];
	onMount(async () => {
		registros = await TanqueFetches.fetchTanqueData();
	});
</script>

<main>
	<NavbarAxon {pageTitle} />
	<div class="screen">
		<div class="content">
			<PageNavigation page={pageTitle} position={"static"}/>
			<form on:submit={(e) => addRegister(e)} autocomplete="off">
				<div class="inputsArea">
					<div class="inputDiv">
						<label for="numTanque" class="form-label">Número do tanque</label>
						<input type="number" class="form-control inputTag inputTagNumber" id="numTanque" bind:value={numTanque} required />
					</div>
					<div class="inputDiv">
						<label for="capacidade" class="form-label">Capacidade (L)</label>
						<input type="number" class="form-control inputTag" id="capacidade" bind:value={capacidade} required />
					</div>
					<button type="submit" class="btn btn-success">Adicionar tanque</button>
				</div>
				<div class="areaTabela">
					<div class="tabela table-responsive">
						<table class="table table-hover table-striped">
							<thead>
								<tr>
									<th scope="col">Número do Tanque</th>
									<th scope="col">Capacidade</th>
									<th scope="col">Ações</th>
								</tr>
							</thead>
							<tbody id="corpoTabela">
								{#key registros}
									{#each registros as registro}
										<TanquesTableRow {registro} on:message={reload} />
									{/each}
								{/key}
							</tbody>
						</table>
					</div>
				</div>
			</form>
		</div>
	</div>

	{#key showPopUpErro}
		{#if showPopUpErro}
			<PopUpErro msg={insertResult.msg} on:message={() => handlePopUpErro(false)}/>
		{/if}
	{/key}

	{#key showPopUpSucesso}
		{#if showPopUpSucesso}
			<PopUpSucesso/>
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
		padding: 10px 20px;
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

	form {
		position: relative;
		height: calc(100% - 45px);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.inputsArea {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.inputDiv {
		min-width: 200px;
		max-width: 200px;
		margin: 5px;
	}

	button {
		margin: 5px;
	}

	.areaTabela {
		height: 100%;
		width: 100%;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		border: 2px solid rgb(197, 197, 197);
		background-color: var(--default-white);
		border-radius: 10px;
		margin: 20px 0px;
		overflow-y: auto;
	}

	.tabela {
		width: 100%;
		height: fit-content;
	}

	table {
		width: 100%;
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

	@media screen and (max-width: 520px) {
		.inputsArea {
			justify-content: center;
		}
	}

	.inputTagNumber::-webkit-outer-spin-button,
	.inputTagNumber::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
