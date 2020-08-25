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
                <q-icon name="code"/>
              </template>

              <template v-slot:append>
                <q-btn round dense flat icon="clear" @click="files = null"/>
              </template>
            </q-file>
            <q-btn class="col-2 q-ma-md" unelevated color="primary" label="proceed" @click="detectFileSimilarity"/>
          </div>
        </q-card-section>
      </q-card>


    </div>

    <div v-if="isLoading || results.length" class="row justify-center q-ma-md">
      <q-card class="my-card" style="width: 45%; height: 50%">
        <q-card-section class="row justify-center">
          <div v-if="isLoading">
            <q-circular-progress
                indeterminate
                size="50px"
                :thickness="0.22"
                color="blue"
                track-color="grey-3"
                class="q-ma-md"
            />
          </div>
          <div v-else>

          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoading: true,
      files: null,
      sourceCodes: [],
      results: []
    }
  },
  methods: {
    detectFileSimilarity() {
      this.sourceCodes = [];
      this.files.forEach(file => {
        let reader = new FileReader();
        reader.onloadend = () => {
          this.sourceCodes.push(reader.result);
        };
        reader.readAsText(file);
      });


      axios.post('', {contents: this.sourceCodes})
          .then((response) => {
            if (response.status === 200) {
              this.results = response.data;
            }
          })

    }
  }
}
</script>
<style scoped>
</style>
