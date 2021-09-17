<template>
    <download-excel
        class="btn btn-default"
        :data="json_data"
        :fields="json_fields"
        type="csv"
        name="filename.xls"
        >
        Download CSV (you can customize this with html code!)
    </download-excel>
</template>

<script>
export default {
    name: "json-excel"
}
</script>

<style>

</style>