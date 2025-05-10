<script>
	export let total;
	export let value;
	const percentage = (((value) * 100) / total)
</script>

<div class="bar">
	<div class="bar-content" style="width: {percentage}%;"></div>
	<div class="value">{value}/{total}</div>
</div>

<style>
	.bar {
		position: relative;
		height: 50px;
		width: 100%;
		background-color: var(--default-white);
		border: 10px var(--default-white) solid;
		border-radius: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		box-shadow:
			0px 4px 10px #9b9b9b,
			inset 0px 0px 8px #9b9b9b;
	}
	.bar-content {
		background: linear-gradient(180deg, var(--beer-orange) 0%, var(--beer-dark-orange-gradient) 100%);
		height: 100%;
		border-radius: 8px;
	}
	.value {
		position: absolute;
		right: 10px;
		top: 0;
		bottom: 0;
		font-size: 20px;
		font-weight: bold;
		color: var(--ligther-black);
	}
</style>
