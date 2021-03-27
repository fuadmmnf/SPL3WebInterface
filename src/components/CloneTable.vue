<template>
  <div class="q-pa-md">
    <q-table
        title="Clone Analysis"
        :data="data"
        :columns="tableColumns"
        color="primary"
        row-key="files"
        :loading="loading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: "CloneTable",
  props: ['data', 'loading'],
  data() {
    return {
      search: '',
      tableRows: this.data,
      tableColumns:  [
        {
          name: 'files',
          required: true,
          label: 'Files',
          align: 'left',
          field: row => row.file1 + " " + row.file2,
        },
        // { name: 'file1', align: 'left', label: 'File-1', field: 'file1', sortable: true },
        { name: 'method1', align: 'left', label: 'Method-1', field: row => row.file1_method.name + "(line: " + row.file1_method.line_number + ")",  sortable: true },
        // { name: 'file1', align: 'left', label: 'File-1', field: 'file1', sortable: true },
        { name: 'method2', align: 'left', label: 'Method-2', field: row => row.file2_method.name + "(line: " + row.file2_method.line_number + ")",  sortable: true },
        // { name: 'probabilities', align: 'left', label: 'Clone Probability', field: row => row.probability.split('"').join(''), sortable: true },
        { name: 'type', align: 'left', label: 'Clone Type', field: 'type'},
      ],
    }
  }
}
</script>

<style scoped>

</style>
