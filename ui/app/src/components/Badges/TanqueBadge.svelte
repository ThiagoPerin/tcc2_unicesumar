<script>
	export let titulo = "";
	export let value = "";
</script>

<div class="tanqueBadge">
	<div class="titulo">{titulo}</div>
	<div class="valor">{value}</div>
</div>

<style>
	.tanqueBadge {
		height: 40px;
		width: 75%;
		background-color: var(--tank-badge);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		color:  var(--default-white);
		border: 1px solid #4e4e4e;
	}
	.titulo {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		font-weight: lighter;
	}
	.valor {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		text-align: center;
		font-weight: bold;
	}
</style>
