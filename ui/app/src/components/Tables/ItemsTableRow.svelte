<script>
	export let objectInfo;
	let nome = objectInfo["DESCRICAO"] || "";
	let codigo = objectInfo["COD_CERVEJA"] || "";
</script>

<tr>
    <th scope="row">{codigo}</th>
	<th scope="row" class="leftALign">{nome}</th>
</tr>

<style>
    tr {
        text-align: center;
    }

    th {
        vertical-align: middle;
        align-items: center;
		font-weight: lighter;
    }

	.leftALign {
		text-align: left;
	}
</style>
