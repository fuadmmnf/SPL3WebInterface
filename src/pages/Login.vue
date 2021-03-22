<template>
  <div>
    <q-btn @click="signInWithGmail">Sign In</q-btn>
  </div>
</template>
<script>
import firebase from "firebase/app";
import { mapMutations } from 'vuex';

export default {
  components: {},
  data() {
    return {}
  },
  mounted() {

  },
  methods: {
    ...mapMutations('auth', ['loggedIn']),
    signInWithGmail() {
      const provider = firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.loggedIn(result)
        this.$router.replace('home');
      }).catch((err) => {
        alert('Oops. ' + err.message)
      });
    }

  }
}
</script>
<style scoped>
</style>
