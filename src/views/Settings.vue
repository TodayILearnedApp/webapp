<template>
  <div>settings</div>
</template>

<script lang="ts">
import firebase from "firebase";

import { Component, Vue } from "vue-property-decorator";

import { config } from "@/domains/settings/config";

@Component({
  components: {},
  async data() {
    const user = firebase.auth().currentUser;

    console.log("user", user);
    const databaseUser = await firebase
      .firestore()
      .collection(config.collection_endpoint)
      .doc(user.uid)
      .get();

    console.log("du", databaseUser);

    return {
      displayName: user ? user.displayName : null
    };
  }
})
export default class Home extends Vue {}
</script>
