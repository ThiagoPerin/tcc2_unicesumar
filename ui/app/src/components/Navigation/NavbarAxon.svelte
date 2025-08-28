<script>
    export let pageTitle = "";
    let pagePaths = [{ link: "/production/reports" }];
</script>

<div id="navbarAxon" >
    <div class="pageInfos">
        <a href="/#{pagePaths.at(-1).link}" class="title">
            <img src="/images/lupulo-branco.png" alt="Logo" class="logo" />
        </a>
        <h1 class="pageTitle">{pageTitle}</h1>
    </div>
    <form action="/auth/logout" method="POST">
        <button type="submit" class="btn btn-outline-light">
            <i class="fas fa-right-from-bracket"></i>
        </button>
    </form>
</div>

<style>
    #navbarAxon {
        width: 100%;
        height: 70px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: var(--main-color);
        box-shadow: 1px 5px 10px var(--default-black) 40;
        padding: 10px;
    }

    .pageInfos {
        height: 100%;
        width: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .logo {
        height: 50px;
    }

    .pageTitle {
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        margin: 0;
        color: var(--default-white);
    }
</style>
