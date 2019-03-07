<template>
  <div class="home">
    <input v-model="form.title" class="input" type="text" placeholder="Title">
    <input v-model="form.description" class="input" type="text" placeholder="Description">
    <button @click="addKnowledge">add</button>
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
    return {
      form: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
    addKnowledge: async function() {
      const { title } = this.$data.form;
      console.log("this", title);

      const currentUser = firebase.auth().currentUser;
      const uid = currentUser.uid;

      const collection = firebase
        .firestore()
        .collection(config.collection_endpoint);

      await collection.add({
        title,
        author: currentUser.uid
      });

      this.$data.form = {
        title: "",
        description: ""
      };
    }
  }
})
export default class KnowledgeForm extends Vue {}
</script>
