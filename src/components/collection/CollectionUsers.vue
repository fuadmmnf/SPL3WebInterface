<template>
  <div>
    <q-table
        grid
        :card-container-class="cardContainerClass"
        title="Authorized Users"
        :data="collectionUsers"
        :columns="columns"
        row-key="uid"
        hide-header
    >

      <template v-slot:item="props">
        <div class=" col-xs-12 col-sm-6 col-md-6">
          <q-card>

            <q-card-section >
              <div class="row">
                <div class="col-3">
                  <img alt="user_icon" :src="props.row.photoURL" width="50" height="50">
                </div>
                <div class="col">
                  <div>{{ props.row.displayName }}</div>
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

export default {
  name: "CollectionUsers",
  props: {
    collectionUsers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      columns: [
        { name: 'name', label: 'Name', field: 'displayName' },
        { name: 'email', label: 'Email', field: 'email' }
      ],
    }
  },

  computed: {
    cardContainerClass () {
      if (this.$q.screen.gt.xs) {
        return 'grid-masonry grid-masonry--' + (this.$q.screen.gt.sm ? '3' : '2')
      }

      return void 0
    },

  },
  methods: {

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
