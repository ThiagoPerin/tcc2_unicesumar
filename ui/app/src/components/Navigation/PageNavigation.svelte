<script>
	export let position = "absolute";
	export let page = "";
	export let complete = true;
	export let pathToHere = [];
	let pagePaths = [{label: "INÍCIO", link: "/"}];

	for(let page of pathToHere) {
		pagePaths.push(page);
	}
</script>

<div class="navigationArea" style="position: {position};">
	<div class="backArea">
		<a href="/#{pagePaths.at(-1).link}">
			<i class="fa-solid fa-chevron-left"></i>
			Voltar
		</a>
	</div>
	{#if complete}
		<div class="breadcrumbArea">
			{#each pagePaths as path}
				<a href="/#{path.link}">
					{path.label}
				</a>	
				<i class="fa-solid fa-chevron-right"></i>
			{/each}
			{page}
		</div>
	{/if}
</div>


<style>
	.navigationArea {
		height: fit-content;
		width: fit-content;
		position: absolute;
		top: 0;
		left: 0;
		font-weight: lighter;
		z-index: 99999;
		padding-top: 0.5%;
	}
	
	
	.backArea {
		height: fit-content;
		width: fit-content;
	}
	.backArea a {
		color: black;
		font-size: 18px;
		text-decoration: none;
	}

	.breadcrumbArea {
		height: fit-content;
		width: fit-content;
		font-size: 10px;
		color: var(--breadcrumb-gray);
	}
	
	.breadcrumbArea a {
		margin: 3px;
		text-decoration: none;
	}

	@media screen and (max-width: 650px) {
		.breadcrumbArea {
			display: none;
		}
}
</style>