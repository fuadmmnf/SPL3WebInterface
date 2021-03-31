<template>
  <div>
    <q-table
        grid
        :card-container-class="cardContainerClass"
        title="Authorized Users"
        :data="[collection.owner, ...collection.users]"
        :columns="columns"
        row-key="uid"
        hide-header
    >

      <template v-slot:top-right>
        <q-btn
            color="primary"
            icon="add"
            no-caps
            size="sm"
            fab-mini
            @click="isUserAddModalShowing = true"
        />


        <q-dialog v-model="isUserAddModalShowing">
          <q-card style="width: 400px; max-width: 80vw;">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Add Collaborator</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                  @submit="addCollaborator"
                  class="q-gutter-md"
              >
                <q-input label="email *"
                         dense v-model="collaboratorForm.email" autofocus />
                <q-btn label="Submit" type="submit" color="primary" />
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>


      </template>


      <template v-slot:item="props">
        <div class=" col-xs-12 col-sm-6 col-md-6">
          <q-card>

            <q-card-section>
              <div class="row">
                <div class="col-3">
                  <img alt="user_icon" :src="props.row.photoURL" width="55" height="58">
                </div>
                <div class="col">
                  <div>{{ props.row.displayName }} {{ !props.row.uid === collection.owner.uid ? '(owner)' : '' }}</div>
                  <div>{{ props.row.email }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "CollectionUsers",
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUserAddModalShowing: false,
      columns: [
        { name: 'name', label: 'Name', field: 'displayName' },
        { name: 'email', label: 'Email', field: 'email' }
      ],
      collaboratorForm: {
        email: '',
      }
    }
  },

  computed: {
    ...mapGetters('db', ['getDB']),
    cardContainerClass() {
      if (this.$q.screen.gt.xs) {
        return 'grid-masonry grid-masonry--' + (this.$q.screen.gt.sm ? '3' : '2')
      }

      return void 0
    },

  },
  methods: {
    addCollaborator() {
      this.getDB.collection('users').where('email', '==', this.collaboratorForm.email).get()
          .then((querySnapshot) => {
            if (querySnapshot.docs.length) {
              const user = querySnapshot.docs[0].data()
              this.getDB.collection('collections').doc(this.collection.doc_id)
                  .update({
                    users: [...this.collection.users, user],
                    stats: { ...this.collection.stats, [user.uid]: [0, 0, 0, 0] }
                  }).then(() => {
                this.collection.users.push(user)
                this.isUserAddModalShowing = false
                this.collaboratorForm.email = ''
              }).catch((e) => {
                alert('Failed to update collaborators: ' + e)
              })


              this.getDB.collection('usercollections').doc(user.uid).get()
                  .then((doc) => {
                    if (doc.exists) {
                      if (!(doc.data()).collections.find((c) => c.doc_id === this.collection.doc_id)) {
                        this.getDB.collection('usercollections').doc(user.uid).set({
                              user_uid: user.uid,
                              collections: [...doc.data().collections, {
                                doc_id: this.collection.doc_id,
                                name: this.collection.name,
                                description: this.collection.description,
                                owner: this.collection.owner,
                                trialCount: this.collection.trialCount
                              }],
                              // stats: { [user.uid]: [0, 0, 0, 0] }
                            }
                        ).catch((e) => {
                          alert('Failed to add collaborator: ' + e)
                        })
                      }
                    } else {
                      this.getDB.collection('usercollections').doc(user.uid).set({
                            user_uid: user.uid,
                            collections: [{
                              doc_id: this.collection.doc_id,
                              name: this.collection.name,
                              description: this.collection.description,
                              owner: this.collection.owner,
                              trialCount: this.collection.trialCount
                            }],
                            // stats: { [this.getUser.uid]: [0, 0, 0, 0] }
                          }
                      ).catch((e) => {
                        alert('Failed to add collaborator: ' + e)
                      })
                    }

                  })

            } else {
              alert('No user with mail: ' + this.collaboratorForm.email + ' registered')
            }
          }).catch((e) => {
        alert('Failed to find user, ' + e)
      })

    }
  }
}
</script>

<style lang="sass" scoped>
.grid-masonry
  flex-direction: column
  height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1

      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1

  &--3
    > div
      &:nth-child(3n + 1)
        order: 1

      &:nth-child(3n + 2)
        order: 2

      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>
