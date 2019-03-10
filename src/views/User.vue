<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    bonjour mr {{displayName}}
    <button @click="logout">sign out</button>
    <ul>
      <li :key="item.key" v-for="item in knowledges">{{item}}</li>
    </ul>

    <KnowledgeForm/>

    <h2>My latest knowledges</h2>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { Component, Vue } from "vue-property-decorator";

import { Knowledge } from "../domains/knowledges/model";
import { config } from "../domains/knowledges/config";
import KnowledgeForm from "@/components/KnowledgeForm";

@Component({
  components: {
    KnowledgeForm
  },
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
      const currentUser = firebase.auth().currentUser;

      const collection = firebase
        .firestore()
        .collection(config.collection_endpoint)
        .where("author", "==", currentUser.uid);

      firebase
        .firestore()
        .collection(config.collection_endpoint)
        .where("author", "==", currentUser.uid)
        .onSnapshot(convo => {
          let source = convo.metadata.hasPendingWrites ? "Local" : "Server";
          const knowledges = [];

          convo.docs.forEach(doc => {
            knowledges.push({
              [doc.id]: doc.data()
            });
          });

          this.knowledges = knowledges;
          // TODO: add messages to store
        });

      const snapshot = await collection.get();

      // const knowledges: Array<{ [id: string]: Knowledge }> = [];
      const knowledges = [];

      snapshot.forEach(doc => {
        knowledges.push({
          [doc.id]: doc.data()
        });
      });

      this.knowledges = knowledges;
    }
  }
})
export default class User extends Vue {}
</script>
