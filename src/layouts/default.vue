<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-teal">
        <q-toolbar-title class="text-bold">
          Clone Predictor <b class="text-caption">( by Mridha Md. Nafis Fuad )</b>
        </q-toolbar-title>
        <q-tabs shrink stretch>
          <q-route-tab name="predict" label="Predict" to="/detector" exact />
          <q-route-tab v-if="getUser" name="collections" label="Collections" to="/collections" exact />
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
    return {
      tab: 'predict'
    }
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('db', ['getDB'])
  },
  mounted() {

  },
  methods: {
    ...mapMutations('auth', ['loggedIn', 'loggedOut']),
    signInWithGmail() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        const { uid, displayName, email, photoURL } = result.user
        if (uid && displayName && email && photoURL) {
          const userInfo = { uid, displayName, email, photoURL }
          this.loggedIn(userInfo)
          this.getDB.collection('users').doc(userInfo.uid).set(userInfo)
          this.$router.replace('detector').catch(() => {});

        }

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
              this.$router.replace('/detector').catch(() => {});
            }
          });

    }
  }
}
</script>
