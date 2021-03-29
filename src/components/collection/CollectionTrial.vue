<template>
  <div>
    <div class="row justify-center q-ma-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="row">
            <q-file
                class="col"
                v-model="files"
                label="Pick Java Source files"
                filled
                multiple
                style="width: 400px"
            >
              <template v-slot:before>
                <q-icon class="q-mt-sm" name="code" />
              </template>

              <template v-slot:append>
                <q-btn round dense flat icon="clear" @click="clearTrial" />
              </template>
            </q-file>
            <q-btn class="col-2 q-ma-md" unelevated color="primary" label="proceed" @click="readAllFiles" />
          </div>
        </q-card-section>
      </q-card>


    </div>

    <div>
      <div class="q-pa-md">
        <q-table
            title="Clone Analysis"
            selection="multiple"
            :selected.sync="selected"
            :data="results"
            :columns="tableColumns"
            color="primary"
            row-key="files"
            :loading="requestSubmitted"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>

          <template v-slot:top-right>
            <q-btn
                :disable="!selected.length"
                flat
                color="warning"
                icon-right="delete"
                label="Remove"
                class="q-mx-sm"
                no-caps
                @click="results = results.filter((r) => selected.indexOf(r) === -1 )"
            />

            <q-btn
                flat
                :disable="!results.length"
                color="primary"
                icon-right="archive"
                label="Save"
                no-caps
                @click="saveTrialToCollection"
            />


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
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex'

export default {
  name: 'CollectionTrial',
  components: {},
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      requestSubmitted: false,
      files: null,
      sourceCodes: [],
      results: [],
      selected: [],
      search: '',
      tableColumns: [
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
      ],
    }
  },
  computed: {
    ...mapGetters('db', ['getDB']),
    ...mapGetters('auth', ['getUser'])
  },
  methods: {
    clearTrial(){
      this.files = null
      this.results = []
      this.selected = []
    },
    readAllFiles() {
      this.sourceCodes = [];
      let fileCount = this.files.length;
      this.files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          this.sourceCodes.push(
              {
                name: file.name,
                content: reader.result
              }
          );

          if (this.sourceCodes.length === fileCount) {
            // console.log('aise ekhane');
            this.detectFileSimilarity();
          }
        };
        reader.readAsText(file);
      });

    },

    detectFileSimilarity() {
      this.requestSubmitted = true;
      axios.post(`${process.env.VUE_APP_BACKEND_API}/check/duplicates`, { files: this.sourceCodes })
          .then((response) => {
            if (response.status === 200) {
              this.sourceCodes = [];
              this.results = response.data.data;
              this.requestSubmitted = false;
            }
          })
          .catch((e) => {
            this.requestSubmitted = false;
            console.error(e);
          });
    },


    saveTrialToCollection() {
      const batch = this.getDB.batch()
      const collectionRef = this.getDB.collection('collection').doc(this.collection.doc_id)
          .collection('trials')

      this.results.forEach((trial) => {
        const docRef = collectionRef.doc()
        batch.set(docRef, {
          doc_id: docRef.id,
          user: this.getUser,
          status: 'Pending',
          ...trial
        })
      })

      batch.commit()
          .then(() => {
            this.clearTrial()
            this.$root.$emit('trial-saved')
          })
          .catch((e) => {
            alert('Failed to store trial: ' + e)
          })
    }
  }
}
</script>
<style scoped>
</style>
