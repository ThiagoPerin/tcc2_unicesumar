<script>
	import { onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';
    import ItemsTableEnvaseLatas from "../Tables/ItemsTableEnvaseLatas.svelte";
	import {DashboardFetches} from "../../fetches/DashboardFetches"
	
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('message', {
			text: 'fechaPopUp'
		});
	}

	let itemsData = []
	onMount(async () => {
		itemsData = await DashboardFetches.fetchDashboardLatasDetalhado();
	});
</script>

<div class="fundoPopUp">
	<div class="popUp">
		<div class="popUpTituloArea">
			<h2>Detalhes Envase Latas</h2>
			<div id="fechar" on:click={close}>
				<i class="fas fa-times" id="fechar"></i>
			</div>
		</div>
		<div class="popUpContentArea">
			<div class="tabela table-responsive">
				<table class="table table-hover table-striped">
					<thead>
						<tr>
							<th scope="col">Produto</th>
							<th scope="col">Latas refugo</th>
                            <th scope="col">Latas Laboratório</th>
                            <th scope="col">Latas boas</th>
						</tr>
					</thead>
					<tbody id="corpoTabela">
							{#key itemsData}
								{#each itemsData as item}
									<ItemsTableEnvaseLatas objectInfo={item}/>
								{/each}
							{/key}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>


<style>
	.fundoPopUp {
		min-height: 100vh;
		height: fit-content;
		width: 100vw;
		top: 0;
		left: 0;
		position: fixed;
		z-index: 999999999999;
		background-color: var(--default-black-lower-opacity);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: auto;
  	}
	
  	.popUp {
		height: fit-content;
		max-height: 400px;
		width: 50%;
		background-color: var(--default-white);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-radius: 15px;
  	}

	.popUpTituloArea {
		position: relative;
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#fechar {
		position: absolute;
		font-size: 30px;
		top: 0;
		right: 0;
		color: var(--ligther-black);
	}

	#fechar:hover {
		cursor: pointer;
	}

	.popUpTituloArea h2 {
		font-size: 30px;
		font-weight: bold;
		color: var(--ligther-black);
	}

	.popUpContentArea {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		overflow: auto;
	}

	.tabela {
    	width: 100%;
    	height:85%;
  	}

  	table {
    	width:100%;
		max-height: 100px;
		overflow-y: auto;
  	}

  	thead {
		position: sticky;
		top: 0;
		z-index: 9999;
		background-color: var(--default-white);
  	}

  	tr {
    	height: fit-content;
    	text-align: center;
		vertical-align: middle;
  	}
	
	.popUpTituloArea {
		position: relative;
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.popUpTituloArea h2 {
		font-size: 30px;
		font-weight: bold;
		color: var(--ligther-black);
	}

	@media screen and (max-width: 900px) {
		.popUp {
		height: fit-content;
		width: 90%;
		background-color: var(--default-white);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-radius: 15px;
  	}
}
</style>