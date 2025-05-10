<script>
	export let lote;
	export let validade;
	export let quantidade;
	export let nome;
	export let grauAlcoolico;
	export let mapa;
	export let ingrediente;

	let quantidadeString = quantidade ? (quantidade < 0 ? "" : quantidade > 999 ? "999L" : quantidade + "L") : "";

	let validadeString = validade ? `${validade.slice(8, 10)}/${validade.slice(5,7)}/${validade.slice(0,4)}` : "";
</script>


<div class="tag imprimir">
	<div class="tagBody">
		<div class="breweryNameArea">
			<h3>CERVEJARIA BODEBROWN LTDA.</h3>
		</div>
		<div class="tagContentArea">
			<div class="tagContentCima">
				<div class="areaItemLabel">
					<div class="areaItemInfo">
						<p>CERVEJA</p>
					</div>
					<div class="areaItemInfoNome">
						<p>{nome}</p>
					</div>
					<div class="areaItemInfo">
						<p>{grauAlcoolico} %</p><p style="font-size: 18px;">VOL.</p>
					</div>
				</div>
				<div class="areaItemVolume">
					<p>{quantidadeString}</p>
				</div>
			</div>
			<div class="tagContentBaixo">
				<div class="areaItemIndustryInfos">
					<div class="areaCrucialInfo">
						<div class="boxAlergia">
							<i class="fas fa-info-circle"></i>
							<div class="boxCima">ALÉRGICOS: CONTÉM</div>
							<div class="boxBaixo">CEVADA E GLÚTEN</div>
						</div>
						<div class="boxLote">
							<i class="fas fa-info-circle"></i>
							<div class="boxCima">LOTE: {lote}</div>
							<div class="boxBaixo">VALIDADE: {validadeString}</div>
						</div>
					</div>
					<div class="areaIngredients">
						<strong>INGREDIENTES:</strong> {@html ingrediente}
					</div>
					<div class="areaInfosProd">
						PRODUZIDA E ENGARRAFADA POR CERVEJARIA BODEBROWN LTDA. RUA CARLOS DE
						LAET, 941 . HAUER . CURITIBA - PARANÁ CNPJ: 11.646.758/0001-18 GRADUAÇÃO
						ALCOÓLICA {grauAlcoolico.replace(".", ",")}%. <strong>APRECIE COM MODERAÇÃO. PROIBIDA A VENDA E
						CONSUMO PARA MENORES DE 18 ANOS . SE BEBER, NÃO DIRIJA.</strong> 
						REGISTRO <strong>MAPA</strong> {mapa} - <strong>INDÚSTRIA BRASILEIRA.</strong>
					</div>
				</div>


				<div class="areaWarns">
					<div class="areaCautionIcons">
						<div class="warnsRow">
							<img src="/images/noCar.svg" alt="">
							<img src="/images/18.svg" alt="">
						</div>
						<div class="warnsRow">
							<i class="fas fa-recycle"></i>
							<img src="/images/gravida.svg" alt="">
						</div>
					</div>
					<div class="areaQr">
						<img src="/images/qrCode_bodebrown.png" alt="">
					</div>
				</div>
			</div>

		</div>

		<div class="socialMediaArea">
			<p>WWW.CERVEJAIRONMAIDEN.COM.BR</p>|
			<p>WWW.BODEBROWN.COM.BR</p>|
			<p><i class="fab fa-facebook-square"/><i class="fab fa-instagram"/> BODEBROWN</p>
		</div>
	</div>
</div>



<style>
	.tag {
		height: calc(7cm * 1.5);
		width: calc(10cm * 1.5);
		padding: 0.3cm;
		border-radius: 0.6cm;
		border: 3px solid var(--ligther-black);
		background-color: var(--default-white);
	}

	.tagBody {
		position: relative;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		/* background-color: lightblue; */
	}

	.breweryNameArea {
		height: fit-content;
		width: 100%;
		text-align: justify;
		/* background-color: yellow; */
	}

	.breweryNameArea h3 {
		margin: 0;
		padding: 0;
		color: var(--ligther-black);
		font-size: 30.75px;
		font-weight: 900;
	}

	.tagContentArea {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.tagContentCima {
		height: 40%;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.areaItemLabel {
		height: 100%;
		width: 100%;
		/* min-width: fit-content; */
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		/* background-color: royalblue; */
	}

	.areaItemInfoNome {
		width: 100%;
		height: fit-content;
		min-height: 33%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		word-break: break-word;
		/* background: rgb(42, 140, 165); */
		/* border: 1px solid var(--default-white); */
	}

	.areaItemInfo {
		width: 100%;
		height: 33%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-end;
		/* background: rgb(42, 140, 165); */
		/* border: 1px solid var(--default-white); */
	}

	.areaItemInfo p {
		margin: 0;
		padding: 0;
		font-size: 22px;
		font-weight: 900;
	}

	.areaItemInfoNome p {
		margin: 0;
		padding: 0;
		font-size: 30px;
		font-weight: 900;
	}

	.areaItemVolume {
		height: 100%;
		max-height: 100%;
		width: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		font-weight: bolder;
		/* background-color: green; */
	}

	.areaItemVolume p{
		color: var(--ligther-black);
		font-size: 80px;
		transform:scale(1, 2)
	}

	.tagContentBaixo {
		height: 60%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		/* background-color: palegoldenrod; */
	}

	.areaItemIndustryInfos {
		height: 100%;
		width: 80%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		/* background: goldenrod; */
	}

	.areaCrucialInfo {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 5px 0px;
		/* background: yellowgreen; */
	}

	.boxLote, .boxAlergia {
		position: relative;
		height: 50px;
		width: fit-content;
		border: 2px solid var(--ligther-black);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0px 12px;
	}

	.boxLote i, .boxAlergia i {
		position: absolute;
		font-size: 18px;
		left: -7px;
		top: calc(50% - 9px);
	}

	.boxAlergia {
		margin-right: 25px;
	}

	.boxLote {
		min-width: 180px;
	}

	.boxCima, .boxBaixo {
		width: fit-content;
		height: 50%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		/* align-items: end; */
		font-weight: bolder;
		font-size: 14.5px;
		overflow: auto;
	}

	.areaIngredients {
		text-align: justify;
		height: fit-content;
		width: 100%;
		font-size: 11px;
		/* background-color: aliceblue; */
	}

	.areaInfosProd {
		height: calc(100% - 10px);
		text-align: justify;
		width: 100%;
		align-items: center;
		padding: 1px 0px;
		font-size: 11.5px;
		/* background-color: rgb(87, 202, 87); */
	}

	.areaWarns {
		height: 100%;
		width: 20%;
		/* background-color: blue; */
	}

	.areaCautionIcons {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* background-color: palevioletred; */
	}

	.warnsRow {
		height:fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		margin: 1px 0p
		x;
	}

	.warnsRow i{
		font-size: 35px;
	}
	.warnsRow img{
		border: 1px solid var(--ligther-black);
		border-radius: 50%;
		height: 35px;
	}

	.areaQr {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		/* background: yellow; */
	}

	.areaQr img {
		/* height: 95%; */
		width: 80%;
	}







	/* ################################################################################# */



	.socialMediaArea {
		position: absolute;
		left: 0;
		bottom: -10px;
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		font-weight: 500;
	}

	.socialMediaArea p {
		margin: 0;
		padding: 0;
		font-size: 10px;
	}

	.socialMediaArea i {
		margin: 1px;
	}
</style>