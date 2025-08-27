<script>
  import { BrassagemFetches } from "../fetches/BrassagemFetches";
  import { PreparacaoMaltesFetches } from "../fetches/PreparacaoMaltesFetches";
  import { FermentacaoForcadaFetches } from "../fetches/FermentacaoForcadaFetches";
  import { TransferenciaFetches } from "../fetches/TransferenciaFetches";
  import { CervejaFetches } from "../fetches/CervejaFetches";
  import { MedicaoPhFetches } from "../fetches/MedicaoPhFetches";
  import { CentrifugacaoFetches } from "../fetches/CentrifugacaoFetches";
  import { CentrifugacaoResumoFetches } from "../fetches/CentrifugacaoResumoFetches";
  import { InoculacaoFetches } from "../fetches/InoculacaoFetches";
  import { ColetaLeveduraFetches } from "../fetches/ColetaLeveduraFetches";
  import { PrimingFetches } from "../fetches/PrimingFetches";
  import { MonitoramentoFetches } from "../fetches/MonitoramentoFetches";
  import { DryHoppingFetches } from "../fetches/DryHoppingFetches";
  import { EnvaseBarrilFetches } from "../fetches/EnvaseBarrilFetches";
  import { EnvaseLatasFetches } from "../fetches/EnvaseLatasFetches";
  import { CarbonatacaoFetches } from "../fetches/CarbonatacaoFetches";
  import { PasteurizacaoFetches } from "../fetches/PasteurizacaoFetches";
  import { onMount } from "svelte";
  import PrintBrassagem from "../components/PrintOP/PrintBrassagem.svelte";
  import PrintBrassagemMalte from "../components/PrintOP/PrintBrassagemMalte.svelte";
  import PrintFermentaoForada from "../components/PrintOP/PrintFermentaçãoForçada.svelte";
  import PrintTransferncias from "../components/PrintOP/PrintTransferências.svelte";
  import PrintCerveja from "../components/PrintOP/PrintCerveja.svelte";
  import PrintMedicaoPh from "../components/PrintOP/PrintMedicaoPH.svelte";
  import PrintCentrifugacao from "../components/PrintOP/PrintCentrifugacao.svelte";
  import PrintResumoCentrifugao from "../components/PrintOP/PrintResumoCentrifugação.svelte";
  import PrintInoculao from "../components/PrintOP/PrintInoculacao.svelte";
  import PrintColetaLevedura from "../components/PrintOP/PrintColetaLevedura.svelte";
  import PrintPriming from "../components/PrintOP/PrintPriming.svelte";
  import PrintMonitoramento from "../components/PrintOP/PrintMonitoramento.svelte";
  import PrintDryHopping from "../components/PrintOP/PrintDryHopping.svelte";
  import PrintEnvaseLata from "../components/PrintOP/PrintEnvaseLata.svelte";
  import PrintEnvaseBarril from "../components/PrintOP/PrintEnvaseBarril.svelte";
  import PrintCarbonacao from "../components/PrintOP/PrintCarbonacao.svelte";
  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";
    import PrintPasteurizacao from "../components/PrintOP/PrintPasteurizacao.svelte";

  function getUrlParam(name) {
    let url = window.location.href;
    return decodeURI(url.split(`${name}=`)[1].split("&")[0]) || "";
  }

  let odp = getUrlParam("odp");
  let lote = getUrlParam("lote");

  let registrosBrassagem = [];
  let registrosBrassagemMalte = [];
  let registroFermentacaoForcada = [];
  let registroTransferencia = [];
  let registroCerveja = [];
  let registroMedicaoPh = [];
  let registroCentrifugacao = [];
  let registroCentrifugacaoResumo = [];
  let registroInoculação = [];
  let registroColetaLevedura = [];
  let registroPriming = [];
  let registroMonitoramento = [];
  let registroDryHopping = [];
  let registroEnvaseLata = [];
  let registroEnvaseBarril = [];
  let registroCarbonatacao = [];
  let registroPasteurizacao = [];

  const dataDeImpressao = new Date();
  const dataFormatada = dataDeImpressao.toLocaleString();

  async function getDocData() {
    registrosBrassagem = await BrassagemFetches.fetchBrassagemData(odp);

    registrosBrassagemMalte = await PreparacaoMaltesFetches.fetchPreparacaoMaltesData(odp);

    registroFermentacaoForcada = await FermentacaoForcadaFetches.fetchFermentacaoForcadaData(odp);

    registroTransferencia = await TransferenciaFetches.fetchTransferenciaData(odp);

    registroCerveja = await CervejaFetches.fetchCervejaData(odp);

    registroMedicaoPh = await MedicaoPhFetches.fetchMedicaoPhData(odp);

    registroCentrifugacao = await CentrifugacaoFetches.fetchCentrifugacaoData(odp);

    registroCentrifugacaoResumo = await CentrifugacaoResumoFetches.fetchCentrifugacaoResumoData(odp);

    registroInoculação = await InoculacaoFetches.fetchInoculacaoData(odp);

    registroColetaLevedura = await ColetaLeveduraFetches.fetchColetaLeveduraData(odp);

    registroPriming = await PrimingFetches.fetchPrimingData(odp);

    registroMonitoramento = await MonitoramentoFetches.fetchMonitoramentoData(odp);

    registroDryHopping = await DryHoppingFetches.fetchDryHoppingData(odp);

    registroEnvaseBarril = await EnvaseBarrilFetches.fetchEnvaseBarrilData(odp);

    registroEnvaseLata = await EnvaseLatasFetches.fetchEnvaseLatasData(odp);

    registroCarbonatacao = await CarbonatacaoFetches.fetchCarbonatacaoData(odp);

    registroPasteurizacao = await PasteurizacaoFetches.fetchPasteurizacaoData(odp);
  }

  onMount(async () => {
    await getDocData();
  });

  function onafterprint() {
    window.location.href = "/app/#/production/reports";
  }

  function generationPdf() {
    const html_source = document.getElementById("context-pdf")
    const filename = "Ordem de produção - OP: " + odp + " | Lote: " + lote;

    html2canvas(html_source, {
      ignoreElements: (element) => element.id === "gerarPDF",
    }).then(function (canvas) {
      let imgData = canvas.toDataURL("image/jpeg");
      let imgWidth = 210; // Largura em mm de um a4
      let pageHeight = 297; // Altura em mm de um a4

      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      let pdf = new jsPDF("p", "mm");

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
    });
  }
</script>

<div id="context-pdf" style="width:800px, height:auto">
  <div id="gerarPDF" class="gerarPDF">
    <button class="downloadBtn" on:click={generationPdf}>
      <i class="fa-solid fa-file-pdf" />
    </button>
  </div>
  <div class="title">
    <h2>Ordem de produção - OP: {odp} Lote: {lote}</h2>
  </div>
  <div class="context">
    <div class="tableBrassagem">
      <div class="teste">
        <h5 class="subTitle">Brassagem</h5>
        {#each registrosBrassagem as registro}
          <PrintBrassagem registroBrassagem={registro} />
        {/each}
      </div>

      <h5>Preparação de maltes</h5>
      {#each registrosBrassagemMalte as registro}
        <PrintBrassagemMalte registrosMalte={registro} />
      {/each}

      <h5>Fermentação forçada</h5>
      {#each registroFermentacaoForcada as registro}
        <PrintFermentaoForada fermentacaoforçada={registro} />
      {/each}

      <h5>Transferências (purgas e descartes)</h5>
      {#each registroTransferencia as registro}
        <PrintTransferncias registroTransferencia={registro} />
      {/each}

      <h5>Cerveja</h5>
      {#each registroCerveja as registro}
        <PrintCerveja registroCerveja={registro} />
      {/each}
      <h5>Medição de PH</h5>
      {#each registroMedicaoPh as registro}
        <PrintMedicaoPh registroMedicaoPh={registro} />
      {/each}

      <h5>Dados de centrifugação</h5>
      {#each registroCentrifugacao as registro}
        <PrintCentrifugacao registroCentrifugacao={registro} />
      {/each}

      <h5>Resumo centrifugação</h5>
      {#each registroCentrifugacaoResumo as registro}
        <PrintResumoCentrifugao registroCentrifugacaoResumo={registro} />
      {/each}

      <h5>Inoculação de levedura</h5>
      {#each registroInoculação as registro}
        <PrintInoculao registroInoculação={registro} />
      {/each}

      <h5>Coleta de levedura</h5>
      {#each registroColetaLevedura as registro}
        <PrintColetaLevedura registroColetaLevedura={registro} />
      {/each}

      <h5>Priming</h5>
      {#each registroPriming as registro}
        <PrintPriming registroPriming={registro} />
      {/each}
      <h5>Monitoramento de extrato e temperatura</h5>
      {#each registroMonitoramento as registro}
        <PrintMonitoramento registroMonitoramento={registro} />
      {/each}
      <h5>Dry hopping, adjuntos e clarificação</h5>
      {#each registroDryHopping as registro}
        <PrintDryHopping registroDryHopping={registro} />
      {/each}

      <h5>Envase de Garrafas/Latas</h5>
      {#each registroEnvaseLata as registro}
        <PrintEnvaseLata registroEnvaseLata={registro} />
      {/each}
      <h5>Envase de Barris</h5>
      {#each registroEnvaseBarril as registro}
        <PrintEnvaseBarril registroEnvaseBarril={registro} />
      {/each}
      <h5>Carbonatação</h5>
      {#each registroCarbonatacao as registro}
        <PrintCarbonacao registroCarbonacao={registro} />
      {/each}

      <h5>Pasteurização</h5>
      {#each registroPasteurizacao as registro}
        <PrintPasteurizacao registro={registro} />
      {/each}

      <div class="dataImpressao">
        <p>Documento impresso:</p>
        <span id="data-de-impressao">{dataFormatada}</span>
      </div>
      <div class="assinatura">
        <hr class="hr" />
        <p>Assinatura do responsável</p>
      </div>
    </div>
  </div>
</div>

<style>
  .gerarPDF {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    align-content: center;
    position: fixed;
    top: 45%;
    left: 89%;
    width: 10%;
    height: 50%;
    background-color: var(--default-black)0;
  }

  .downloadBtn {
    display: flex;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 30px;
    color: var(--default-white);
    background-color: var(--axon-green);
    box-shadow: 2px 2px 10px var(--default-black)30;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .title {
    display: flex;
    justify-content: center;
    padding-top: 77px;
    padding-bottom: 14px;
  }

  .context {
    display: flex;
    justify-content: center;
  }

  .tableBrassagem {
    border: 2px solid black;
    border-radius: 10px;
    padding: 15px;
    margin: 5px;
    width: 98%;
  }

  .dataImpressao {
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
  }

  .assinatura {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 5%;
  }

  .hr {
    align-items: left;
    size: 10;
    width: 50%;
    margin-bottom: 7px;
  }
</style>
