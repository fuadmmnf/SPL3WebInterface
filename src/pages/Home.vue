<template>
  <div class="row justify-center" style="margin-top: 20%">
    <q-card v-if="!results.length" class="my-card">
      <q-card-section class="row">
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

    <q-card v-else class="my-card">
      <q-card-section>
        <div class="">

        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
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
<style lang="sass">

</style>