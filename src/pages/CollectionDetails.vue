<template>
  <div class="q-mt-md q-px-sm">
    <div class="row">
      <div class="col q-px-sm">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{ collection.name }}</div>
            <div class="text-subtitle2">{{ collection.description }}</div>
          </q-card-section>

          <q-tabs dense v-model="leftTab" class="text-teal" align="justify">
            <q-tab label="History" name="history" />
            <q-tab label="Collaborators" name="collaborators" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="leftTab" keep-alive animated>
            <q-tab-panel name="history">
              <trial-history :trials="collectionTrials" />
            </q-tab-panel>

            <q-tab-panel name="collaborators">
              <collection-users :collection="collection" />
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
<!--            <q-tab name="mentions" label="Mentions" />-->
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="rightTab" keep-alive animated>
            <q-tab-panel name="trials">
              <collection-trial :collection="collection" />
            </q-tab-panel>

            <q-tab-panel name="statistics">
              <collection-statistics :collection="collection" />
            </q-tab-panel>

<!--            <q-tab-panel name="mentions">-->
<!--              <div class="text-h6">Mentions</div>-->
<!--              Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
<!--            </q-tab-panel>-->
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
import CollectionUsers from "../components/collection/CollectionUsers";
import CollectionStatistics from "../components/collection/CollectionStatistics";

export default {
  name: "CollectionDetails",
  components: { CollectionStatistics, CollectionUsers, TrialHistory, CollectionTrial },
  data() {
    return {
      leftTab: 'history',
      rightTab: 'trials',
      collection: {
        doc_id: '',
        name: '',
        description: '',
        owner: null,
        users: [],
        stats: {},
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
            this.collectionTrials = !querySnapshot.docs.length ? [] : querySnapshot.docs.map((doc) => { return { doc_id: doc.id, ...doc.data() }})
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
