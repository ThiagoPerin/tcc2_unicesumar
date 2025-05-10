<script>
	const refresh = localStorage.getItem("refreshedTag");
	if(!refresh || refresh === "fazer") {
		localStorage.setItem("refreshedTag", "naoFazer");
		window.location.reload()
	} else {
		localStorage.setItem("refreshedTag", "fazer");
	}


	import { onMount } from 'svelte';

	let url = window.location.href;
	let nome = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	let grauAlcoolico = decodeURI(url.split("?")[1].split("&")[1].split("=")[1]) || "";
	let ingrediente = decodeURI(url.split("?")[1].split("&")[2].split("=")[1]) || "";
	let lote = decodeURI(url.split("?")[1].split("&")[3].split("=")[1]) || "";
	let validade = decodeURI(url.split("?")[1].split("&")[4].split("=")[1]) || "";
	let quantidade = Number(decodeURI(url.split("?")[1].split("&")[5].split("=")[1])) || 0;
	let mapa = decodeURI(url.split("?")[1].split("&")[6].split("=")[1]) || "";

	let quantidadeString = quantidade ? (quantidade < 0 ? "" : quantidade > 999 ? "999L" : quantidade + "L") : ""

	let validadeString = validade ? `${validade.slice(8, 10)}/${validade.slice(5,7)}/${validade.slice(0,4)}` : "";

	let carregaTag = 0

	onMount(async () => {
		carregaTag += 1;
		window.print()
	});

	window.onafterprint = () => {
 		 window.location.href = "/app/#/tagmaker";
	};

</script>

{#key carregaTag}
<div class="tag">
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
						<p>{grauAlcoolico} %</p><p style="font-size: 11px;">VOL.</p>
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
{/key}


<div class="tampa"></div>



<style>
	.tag {
		height:100vh;
		width: 100vw;
		background-color: var(--default-white);
		padding: 4px;
		border-radius: 10px;
		font-weight: 400;
	}

	.tagBody {
		position: relative;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 0;
		margin: 0;
	}

	.breweryNameArea {
		height: fit-content;
		width: 100%;
		text-align: justify;
	}

	.breweryNameArea h3 {
		margin: 0;
		padding: 0;
		color: var(--ligther-black);
		font-size: 21px;
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
		overflow: hidden;
	}

	.areaItemLabel {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;
	}

	.areaItemInfoNome {
		width: 100%;
		height: fit-content;
		min-height: 33.33333%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;
		word-break: break-all;
	}

	.areaItemInfo {
		width: 100%;
		height: 33.3333%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: last baseline;
	}

	.areaItemInfo p{
		margin: 0;
		padding: 0;
		font-size: 14px;
		font-weight: 900;
	}

	.areaItemInfoNome p {
		margin: 0;
		padding: 0;
		font-size: 19px;
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
	}

	.areaItemVolume p{
		color: var(--ligther-black);
		font-size: 55px;
		transform:scale(1, 2)
	}

	.tagContentBaixo {
		height: 60%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.areaItemIndustryInfos {
		height: 100%;
		width: 80%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.areaCrucialInfo {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 1px 0px;
		padding-top: 2px;
	}

	.boxLote, .boxAlergia {
		position: relative;
		height: 30px;
		width: fit-content;
		border: 1px solid var(--ligther-black);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0px 12px;
	}

	.boxLote i, .boxAlergia i {
		position: absolute;
		font-size: 14px;
		left: -5px;
		top: calc(50% - 7px);
	}

	.boxAlergia {
		margin-right: 10px;
	}

	.boxLote {
		min-width: 100px;
	}

	.boxCima, .boxBaixo {
		width: fit-content;
		height: 50%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: end;
		font-weight: bolder;
		font-size: 8px;
		overflow: auto;
	}

	.areaIngredients {
		margin-top: 2px;
		height: fit-content;
		max-height: 100%;
		overflow: hidden;
		width: 100%;
		font-size: 7px;
		text-align: justify;
	}

	.areaInfosProd {
		text-align: justify;
		height: fit-content;
		max-height: 100%;
		width: 100%;
		text-justify: distribute-all-lines;
		align-items: center;
		padding: 2px 0px;
		font-size: 8.5px;
		margin: 0;
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
		padding: 0.5px 0px;
	}

	.warnsRow i{
		font-size: 25px;
	}
	.warnsRow img{
		border: 1px solid var(--ligther-black);
		border-radius: 50%;
		height: 25px;
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
		width: 80%;
	}







	/* ################################################################################# */



	.socialMediaArea {
		position: absolute;
		left: 0;
		bottom: -4px;
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		font-weight: 400;
		margin: 0;
		padding: 0;
		font-size: 7px;

	}

	.socialMediaArea p {
		margin: 0;
		padding: 0;
	}

	.socialMediaArea i {
		margin: 2px;
	}



	/* @media print {
	body * {
	  visibility: hidden;
	}
	.imprimir, .imprimir * {
	  visibility: visible;
	}
	.imprimir {
	  position: fixed;
	  left: 0;
	  top: 0;
	}

	@page {
  size: auto;
  margin: 0;
       }
	
  } */

  .tampa {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background-color: var(--default-white);
  }


  @media print {
	.tampa {
		visibility: hidden;
	}
  }
</style>