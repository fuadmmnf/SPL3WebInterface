<template>
  <div class="q-mt-md q-px-sm">
    <q-card>
      <q-table
          grid
          grid-header
          title="Collections"
          :data="usercollections"
          :columns="columns"
          row-key="doc_id"
          :filter="filter"
          hide-header
      >
        <template v-slot:top-right>
          <q-btn
              color="primary"
              icon-right="archive"
              label="Add Collection"
              no-caps
              @click="isCollectionModalShowing = true"
          />


          <q-dialog v-model="isCollectionModalShowing">
            <q-card style="width: 400px; max-width: 80vw;">
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Collection Create</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-form
                    @submit="createCollection"
                    class="q-gutter-md"
                >
                  <q-input label="name *"
                           dense v-model="collectionForm.name" autofocus />
                  <q-input label="Description (optionla)"
                           dense v-model="collectionForm.description" />

                  <q-btn label="Submit" type="submit" color="primary" />
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>


        </template>

      </q-table>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const returnCollectionFormTemplate = () => {
  return {
    name: '',
    description: '',
    owner: null,
    trialCount: 0
  }
}

export default {
  name: "Collections",
  data() {
    return {
      filter: '',
      isCollectionModalShowing: false,
      usercollections: [],
      collectionForm: returnCollectionFormTemplate(),
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' }
      ],
      data: []
    }
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('db', ['getDB'])
  },
  mounted() {
    this.collectionForm.owner = this.getUser
    this.fetchCollections()
  },
  methods: {
    fetchCollections() {
      this.getDB.collection('usercollections').doc(this.getUser.uid).get()
          .then((datasnapshot) => {
            this.usercollections = datasnapshot.data()['collections']
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
    },
    createCollection() {
      this.getDB.collection('collections').add(this.collectionForm)
          .then((result) => {
            this.getDB.collection('usercollections').doc(this.getUser.uid).set({
                  user_uid: this.getUser.uid,
                  collections: [...this.usercollections, { doc_id: result.id, ...this.collectionForm }]
                }
            ).then(() => {
              this.usercollections.push({ doc_id: result.id, ...this.collectionForm })
              this.collectionForm = returnCollectionFormTemplate()
              this.isCollectionModalShowing = false
            })
                .catch((e) => {
                  this.collectionForm = returnCollectionFormTemplate()
                  this.isCollectionModalShowing = false
                  alert('Failed to create collection: ' + e)
                })
          })
          .catch((e) => {
            this.collectionForm = returnCollectionFormTemplate()
            this.isCollectionModalShowing = false
            alert('Failed to create collection: ' + e)
          })

    }
  }


}
</script>

<style scoped>

</style>
