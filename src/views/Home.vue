<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>

    <button @click="socialLogin">Login with google</button>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";

import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  },
  methods: {
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log("user", result.user);
          this.$router.replace("user");
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    }
  }
})
export default class Home extends Vue {}
</script>
