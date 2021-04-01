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
                <q-icon class="q-mt-sm" name="code"/>
              </template>

              <template v-slot:append>
                <q-btn  round dense flat icon="clear" @click="files = null"/>
              </template>
            </q-file>
            <q-btn :disable="requestSubmitted" class="col-2 q-ma-md" unelevated color="primary" label="proceed" @click="readAllFiles"/>
          </div>
        </q-card-section>
      </q-card>


    </div>

    <div  v-if="requestSubmitted || results.length">
          <clone-table :loading="isLoading || requestSubmitted" :data="results"/>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

import CloneTable from "@/components/CloneTable";

export default {
  components: {
    'clone-table': CloneTable
  },
  data() {
    return {
      isLoading: true,
      requestSubmitted: false,
      files: null,
      sourceCodes: [],
      results: []
    }
  },
  methods: {
    detectFileSimilarity() {
      this.requestSubmitted = true;
      axios.post(`${process.env.VUE_APP_BACKEND_API}/check/duplicates`, {files: this.sourceCodes})
          .then((response) => {
            if (response.status === 200) {
              this.sourceCodes = [];
              this.results = response.data.data;
              this.isLoading = false;
              this.requestSubmitted = false;
            }
          })
          .catch((e) => {
            this.requestSubmitted = false;
            console.error(e);
            alert('Source File not valid')
          });
    },
    readAllFiles() {
      this.loading = true
      this.results = []
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
            this.detectFileSimilarity();
          }
        };
        reader.readAsText(file);
      });


    }
  }
}
</script>
<style scoped>
</style>
