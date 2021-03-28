<template>
  <div class="q-mt-md q-px-sm">
    <div class="row">
      <div class="col q-px-sm">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{ collection.name }}</div>
            <div class="text-subtitle2">{{ collection.description }}</div>
          </q-card-section>

          <q-tabs v-model="leftTab" class="text-teal" align="justify">
            <q-tab label="History" name="history" />
            <q-tab label="Users" name="users" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="leftTab" keep-alive animated>
            <q-tab-panel name="history">
              <trial-history :trials="collectionTrials" />
            </q-tab-panel>

            <q-tab-panel name="users">
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
              v-model="rightTab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
          >
            <q-tab name="trials" label="Trials" />
            <q-tab name="statistics" label="Statistics" />
            <q-tab name="movies" label="Movies" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="rightTab" keep-alive animated>
            <q-tab-panel name="trials">
              <collection-trial :collection="collection" />
            </q-tab-panel>

            <q-tab-panel name="statistics">
              <div class="text-h6">Statistics</div>
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
import { mapGetters } from 'vuex'
import CollectionTrial from "../components/collection/CollectionTrial";
import TrialHistory from "../components/collection/TrialHistory";

export default {
  name: "CollectionDetails",
  components: { TrialHistory, CollectionTrial },
  data() {
    return {
      leftTab: 'history',
      rightTab: 'trials',
      collection: {
        doc_id: '',
        name: '',
        description: '',
        owner: null,
        trialCount: 0
      },
      collectionTrials: [],
    }
  },
  computed: {
    ...mapGetters('db', ['getDB'])
  },
  mounted() {
    this.fetchCollection()
    this.$root.$on('trial-saved', this.fetchCollectionTrials)
  },
  methods: {
    fetchCollection() {
      this.getDB.collection('collections').doc(this.$route.params.collection_id).get()
          .then((res) => {
            this.collection = res.data()
            this.collection.doc_id = res.id
            this.fetchCollectionTrials()
          })
          .catch((e) => {
            alert(e)
          })
    },
    fetchCollectionTrials() {
      this.getDB.collection('collections').doc(this.$route.params.collection_id).collection('trials').get()
          .then((querySnapshot) => {
            this.collectionTrials = querySnapshot.map((doc) => { return { doc_id: doc.id, ...doc.data() }})
          })
          .catch((e) => {
            alert(e)
          })
    }
  }
}
</script>

<style scoped>

</style>
