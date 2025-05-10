<script>
	import { onMount } from "svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
	import Calendar from "../components/Calendar/Calendar.svelte";
	import PageNavigation from "../components/Navigation/PageNavigation.svelte";
	import {CalendarFetches} from '../fetches/CalendarFetches';

	let url = window.location.href;
	let odp = decodeURI(url.split("?")[1].split("&")[0].split("=")[1]) || "";
	let lote = decodeURI(url.split("?")[1].split("&")[1].split("=")[1]) || "";
	const pathToHere = [
		{ label: "MENU PRODUÇÃO", link: "/production/menu" },
		{ label: "VISUALIZAR RELATÓRIOS", link: "/production/reports" },
		{
			label: "APONTAMENTO E INSPEÇÃO",
			link: `/production/odp/menu?odp=${odp}&lote=${lote}`,
		},
	];

	let eventosCalenadario = [];
	let registros = [];

	const coresSolidas = [
		"#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#1abc9c", "#9b59b6", "#27ae60", "#e67e22",
		"#2980b9", "#16a085", "#d35400", "#2c3e50", "#8e44ad", "#c0392b", "#f1c40f", "#34495e",
		"#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#1abc9c", "#9b59b6", "#27ae60", "#e67e22",
		"#2980b9", "#16a085", "#d35400", "#2c3e50", "#8e44ad", "#c0392b", "#f1c40f", "#34495e",
		"#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#1abc9c", "#9b59b6", "#27ae60", "#e67e22",
		"#2980b9", "#16a085", "#d35400", "#2c3e50", "#8e44ad", "#c0392b", "#f1c40f", "#34495e",
		"#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#1abc9c", "#9b59b6", "#27ae60", "#e67e22",
		"#2980b9", "#16a085", "#d35400", "#2c3e50", "#8e44ad", "#c0392b", "#f1c40f", "#34495e"
	];

	function mapearAtividades(registros) {
		return registros.map((el, i) => {
			const colorIndex = i % coresSolidas.length;
			return {
				id: `atividade-${i}`,
				title: el["ATIVIDADE"],
				description: el["DESCRICAO"],
				start: el["HORARIO_EXECUCAO"] ? el["DATA_INICIO"] : (el["DATA_INICIO"] ? (el["DATA_INICIO"]).split("T")[0] : null),
				end: el["DATA_FINAL"] ? (el["DATA_FINAL"]).split("T")[0] : null,
				color: coresSolidas[colorIndex],
			};
		});
	}

	async function carregarAtividades() {
		registros = await CalendarFetches.fetchCalendarData(odp);
		eventosCalenadario = mapearAtividades(registros);
	}

	onMount(async () => {
		carregarAtividades();
	});
</script>

<main>
	<NavbarAxon pageTitle={`OP: ${odp} | Lote: ${lote}`} />
	<div class="screen">
		<div class="content">
			<div class="areaCalendario">
				{#key eventosCalenadario}
					<Calendar events={eventosCalenadario} on:updateCalendar={carregarAtividades}/>
				{/key}
			</div>
			<PageNavigation {pathToHere} complete={false} />
		</div>
	</div>
</main>

<style>
	main {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.screen {
		height: 100%;
		width: 100%;
		display: flex;
		background-color: var(--main-bg);
		flex-direction: column;
		padding: 5px 10px;
		align-items: flex-start;
		overflow-y: hidden;
	}

	.content {
		position: relative;
		height: fit-content;
		min-height: 100%;
		width: 100%;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		z-index: 999;
		overflow-y: auto;
		padding: 0px 5px 5px;
	}

	.areaCalendario {
		margin-top: 40px;
		height: calc(100% - 40px);
		width: 100%;
	}
</style>
