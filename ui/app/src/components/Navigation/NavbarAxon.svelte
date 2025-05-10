<script>
    import Sidebar from './Sidebar.svelte';
    export let pageTitle = "";
    
    let pagePaths = [{link: "/production/reports"}];

    let menuVisible = false
    function setMenuVisibility(value) {
        menuVisible = value;
    }
</script>

<div id="navbarAxon" >
    <div class="pageInfos">
        <a href="/#{pagePaths.at(-1).link}" class="title">
            <div>Thigas Beers</div>
        </a>

        <h1 class="pageTitle">{pageTitle}</h1>
    </div>
    <button type="button" class="btn btn-outline-light" on:click={() => setMenuVisibility(true)}>
        <i class="fas fa-bars"></i>
    </button>
</div>


<Sidebar on:close={() => setMenuVisibility(false)} {menuVisible}/>

<style>
    #navbarAxon {
        width: 100%;
        min-height: 70px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: var(--main-color);
        box-shadow: 1px 5px 10px var(--default-black)40;
        color: var(--default-white);
        padding: 0px 20px;
        font-size: 14px;
        text-align: center;
    }

    .title {
        font-size: 22px;
        font-weight: bold;
        color: #ffffff;
        text-decoration: none;
        outline: none;
    }

    .pageInfos {
        height: 100%;
        width: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .pageTitle {
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        margin: 0;
        padding: 0;
    }
</style>
