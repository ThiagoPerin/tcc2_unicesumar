<script>
	import Router from "svelte-spa-router";
	import {wrap} from "svelte-spa-router/wrap";
</script>

<Router
	routes={{
		"/": wrap({
			asyncComponent: () => import("./routes/MainPannel.svelte")
		}),
		"/cadastro/menu": wrap({
			asyncComponent: () => import("./routes/CadastroMenu.svelte")
		}),
		"/cadastro/cerveja": wrap({
			asyncComponent: () => import("./routes/CadastroCerveja.svelte")
		}),
		"/cadastro/atividades": wrap({
			asyncComponent: () => import("./routes/CadastroAtividades.svelte")
		}),
		"/dashboards": wrap({
			asyncComponent: () => import("./routes/DashboardPanel.svelte")
		}),
		"/tagprinter": wrap({
			asyncComponent: () => import("./routes/TagPrintPage.svelte")
		}),
		"/tanques": wrap({
			asyncComponent: () => import("./routes/Tanques.svelte")
		}),
		"/production/menu": wrap({
			asyncComponent: () => import("./routes/ProductionMenu.svelte")
		}),
		"/production/odp/new": wrap({
			asyncComponent: () => import("./routes/NewOdp.svelte")
		}),
		"/production/reports": wrap({
			asyncComponent: () => import("./routes/ViewReports.svelte")
		}),
		"/production/odp/menu": wrap({
			asyncComponent: () => import("./routes/OdpMenu.svelte")
		}),
		"/production/odp/cerveja": wrap({
			asyncComponent: () => import("./routes/Cerveja.svelte")
		}),
		"/production/odp/inoculacao": wrap({
			asyncComponent: () => import("./routes/Inoculacao.svelte")
		}),
		"/production/odp/monitoramento": wrap({
			asyncComponent: () => import("./routes/Monitoramento.svelte")
		}),
		"/production/odp/fermentacao": wrap({
			asyncComponent: () => import("./routes/Fermentacao.svelte")
		}),
		"/production/odp/ph": wrap({
			asyncComponent: () => import("./routes/MedicaoPh.svelte")
		}),
		"/production/odp/levedura": wrap({
			asyncComponent: () => import("./routes/ColetaLevedura.svelte")
		}),
		"/production/odp/dryhopping": wrap({
			asyncComponent: () => import("./routes/DryHopping.svelte")
		}),
		"/production/odp/carbonatacao": wrap({
			asyncComponent: () => import("./routes/Carbonatacao.svelte")
		}),
		"/production/odp/transferencia": wrap({
			asyncComponent: () => import("./routes/Transferencia.svelte")
		}),
		"/production/odp/envase": wrap({
			asyncComponent: () => import("./routes/Envase.svelte")
		}),
		"/production/odp/brassagem": wrap({
			asyncComponent: () => import("./routes/Brassagem.svelte")
		}),
		"/production/odp/printdocsop": wrap({
			asyncComponent: () => import("./routes/PrintDocumentsOp.svelte")
		}),
	}}
/>
