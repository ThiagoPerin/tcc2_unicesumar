<script>
	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
    import DefaultTitle from "../Cards/DefaultTitle.svelte";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";
	import {BrassagemFetches} from '../../fetches/BrassagemFetches';

	let showPopUpSucesso = false;
	let showPopUpErro = false;
	let dataEvaseSaca, lote, turno, validade, posicaoSuperior, posicaoInferior, dia, horaMashIn, densidadePrimario, phLab, densidadeFinalSparge, horaInicioMashOut, volume, temperaturaMedicaoVolume, densidadeFabrica, pesoTina, densidadeLab, horaInicioFervura, medicaoCorrecaoPh, volumeFinalFervura, pesoFinalTina, trub, densidadeFinalFab, densidadeFinalLab,temperaturaTransf, volumeTransf, horaFim, keg, responsavel;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	let insertResult = {}
	async function addRegister(e) {
		const data = {
			numOperacao: odp,
			dataEvaseSaca: dataEvaseSaca,
			turno: turno,
			lote: lote,
			validade: validade,
			posicaoInferior: posicaoInferior,
			posicaoSuperior: posicaoSuperior,
			dia: dia,
			horaMashIn: horaMashIn,
			densidadePrimario: densidadePrimario,
			phLab: phLab,
			densidadeFinalSparge: densidadeFinalSparge,
			horaInicioMashOut: horaInicioMashOut,
			volume: volume,
			temperaturaMedicaoVolume: temperaturaMedicaoVolume,
			densidadeFabrica: densidadeFabrica,
			pesoTina: pesoTina,
			densidadeLab: densidadeLab,
			horaInicioFervura: horaInicioFervura,
			medicaoCorrecaoPh: medicaoCorrecaoPh,
			volumeFinalFervura: volumeFinalFervura,
			pesoFinalTina: pesoFinalTina,
			trub: trub,
			densidadeFinalFab: densidadeFinalFab,
			densidadeFinalLab: densidadeFinalLab,
			temperaturaTransf: temperaturaTransf,
			volumeTransf: volumeTransf,
			horaFim: horaFim,
			keg: keg,
			responsavel: responsavel,
		}
		e.preventDefault();

		insertResult = await BrassagemFetches.addBrassagem(data);
		if(insertResult.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};
</script>
<form on:submit={(e) => addRegister(e)}>
	<DefaultTitle titulo={`Brassagem`}/>
	<div class="isolatedAreaTitle">Dados Malte Pilsen</div>
	<div class="inputsAreaIsolated">
		<div class="inputDiv">
			<label for="dataEvaseSaca" class="form-label">Data envase saca</label>
			<input type="date" class="form-control inputTag" id="dataEvaseSaca" bind:value={dataEvaseSaca}/>
		</div>
		<div class="inputDiv">
			<label for="turno" class="form-label">Turno</label>
			<input type="text" class="form-control inputTag" id="turno" bind:value={turno}/>
		</div>
		<div class="inputDiv">
			<label for="lote" class="form-label">Lote</label>
			<input type="text" class="form-control inputTag" id="lote" bind:value={lote}/>
		</div>
		<div class="inputDiv">
			<label for="validade" class="form-label">Validade</label>
			<input type="date" class="form-control inputTag" id="validade" bind:value={validade}/>
		</div>
	</div>
	<div class="isolatedAreaTitle">Ajuste Moagem</div>
	<div class="inputsAreaIsolated">
		<div class="inputDiv">
			<label for="posicaoSuperior" class="form-label">Posição superior (0 a 10)</label>
			<input type="number" class="form-control inputTag" id="posicaoSuperior" min="0" max="10" bind:value={posicaoSuperior}/>
		</div>
		<div class="inputDiv">
			<label for="posicaoInferior" class="form-label">Posição inferior (0 a 10)</label>
			<input type="number" class="form-control inputTag" id="posicaoInferior"  min="0" max="10"  bind:value={posicaoInferior}/>
		</div>
	</div>
	<div class="isolatedAreaTitle">Mash</div>
	<div class="inputsAreaIsolated">
		<div class="inputDiv">
			<label for="dia" class="form-label">Dia</label>
			<input type="date" class="form-control inputTag" id="dia" bind:value={dia}/>
		</div>
		<div class="inputDiv">
			<label for="horaMashIn" class="form-label">Hora mash in</label>
			<input type="time" class="form-control inputTag" id="horaMashIn" bind:value={horaMashIn}/>
		</div>
		<div class="inputDiv">
			<label for="densidadePrimario" class="form-label">Densidade primário</label>
			<input type="number" class="form-control inputTag" id="densidadePrimario" step=".001" bind:value={densidadePrimario}/>
		</div>
		<div class="inputDiv">
			<label for="phLab" class="form-label">pH Lab</label>
			<input type="number" class="form-control inputTag" id="phLab" step=".01" bind:value={phLab}/>
		</div>
		<div class="inputDiv">
			<label for="densidadeFinalSparge" class="form-label">Dens. Fin. de Sparge</label>
			<input type="number" class="form-control inputTag" id="densidadeFinalSparge" step=".001" bind:value={densidadeFinalSparge}/>
		</div>
		<div class="inputDiv">
			<label for="horaInicioMashOut" class="form-label">Hora início mash out</label>
			<input type="time" class="form-control inputTag" id="horaInicioMashOut" bind:value={horaInicioMashOut}/>
		</div>
	</div>
	<div class="isolatedAreaTitle">Pré-Boil</div>
	<div class="inputsAreaIsolated">
		<div class="inputDiv">
			<label for="volume" class="form-label">Volume (L)</label>
			<input type="number" class="form-control inputTag" id="volume" step=".001" bind:value={volume}/>
		</div>
		<div class="inputDiv">
			<label for="temperaturaMedicaoVolume" class="form-label">Temp. Medição de Vol. (°C)</label>
			<input type="number" class="form-control inputTag" id="temperaturaMedicaoVolume" bind:value={temperaturaMedicaoVolume}/>
		</div>
		<div class="inputDiv">
			<label for="pesoTina" class="form-label">Peso da tina (%)</label>
			<input type="number" class="form-control inputTag" id="pesoTina" step=".01" bind:value={pesoTina}/>
		</div>
		<div class="inputDiv">
			<label for="densidadeFabrica" class="form-label">Densidade Fábrica</label>
			<input type="number" class="form-control inputTag" id="densidadeFabrica" step=".001" bind:value={densidadeFabrica}/>
		</div>
		<div class="inputDiv">
			<label for="densidadeLab" class="form-label">Densidade laboratório</label>
			<input type="number" class="form-control inputTag" id="densidadeLab" step=".001" bind:value={densidadeLab}/>
		</div>
	</div>
	<div class="isolatedAreaTitle">Fervura</div>
	<div class="inputsAreaIsolated">
		<div class="inputDiv">
			<label for="horaInicioFervura" class="form-label">Hora início</label>
			<input type="time" class="form-control inputTag" id="horaInicioFervura" bind:value={horaInicioFervura}/>
		</div>
		<div class="inputDiv">
			<label for="medicaoCorrecaoPh" class="form-label">Medição/Correção pH</label>
			<input type="number" class="form-control inputTag" id="medicaoCorrecaoPh" step=".01" bind:value={medicaoCorrecaoPh}/>
		</div>
		<div class="inputDiv">
			<label for="volumeFinalFervura" class="form-label">Volume final (L)</label>
			<input type="number" class="form-control inputTag" id="volumeFinalFervura" step=".001" bind:value={volumeFinalFervura}/>
		</div>
		<div class="inputDiv">
			<label for="pesoFinalTina" class="form-label">Peso da tina final (L)</label>
			<input type="number" class="form-control inputTag" id="pesoFinalTina" bind:value={pesoFinalTina}/>
		</div>
		<div class="inputDiv">
			<label for="trub" class="form-label">Trub (L)</label>
			<input type="number" class="form-control inputTag" id="trub" bind:value={trub}/>
		</div>
		<div class="inputDiv">
			<label for="densidadeFinalFab" class="form-label">Densidade final Fáb.</label>
			<input type="number" class="form-control inputTag" id="densidadeFinalFab" step=".001" bind:value={densidadeFinalFab}/>
		</div>
		<div class="inputDiv">
			<label for="densidadeFinalLab" class="form-label">Densidade final Lab.</label>
			<input type="number" class="form-control inputTag" id="densidadeFinalLab" step=".001" bind:value={densidadeFinalLab}/>
		</div>
	</div>
	<div class="isolatedAreaTitle">Transferência</div>
	<div class="inputsAreaIsolated">
		<div class="inputDiv">
			<label for="temperaturaTransf" class="form-label">Temperatura (°C)</label>
			<input type="number" class="form-control inputTag" id="temperaturaTransf" bind:value={temperaturaTransf}/>
		</div>
		<div class="inputDiv">
			<label for="volumeTransf" class="form-label">Volume trasnferido (L)</label>
			<input type="number" class="form-control inputTag" id="volumeTransf" bind:value={volumeTransf}/>
		</div>
		<div class="inputDiv">
			<label for="horaFim" class="form-label">Hora fim</label>
			<input type="time" class="form-control inputTag" id="horaFim" bind:value={horaFim}/>
		</div>
	</div>
	<div class="inputsArea">
		<div class="inputDiv">
			<label for="temperaturaTransf" class="form-label">KEG's p/ Transf. Levedura</label>
			<input type="text" class="form-control inputTag" id="temperaturaTransf" bind:value={keg}/>
		</div>
		<div class="inputDiv">
			<label for="volumeTransf" class="form-label">Responsável</label>
			<input type="text" class="form-control inputTag" id="volumeTransf" bind:value={responsavel} required/>
		</div>
	</div>
	<div class="inputsArea">
		<button type="submit" class="btn btn-success">Adicionar registro</button>
	</div>
</form>

{#key showPopUpErro}
	{#if showPopUpErro}
		<PopUpErro msg={insertResult.msg} on:message={() => handlePopUpErro(false)}/>
	{/if}
{/key}

{#key showPopUpSucesso}
	{#if showPopUpSucesso}
		<PopUpSucesso/>
	{/if}
{/key}



<style>
	form {
		position: relative;
		margin-top: 45px;
		min-height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.inputsArea {
		height: fit-content;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.inputsAreaIsolated {
		height: fit-content;
		width: fit-content;
		max-width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 10px;
		border-radius: 10px;
		border: 1px solid var(--breadcrumb-gray);
	}

	.isolatedAreaTitle {
		margin-top: 10px;
		font-size: 18px;
	}

	.inputDiv {
		min-width: 200px;
		max-width: 200px;
		margin: 5px;
	}

	button {
		margin: 10px;
	}

	@media screen and (max-width: 650px) {
		form {
			margin-top: 30px;
		}
	}
	@media screen and (max-width: 500px) {
		.inputsArea, .inputsAreaIsolated {
			justify-content: center;
		}
	}
</style>