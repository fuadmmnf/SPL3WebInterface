<template>
  <div>
    <q-btn color="white" text-color="black" @click="signInWithGmail">Sign In</q-btn>
  </div>
</template>
<script>
import firebase from "firebase";
import 'firebase/auth';
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
    }

  }
}
</script>
<style scoped>
</style>
