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
    <ul>
      <li :key="item.key" v-for="item in latestKnowledges">{{item}}</li>
    </ul>

    <h2>My knowledges</h2>
    <div class="timeline">
      <div class="knowledge" :key="item.key" v-for="item in knowledges">
        <div class="marker"/>
        <div class="date">{{ item.date | humanDate}}</div>
        <div class="content">
          <div class="title">{{item.title}}</div>
          <div class="title">{{item.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import moment from "moment";
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
      knowledges: [],
      latestKnowledges: []
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

      // get three latest knowledges
      firebase
        .firestore()
        .collection(config.collection_endpoint)
        .where("author", "==", currentUser.uid)
        .orderBy("date", "desc")
        .limit(3)
        .onSnapshot(convo => {
          let source = convo.metadata.hasPendingWrites ? "Local" : "Server";
          const knowledges = [];

          convo.docs.forEach(doc => {
            knowledges.push({
              [doc.id]: doc.data()
            });
          });

          this.latestKnowledges = knowledges;
        });

      firebase
        .firestore()
        .collection(config.collection_endpoint)
        .where("author", "==", currentUser.uid)
        .orderBy("date", "desc")
        .onSnapshot(convo => {
          let source = convo.metadata.hasPendingWrites ? "Local" : "Server";
          const knowledges = [];

          convo.docs.forEach(doc => {
            knowledges.push(doc.data());
          });
          console.log("know", knowledges);

          this.knowledges = knowledges;
          // TODO: add messages to store
        });

      const snapshot = await collection.get();

      // const knowledges: Array<{ [id: string]: Knowledge }> = [];
      const knowledges = [];

      snapshot.forEach(doc => {
        knowledges.push(doc.data());
      });

      this.knowledges = knowledges;
    }
  },
  filters: {
    humanDate: date => moment(date).format("YYYY-MM-DD")
  }
})
export default class User extends Vue {}
</script>


<style scoped lang="scss">
.timeline {
  display: flex;
  flex-direction: column;

  &:before {
    position: fixed;
    top: 0;
    height: 100%;
    padding-right: 0.5em;
    border-right: 2px solid #f2f2f2;
    content: "";
  }

  .knowledge {
    display: flex;
    align-items: stretch;
    margin-top: 2em;

    .marker {
      position: relative;
      display: table-cell;
      height: 1em;
      min-height: 1em;
      width: 1em;
      min-width: 1em;
      border: 4px solid red;
      border-radius: 50%;
      background-color: white;
      z-index: 0;
    }

    .date {
      padding-left: 1em;
    }
    .content {
      padding-left: 1em;
    }
  }
}
</style>
