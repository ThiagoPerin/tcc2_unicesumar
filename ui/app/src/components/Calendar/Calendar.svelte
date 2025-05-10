<script>
	// @ts-nocheck
	import { onMount, afterUpdate } from "svelte";
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { Calendar } from "@fullcalendar/core";
	import dayGridPlugin from "@fullcalendar/daygrid";
	import timeGridPlugin from "@fullcalendar/timegrid";
	import interactionPlugin from "@fullcalendar/interaction";
	import momentPlugin from "@fullcalendar/moment";
	import allLocales from "@fullcalendar/core/locales-all";
	import PopUpAtividadeCustom from "../Cards/PopUpAtividadeCustom.svelte";

	export let events = [];

	let popUpAtividadeCustom = false;
	function hanldePopUpTanques(eventType) {
		popUpAtividadeCustom = eventType;
		if (!eventType) dispatch('updateCalendar');
	}
	let calendar, dataSelecionada;

	onMount(() => {
		const calendarEl = document.getElementById("calendar");

		calendar = new Calendar(calendarEl, {
			timeZone: 'UTC',
			locales: allLocales,
			locale: "pt-br", // Define o locale para português (pt-br)
			customButtons: {
				addActivityBtn: {
					text: "Nova atividade",
					click: function () {
						dataSelecionada = null;
						hanldePopUpTanques(true);
					},
				},
			},
			headerToolbar: {
				left: "title",
				right: "prev,next today addActivityBtn",
			},
			footerToolbar: {
				right: "dayGridMonth,timeGridWeek,timeGridDay",
			},
			plugins: [
				dayGridPlugin,
				timeGridPlugin,
				interactionPlugin,
				momentPlugin,
			],
			events,
			dateClick: function (info) {
				dataSelecionada = info.dateStr;
				hanldePopUpTanques(true);
			},
		});
		calendar.render();
	});
	const updateEvents = () => {
		if (calendar) {
			calendar.removeAllEvents();
			calendar.addEventSource(events);
		}
	};
	afterUpdate(() => {
		updateEvents();
	});
</script>

<div id="calendar"></div>

{#key popUpAtividadeCustom}
	{#if popUpAtividadeCustom}
		<PopUpAtividadeCustom on:close={() => hanldePopUpTanques(false)} dataInicio={dataSelecionada}/>
	{/if}
{/key}

<style>
	#calendar {
		height: 100%;
		width: 100%;
		background-color: rgb(255, 255, 255);
		padding: 10px;
		border-radius: 10px;
	}

	:global(.fc-col-header-cell-cushion) {
		color: var(--ligther-black) !important;
		text-decoration: none !important;
	}
	:global(.fc-daygrid-day-number) {
		color: var(--ligther-black) !important;
		text-decoration: none !important;
	}
</style>
