<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    bonjour mr {{displayName}}
    <button @click="logout">sign out</button>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
  data() {
    const user = firebase.auth().currentUser;
    return {
      displayName: user ? user.displayName : null
    };
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
      this.$router.replace("home");
    }
  }
})
export default class User extends Vue {}
</script>
