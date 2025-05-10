<script>
	export let total;
	export let value;
	const percentage = (((value) * 100) / total)
	function percentageToDegree(value) {
		return (value * 3.6);
	}
</script>

<div
	class="doughnutExterno"
	style="background: 
	conic-gradient(
		var(--beer-orange) 0deg {percentageToDegree(percentage)}deg,
		var(--default-white) 0deg 360deg
	);;"
>
	<div class="doughnutInterno">
		{value}/{total}
	</div>
</div>

<style>
	.doughnutExterno {
		border-radius: 50%;
		aspect-ratio: 1/1;
		height: 130px;
		border: 10px solid var(--default-white);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow:
			0px 4px 10px #9b9b9b,
			inset 0px 0px 8px #9b9b9b;
	}

	.doughnutInterno {
		border-radius: 50%;
		aspect-ratio: 1/1;
		height: 80px;
		background-color: var(--default-white);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		font-size: 20px;
		box-shadow: 0px 4px 20px #9b9b9b;
		overflow: hidden;
	}
</style>
