<script>
	import { onMount } from 'svelte';
    import OdpMenuCardLink from "../components/Buttons/OdpMenuCardLink.svelte";
	import DefaultTitle from "../components/Cards/DefaultTitle.svelte";
	import { OpFetches } from "../fetches/OpFetches";

	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	let lote = decodeURI(url.split("?")[1].split("&")[1].split("=")[1]) || "";

	const pageTitle = "APONTAMENTO E INSPEÇÃO";
	//caminho até a página atual, exceto página inicial.
	const pathToHere = [{label: "MENU PRODUÇÃO", link: "/production/menu"},
	{label: "VISUALIZAR RELATÓRIOS", link: "/production/reports"}
	];

	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
    import PageNavigation from "../components/Navigation/PageNavigation.svelte";

	let statusData = [];
	onMount(async () => {
		statusData = await OpFetches.OpStatus(odp);
	});
</script>

<main>
	<NavbarAxon pageTitle={"APONTAMENTO E INSPEÇÃO"}/>
	<div class="screen">
		<div class="content">
			<div class="areaReports">
				<DefaultTitle titulo={`OP Nº: ${odp} | Lote: ${lote}`}/>
				<div class="areaCards">
					{#if statusData.length !== 0}
						<OdpMenuCardLink titulo={"Brassagem"} destino={`/production/odp/brassagem?odp=${odp}&lote=${lote}`} image={"/brassagem.svg"} status={Number(statusData[0]["BRASSAGEM"]) + Number(statusData[0]["PREPARACAO_MALTES"])}/>
						<OdpMenuCardLink titulo={"Cerveja"} destino={`/production/odp/cerveja?odp=${odp}&lote=${lote}`} image={"/cerveja.svg"} dadoUnico={true}/>
						<OdpMenuCardLink titulo={"Inoculação de levedura"} image={"/levedura.svg"} destino={`/production/odp/inoculacao?odp=${odp}&lote=${lote}`} status={statusData[0]["INOCULACAO_LEVEDURA"]}/>
						<OdpMenuCardLink titulo={"Monitoramento de extrato e temperatura"} destino={`/production/odp/monitoramento?odp=${odp}&lote=${lote}`} image={"/temperatura.svg"} status={statusData[0]["MONITORAMENTO_EXTRATO_TEMPERATURA"]}/>
						<OdpMenuCardLink titulo={"Fermentação forçada"} destino={`/production/odp/fermentacao?odp=${odp}&lote=${lote}`} image={"/fermentacao.svg"}  status={statusData[0]["FERMENTACAO_FORCADA"]}/>
						<OdpMenuCardLink titulo={"Medição de pH"} destino={`/production/odp/ph?odp=${odp}&lote=${lote}`} image={"/ph.svg"} status={statusData[0]["MEDICAO_PH"]}/>
						<OdpMenuCardLink titulo={"Coleta de levedura"} destino={`/production/odp/levedura?odp=${odp}&lote=${lote}`} image={"/coleta.svg"} status={statusData[0]["COLETA_LEVEDURA"]}/>
						<OdpMenuCardLink titulo={"Dry Hopping adjuntos e clarificação"} destino={`/production/odp/dryhopping?odp=${odp}&lote=${lote}`} image={"/dryHopping.svg"} status={statusData[0]["DRY_HOPPING"]}/>
						<OdpMenuCardLink titulo={"Transferências (purgas e descartes)"} destino={`/production/odp/transferencia?odp=${odp}&lote=${lote}`} image={"/transferencia.svg"} status={statusData[0]["TRANSFERENCIA"]}/>
						<OdpMenuCardLink titulo={"Centrifugação"} destino={`/production/odp/centrifugacao?odp=${odp}&lote=${lote}`} image={"/centrifuga.svg"} status={Number(statusData[0]["DADOS_CENTRIFUGACAO"]) + Number(statusData[0]["DADOS_CENTRIFUGACAO_RESUMO"])}/>
						<OdpMenuCardLink titulo={"Priming"} destino={`/production/odp/priming?odp=${odp}&lote=${lote}`} image={"/priming.svg"} status={statusData[0]["PRIMING"]}/>
						<OdpMenuCardLink titulo={"Envase"} destino={`/production/odp/envase?odp=${odp}&lote=${lote}`} image={"/envase.svg"} status={Number(statusData[0]["ENVASE_BARRIS"]) + Number(statusData[0]["ENVASE_LATAS"])}/>
						<OdpMenuCardLink titulo={"Carbonatação"} destino={`/production/odp/carbonatacao?odp=${odp}&lote=${lote}`} image={"/bolha.svg"} status={statusData[0]["CARBONATACAO"]}/>
						<OdpMenuCardLink titulo={"Pasteurização"} destino={`/production/odp/pasteurizacao?odp=${odp}&lote=${lote}`} image={"/pasteurizacao.png"} status={statusData[0]["PASTEURIZACAO"]}/>
						<OdpMenuCardLink titulo={"Calendário"} destino={`/production/calendar?odp=${odp}&lote=${lote}`} image={"/calendar.svg"} dadoUnico={true}/>
					{/if}
				</div>
			</div>
			<PageNavigation pathToHere={pathToHere} page={pageTitle}/>
		</div>
	</div>
</main>

<style>
	main {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: hidden;
	}

	.screen {
		height: calc(100% - 70px);
		width: 100%;
		display: flex;
		flex-direction: row;
		background-color: var(--main-bg);
		padding: 10px 20px 0px;
		align-items: flex-start;
	}

	.content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		z-index: 999;
		position: relative;
		flex-wrap: wrap;
		padding-right: 5px;
	}
	

	.areaReports {
		margin-top: 45px;
		height: calc(100% - 45px);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.areaCards {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-start;
		flex-wrap: wrap;
		overflow-y: auto;
		padding: 5px 0px;
		padding-bottom: 25px;
		border-top: 1px solid #b3b3b3a8;
	}
</style>
