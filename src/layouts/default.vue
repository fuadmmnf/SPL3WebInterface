<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-teal">
        <q-toolbar-title class="text-bold">
          Clone Predictor <b class="text-caption">( by Mridha Md. Nafis Fuad )</b>
        </q-toolbar-title>
        <q-tabs v-model="tab" shrink stretch>
          <q-tab name="tab2" label="Predict" />
          <q-tab v-if="getUser" name="Collections" label="Collections" />
          <!--          <q-tab name="tab3" label="Tab 3" />-->
        </q-tabs>
        <q-btn flat v-if="getUser" round dense icon="person_remove" @click="logout" />
        <q-btn flat v-else round dense icon="person_add_alt" @click="signInWithGmail" />

      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import firebase from "firebase";
import 'firebase/auth';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'default',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters('auth', ['getUser'])
  },
  mounted() {

  },
  methods: {
    ...mapMutations('auth', ['loggedIn', 'loggedOut']),
    ...mapMutations('db', ['updateUser']),
    signInWithGmail() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.loggedIn(result.user)
        this.updateUser(result.user)
        this.$router.replace('detector');
      }).catch((err) => {
        alert('Oops. ' + err.message)
      });
    },
    logout() {
      firebase
          .auth()
          .signOut()
          .then(() => {
            this.loggedOut()
            if (this.$route.name === 'detector') {
              this.$router.go(0)
            } else {
              this.$router.replace('detector');
            }
          });

    }
  }
}
</script>
