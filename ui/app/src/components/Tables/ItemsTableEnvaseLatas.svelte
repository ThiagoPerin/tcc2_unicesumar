<script>
	export let objectInfo;
    let  envaseDescarte = objectInfo["DESCARTE"] || "";
	let envaseLab = objectInfo["LAB"] || "";
	let envaseProduto = objectInfo["PRODUTO"] || "";
	let envaseQuantidade= objectInfo["QUANTIDADE"] || "";

</script>

<tr>
    <th scope="row" class="leftALign">{envaseProduto}</th>
	<th scope="row">{envaseDescarte}</th>
	<th scope="row">{envaseLab}</th>
	<th scope="row">{envaseQuantidade}</th>
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
