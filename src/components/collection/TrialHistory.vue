<template>
  <q-table
      title="Recent Trials"
      :data="trials"
      :columns="columns"
      row-key="doc_id"
      :expanded.sync="expanded"
  >

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width />

        <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-toggle v-model="props.expand" checked-icon="add" unchecked-icon="remove" />
        </q-td>

        <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
        >
          {{ col.value }}
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
        </q-td>
      </q-tr>
    </template>

    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>


    <template v-slot:body-cell-method1="props">
      <q-td :props="props">
        <div>
          <q-badge color="secondary" class="text-bold" :label="props.row.file1_method.name" />
        </div>
        <div class="my-table-details">
          {{ `${props.row.file1} (line: ${props.row.file1_method.line_number})` }}
        </div>
      </q-td>
    </template>

    <template v-slot:body-cell-method2="props">
      <q-td :props="props">
        <div>
          <q-badge outline color="secondary" class="text-bold" :label="props.row.file2_method.name" />
        </div>
        <div class="my-table-details">
          {{ `${props.row.file2} (line: ${props.row.file2_method.line_number})` }}
        </div>
      </q-td>
    </template>


    <template v-slot:body-cell-type="props">
      <q-td :props="props">
        <div>
          <q-badge color="secondary" class="text-bold" :label="props.row.type.name" />
        </div>
        <div class="my-table-details">
          {{ props.row.type.probability.slice(0, 5) }}
        </div>
      </q-td>
    </template>

  </q-table>
</template>

<script>
export default {
  name: "TrialHistory",
  props: {
    trials: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      expanded: [ // Array of row keys
        'Ice cream sandwich'
      ],

      columns: [
        {
          name: 'method1',
          required: true,
          label: 'Method 1',
          align: 'center',
          field: row => row,
        },
        {
          name: 'method2',
          required: true,
          label: 'Method 2',
          align: 'center',
          field: row => row,
        },
        // { name: 'file1', align: 'left', label: 'File-1', field: 'file1', sortable: true },
        // { name: 'method1', align: 'left', label: 'Method-1', field: row => row.file1_method.name + "(line: " + row.file1_method.line_number + ")",  sortable: true },
        // { name: 'file1', align: 'left', label: 'File-1', field: 'file1', sortable: true },
        // { name: 'method2', align: 'left', label: 'Method-2', field: row => row.file2_method.name + "(line: " + row.file2_method.line_number + ")",  sortable: true },
        // { name: 'probabilities', align: 'left', label: 'Clone Probability', field: row => row.probability.split('"').join(''), sortable: true },
        { name: 'type', align: 'center', label: 'Clone Type', field: row => row, },
        { name: 'user', align: 'center', label: 'User', field: row => row.user.displayName },
      ],

    }
  }
}
</script>

<style scoped>

</style>
