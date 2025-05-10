<script>
	export let title = "Operação realizada com sucesso!";
</script>
<div class="fundoPopUpAviso">
	<div class="popUpAviso">
		<div class="popUpTituloArea">
			<h2>{title}</h2>
		</div>
		<div class="popUpBtnArea">
			<i class="fas fa-check"></i>
		</div>
	</div>
</div>



<style>
	.fundoPopUpAviso {
		min-height: 100vh;
		height: fit-content;
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
		height: fit-content;
		width:fit-content;
		max-width: 95%;
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
		text-align: center;
	}

	  .popUpBtnArea {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 10px 0px;
	}

	.popUpBtnArea i{
		font-size: 60px;
		color: var(--ligther-black);
	}
</style>