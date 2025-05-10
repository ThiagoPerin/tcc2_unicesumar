<script>
    import { UserFetches } from "../../fetches/UserFetches";
    export let menuVisible = false;
    import { onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';

    function obterIniciais(nomeCompleto) {
        const partesNome = nomeCompleto.toUpperCase().split(' ');
        if (partesNome.length === 1) {
            return partesNome[0][0];
        } else {
            const [primeiroNome, ultimoNome] = partesNome;
            return primeiroNome[0] + ultimoNome[0];
        }
    }

	const dispatch = createEventDispatcher();
	function close() {
		dispatch('close');
	}

    const date = new Date();
    const ano = date.getFullYear();

    let name, email, username, company, groups, iniciais;
	onMount(async () => {
		const userInfo = await UserFetches.fetchUserData();
        name = userInfo.name;
        email = userInfo.email;
        username = userInfo.username;
        company = userInfo.company;
        groups = userInfo.groups;
        iniciais = obterIniciais(name || "?");
	});
</script>

{#if menuVisible}
    <div id="menu" in:fly={{ x: 300, duration: 600 }} out:fly={{ x: 300, duration: 600 }}>
        <div class="area-user">
            <div class="user-image">
                {iniciais}
            </div>
            <div class="user-name">{name}</div>
            <div class="user-username user-default-info">
                <label for="email" class="form-label">Usuário</label>
                <div id="email" class="form-text">{username}</div>
            </div>
            <div class="user-email user-default-info">
                <label for="email" class="form-label">E-mail</label>
                <div id="email" class="form-text">{email}</div>
            </div>
            <div class="user-company user-default-info">
                <label for="groups" class="form-label">Cervejaria</label>
                <div id="groups" class="form-text">{groups}</div>
                <div id="company" class="form-text">id: {company}</div>
            </div>
        </div>
        <button type="button" class="btn btn-outline-default close-btn" on:click={close}><i class="fas fa-bars"/></button>
        <div class="sidebar-footer">
            <div class="sidebar-btns">
                <a href="https://axontechnology.freshdesk.com/" title="Suporte Axon">
                    <button type="button" class="btn btn-outline-primary menu-btns">
                        <i class="fas fa-headset"/>
                    </button>
                </a>
                <a href="/logout"  title="Encerrar sessão">
                    <button type="button" class="btn btn-outline-danger menu-btns">Encerrar sessão</button>
                </a>
            </div>
            <img src="/images/Axon Beer - preto fundo transparente.png" alt="Axon Beer" id="logoAxonBeer"/>
            <a class="direitos" href="https://axontechnology.com.br/">© Axon Technology {ano}</a>
        </div>
    </div>
{/if}
<style>
	 #menu {
        position: fixed;
        height: 100vh;
		min-height: fit-content;
        width: 300px;
        top: 0;
        right: 0;
        background-color: var(--default-white);
        box-shadow: -16px 0px 21px -7px var(--default-black)1a;
        z-index: 9999999999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
		overflow-y: auto;
    }
    
    .close-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        height: fit-content;
        width: fit-content;
    }

    .area-user {
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .user-image {
        min-height: 150px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        border: 2px solid var(--main-color);
        background-color: var(--axon-green);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        color: var(--default-white);
        font-size: 60px;
        font-weight: bold;
    }

    .user-name {
        height: fit-content;
        width: 100%;
        margin: 10px 0px;
        text-align: center;
        font-weight: bold;
        color: var(--main-color);
        font-size: 22px;
    }

    .user-default-info {
        height: fit-content;
        width: 100%;
        text-align: left;
        margin: 10px 0px;
        word-break: break-all;
    }
    .user-default-info label{
        margin: 0;
        padding: 0;
        font-weight: bold;
    }

    .sidebar-btns {
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .menu-btns {
        margin: 10px;
    }

    .sidebar-footer {
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #logoAxonBeer {
        margin: 10px 0px;
        width: 100%;
        padding: 10px;
    }

    .direitos {
        margin: 10px 0px 0px;
        font-size: 12px;
        text-decoration: none;
        color: var(--main-color);
    }
</style>