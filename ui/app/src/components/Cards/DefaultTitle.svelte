<script>
	export let titulo = "";
</script>

<div class="titulo">{titulo}</div>


<style>
	.titulo {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 30px;
		flex-wrap: wrap;
		text-align: center;
		color: var(--default-black);
		padding: 1%;
	}
</style>