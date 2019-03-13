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
    <div class="vertical-knowledges-container">
      <VerticalKnowledge
        :date="item.date"
        :title="item.title"
        :description="item.description"
        :key="item.key"
        v-for="item in latestKnowledges"
      />
    </div>

    <h2>My knowledges</h2>
    <!--<div class="timeline">-->
    <!--  <div class="knowledge" :key="item.key" v-for="item in knowledges">-->
    <!--    <div class="marker-container">-->
    <!--      <div class="marker"/>-->
    <!--    </div>-->
    <!--    <div class="date">{{ item.date | humanDate}}</div>-->
    <!--    <div class="content">-->
    <!--      <div class="title">{{item.title}}</div>-->
    <!--      <div class="description">{{item.description}}</div>-->
    <!--    </div>-->
    <!--  </div>-->
    <!--</div>-->
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import moment from "moment";
import { Component, Vue } from "vue-property-decorator";

import { Knowledge } from "../domains/knowledges/model";
import { config } from "../domains/knowledges/config";
import KnowledgeForm from "@/components/KnowledgeForm";
import VerticalKnowledge from "@/components/VerticalKnowledge";

@Component({
  components: {
    VerticalKnowledge,
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
            knowledges.push(doc.data());
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
    }
  },
  filters: {
    humanDate: date => moment(date).format("YYYY-MM-DD")
  }
})
export default class User extends Vue {}
</script>


<style scoped lang="scss">
.vertical-knowledges-container {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.timeline {
  margin: 0 auto;
  max-width: 1024px;

  display: flex;
  flex-direction: column;

  &:before {
    position: fixed;
    top: 0;
    height: 100%;
    padding-right: 11px;
    border-right: 2px solid #f2f2f2;
    content: "";
  }

  .knowledge {
    display: flex;
    align-items: stretch;
    margin-top: 2em;

    .marker-container {
      padding-right: 62px;
    }
    .marker {
      position: relative;
      display: table-cell;

      // size
      height: 24px;
      min-height: 24px;
      width: 24px;
      min-width: 24px;

      // border
      border: 2px solid #ff1744;
      border-radius: 50%;

      background-color: white;
      z-index: 0;

      box-sizing: border-box;
    }

    .date {
      padding-right: 126px;
    }
    .content {
      .title {
        font-size: 0.9em;
      }
      .description {
        font-size: 0.7em;
        color: #808080;
      }
    }
  }
}
</style>
