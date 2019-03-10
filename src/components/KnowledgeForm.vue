<template>
  <div class="home">
    <input v-model="form.title" class="input" type="text" placeholder="Title">
    <input v-model="form.description" class="input" type="text" placeholder="Description">
    <input v-model="form.date" class="input" type="date" placeholder="Date">
    <button @click="addKnowledge">add</button>
    {{form.date}}
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import moment from 'moment'
import { Component, Vue } from "vue-property-decorator";

import { Knowledge } from "../domains/knowledges/model";
import { config } from "../domains/knowledges/config";

@Component({
  components: {},
  data() {
    return {
      form: {
        title: "",
        description: "",
        date: moment().format('YYYY-MM-DD'),
      }
    };
  },
  methods: {
    addKnowledge: async function() {
      const { title, description, date } = this.$data.form;

      const currentUser = firebase.auth().currentUser;
      const uid = currentUser.uid;

      const collection = firebase
        .firestore()
        .collection(config.collection_endpoint);

      await collection.add({
        title,
        description,
        date,
        author: currentUser.uid
      });

      this.$data.form = {
        title: "",
        description: "",
        date: moment().format('YYYY-MM-DD'),
      };
    }
  }
})
export default class KnowledgeForm extends Vue {}
</script>
