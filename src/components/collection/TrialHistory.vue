<template>
  <q-table
      title="Recent Trials"
      :data="trials"
      :columns="columns"
      row-key="doc_id"
      :expanded.sync="expanded"
  >

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
          <q-badge color="secondary" class="text-bold" :label="props.row.file2_method.name" />
        </div>
        <div class="my-table-details">
          {{ `${props.row.file2} (line: ${props.row.file2_method.line_number})` }}
        </div>
      </q-td>
    </template>


    <template v-slot:body-cell-type="props">
      <q-td :props="props">
        <q-tooltip>
          User: {{ props.row.user.displayName }}
        </q-tooltip>
        <div>
          <q-badge color="secondary" class="text-bold" :label="props.row.type.name" />
        </div>
        <div class="my-table-details">
          {{ props.row.type.probability.slice(0, 5) }}
        </div>
      </q-td>
    </template>


    <template v-slot:body-cell-status="props">
      <q-td :props="props">
        <div>
          <div class="cursor-pointer">
            <q-badge
                :color="['warning', 'secondary', 'positive'][props.row.status === 'Pending'? 0: props.row.status === 'Working'? 1: 2]"
                class="text-bold" :label="props.row.status" @click="trialStatus = props.row.status" />
            <q-popup-edit :value="props.row.status">
              <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                <q-select
                    v-model="trialStatus"
                    :options="['Pending', 'Working', 'Resolved']"
                    :value="props.row.status"
                    hint="Clone Status"
                >
                  <template v-slot:after>
                    <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel" />
                    <q-btn flat dense color="positive" icon="check_circle"
                           @click.stop="(e) => {
                             $root.$emit('trial-status-changed', props.row, trialStatus)
                             cancel()
                           }"
                           :disable="props.row.status === trialStatus" />
                  </template>
                </q-select>
              </template>
            </q-popup-edit>
          </div>
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
      trialStatus: '',

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
        { name: 'type', align: 'center', label: 'Clone Type', field: row => row, sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: row => row.status, sortable: true },
      ],

    }
  },
}
</script>

<style scoped>

</style>
