<template>
  <div class="q-mt-md q-px-sm">
    <q-card>
      <q-table
          grid
          grid-header
          title="Treats"
          :data="usercollections"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
      >
        <template v-slot:top-right>
          <q-btn
              color="primary"
              icon-right="archive"
              label="Add Collection"
              no-caps
              @click="createCollection(collectionForm)"
          />
        </template>

      </q-table>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Collections",
  data() {
    return {
      filter: '',
      usercollections: [],
      collectionForm: {
        name: '',
        description: '',
        owner: null,
        trialCount: 0
      },
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
    this.getDB.collection('usercollections').doc(this.getUser.uid).get()
        .then((datasnapshot) => {
          this.usercollections = datasnapshot.data()['collections']
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
  },
  methods: {
    createCollection() {
      this.getDB.collection('collections').doc().set(this.collectionForm)
          .then((result) => {
            this.getDB.collection('usercollections').doc(this.getUser.uid).set({
                  user_uid: this.getUser.uid,
                  collections: [...this.usercollections, { id: result.id, ...this.collectionForm }]
                }
            )
          })

    }
  }


}
</script>

<style scoped>

</style>
