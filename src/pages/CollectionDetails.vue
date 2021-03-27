<template>
  <div class="q-mt-md q-px-sm">
    <div class="row">
      <div class="col q-px-sm">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">asa</div>
            <div class="text-subtitle2">ewf</div>
          </q-card-section>

          <q-tabs v-model="tab" class="text-teal" align="justify">
            <q-tab label="Trials" name="trials" />
            <q-tab label="Users" name="users" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="one">
              The QCard component is a great way to display important pieces of grouped content.
            </q-tab-panel>

            <q-tab-panel name="two">
              With so much content to display at once, and often so little screen real-estate,
              Cards have fast become the design pattern of choice for many companies, including
              the likes of Google and Twitter.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col q-px-sm">
        <q-card>
          <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
          >
            <q-tab name="mails" label="Mails" />
            <q-tab name="alarms" label="Alarms" />
            <q-tab name="movies" label="Movies" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="mails">
              <div class="text-h6">Mails</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="movies">
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "CollectionDetails",
  data() {
    return {}
  },
  computed: {
    ...mapGetters('db', ['getDB'])
  },
  mounted(){
    this.fetchCollection()
  },
  methods: {
    fetchCollection(){

    }
  }
}
</script>

<style scoped>

</style>
