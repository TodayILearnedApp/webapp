<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    bonjour mr {{displayName}}
    <button @click="logout">sign out</button>
    <ul>
      <li :key="item.key" v-for="item in knowledges">{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { Component, Vue } from "vue-property-decorator";

import { Knowledge } from "../domains/knowledges/model";
import { config } from "../domains/knowledges/config";

@Component({
  components: {},
  data() {
    const user = firebase.auth().currentUser;

    return {
      displayName: user ? user.displayName : null,
      knowledges: []
    };
  },
  mounted() {
    this.getKnowledges();
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
      this.$router.replace("home");
    },
    async getKnowledges() {
      const collection = firebase
        .firestore()
        .collection(config.collection_endpoint);

      const snapshot = await collection.get();

      // const knowledges: Array<{ [id: string]: Knowledge }> = [];
      const knowledges = [];

      snapshot.forEach(doc => {
        knowledges.push({
          [doc.id]: doc.data()
        });
      });

      console.log("know", knowledges);

      this.knowledges = knowledges;
    }
  }
})
export default class User extends Vue {}
</script>
