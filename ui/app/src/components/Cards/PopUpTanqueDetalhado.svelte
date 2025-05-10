<script>
	import { TanqueFetches } from "../../fetches/TanqueFetches";
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
    import TanqueDetalhadoTableRow from '../Tables/TanqueDetalhadoTableRow.svelte';
    import NoRowsWarn from '../Navigation/NoRowsWarn.svelte';
	const dispatch = createEventDispatcher();

	export let tanque;
	
	function close() {
		dispatch('close');
	}

	let registros = [];
	onMount(async () => {
		registros = await TanqueFetches.tanqueHistorico(tanque);
	});
</script>

<div class="fundoPopUpAviso">
	<div class="popUpAviso">
		<div id="fechar" on:click={close}><i class="fas fa-times"/></div>
		<div class="popUpTituloArea">
			<h2>Registros do tanque {tanque}</h2>
		</div>
		<div class="popUpContentArea">
				{#key registros}
					{#if registros.length > 0}
						<div class="areaTabela">
							<div class="tabela table-responsive">
								<table class="table table-hover table-striped">
									<thead>
										<tr>
											<th scope="col">Tipo</th>
											<th scope="col">Data</th>
											<th scope="col">De tanque</th>
											<th scope="col"></th>
											<th scope="col">Para tanque</th>
											<th scope="col">Temperatura</th>
											<th scope="col">Purga</th>
											<th scope="col">Transferência</th>
											<th scope="col">Descarte</th>
											<th scope="col">Carb</th>
											<th scope="col">Observações</th>
											<th scope="col">Responsável</th>
										</tr>
									</thead>
									<tbody id="corpoTabela">
										{#each registros as registro}
											<TanqueDetalhadoTableRow registro={registro}/>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					{:else}
						<NoRowsWarn msg={"Ainda não há tanques registrados"}/>
					{/if}
				{/key}
		</div>
	</div>
</div>

<style>
	.fundoPopUpAviso {
		min-height: 100vh;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		position: fixed;
		z-index: 9999999999999;
		background-color: var(--default-black-lower-opacity);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: auto;
  	}

	.popUpAviso {
		position: relative;
		height: fit-content;
		max-width: 80%;
		min-width: 40%;
		width: fit-content;
		background-color: var(--default-white);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 25px 20px;
		border-radius: 15px;
  	}

	#fechar {
		position: absolute;
		top: 0px;
		right: 10px;
		font-size: 30px;
		cursor: pointer;
	}

	h2 {
		text-align: center;
		font-size: 25px;
	}

	.popUpContentArea {
		height: fit-content;
		width: 100%;
	}

	.popUpContentArea {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		overflow: auto;
		padding: 10px 0px;
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
	}

	.tabela {
    	width: 100%;
    	height:fit-content;
		max-height: 300px;
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
