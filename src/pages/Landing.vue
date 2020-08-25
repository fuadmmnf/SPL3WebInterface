<template>
  <div class="row justify-center" style="margin-top: 20%">
    <q-card class="my-card">
      <q-card-section>
        <div class="">
          <q-file
              v-model="files"
              label="Pick files"
              filled
              multiple
              style="width: 400px"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      files: null
    }
  },
  methods: {

  }
}
</script>
<style lang="sass">

</style>