<script>
	import { OpFetches } from "../../fetches/OpFetches";
    import PopUpErro from "../Cards/PopUpErro.svelte";
    import PopUpOpStatus from "../Cards/PopUpOpStatus.svelte";
    import PopUpSucesso from "../Cards/PopUpSucesso.svelte";

	export let status = 1;
	export let op = 1;
	export let lote = 1;
	let showPopUpErro = false;
	let showPopUpSucesso = false;
	let showPopUpOpStatus = false;

	function handlePopUpErro(eventType) {
		showPopUpErro = eventType
	}

	function handlePopUpOpStatus(eventType) {
		showPopUpOpStatus = eventType
	}

	let insertResult = {}
	async function updateRegister(event) {
		const data = {
			numOperacao: op,
			lote: lote,
			status: event.detail.text,
		}
		event.preventDefault();
		insertResult = await OpFetches.editOpStatus(data);
		if(insertResult.success) {
			showPopUpSucesso = true;
			setTimeout(() => {window.location.reload()}, 1000)
		} else {
			showPopUpErro = true;
		}
	};
</script>

<div class="status">
	{#if status === 0}
	<span class="badge bg-primary">Em produção</span>
	{:else if status === 1}
	<span class="badge bg-success">Finalizado</span>
	{:else if status === 2}
	<span class="badge bg-danger">Cancelado</span>
	{/if}
	<i class="fas fa-pencil" on:click={() => handlePopUpOpStatus(true)}></i>
</div>

{#key showPopUpOpStatus}
	{#if showPopUpOpStatus}
		<PopUpOpStatus {op} statusAtual={status} on:close={() => handlePopUpOpStatus(false)} on:confirmed={updateRegister}/>
	{/if}
{/key}

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
	.status {
		height: fit-content;
		width: fit-content;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	i {
		cursor: pointer;
		font-size: 20px;
		margin-left: 5px;
	}
</style>