<script>
	import {
		SvelteGantt,
		SvelteGanttTable,
		MomentSvelteGanttDateAdapter,
	} from "svelte-gantt/svelte";
	import { onMount } from "svelte";
	import NavbarAxon from "../components/Navigation/NavbarAxon.svelte";
	import PageNavigation from "../components/Navigation/PageNavigation.svelte";
	import moment from "moment";

	const pageTitle = "GANTT GERAL";
	const pathToHere = [{ label: "MENU PRODUÇÃO", link: "/production/menu" }];

	onMount(async () => {});

	let options = {
		tableHeaders: [
			{ title: "Name", property: "label", width: 150 },
			{ title: "Age", property: "age", width: 50 },
		],
		ganttTableModules: [SvelteGanttTable],
		from: moment().startOf("week"),
		to: moment().endOf("week"),
		columnOffset: "500",
		layout: "pack",
		rows: [
			{
				id: 1,
				label: "Gusso",
				age: "30",
			},
			{
				id: 2,
				label: "é velho",
				age: "12",
			},
			{
				id: 3,
				label: "Demais",
				age: "12",
			},
		],
		tasks: [
			{
				id: 1,
				resourceId: 1,
				label: "aiiii",
				from: moment().startOf("week"),
				to: moment().endOf("week"),
			},
			{
				id: 2,
				resourceId: 2,
				label: "que",
				from: moment().startOf("week"),
				to: moment().endOf("week"),
			},
			{
				id: 3,
				resourceId: 3,
				label: "delicia",
				from: moment().startOf("week"),
				to: moment().endOf("week"),
			},
		],
	};
</script>

<main>
	<NavbarAxon {pageTitle} />
	<div class="screen">
		<div class="content">
			<div class="areaCalendario">
				<SvelteGantt {...options}></SvelteGantt>
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
		background-color: rgb(163, 163, 163);
	}
</style>
