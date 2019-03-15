<template>
  <div class="form">
    <input v-model="form.title" class="input" type="text" placeholder="What did you learn ?">
    <textarea
      v-model="form.description"
      class="input"
      type="text"
      placeholder="Let's write a quick definition / explanation"
      rows="5"
    />
    <label class="label" for="date">
      When ? Default is
      <i>today</i>
    </label>
    <datepicker
      :value="form.date"
      name="date"
      input-class="input"
      placeholder="Date"
      format="yyyy-MM-dd"
    />
    <label class="label" for="date">Let's put some tags to help us find that later</label>
    <VueTagsInput
      placeholder="What about 'word' or 'it' or 'general' ?"
      v-model="tag"
      :tags="form.tags"
      @tags-changed="newTags => tags = newTags"
    />
    <button class="submit-button" @click="addKnowledge">Add new knowledge</button>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import moment from "moment";
import { Component, Vue } from "vue-property-decorator";
import Datepicker from "vuejs-datepicker";
import VueTagsInput from "@johmun/vue-tags-input";

import { Knowledge } from "../domains/knowledges/model";
import { config } from "../domains/knowledges/config";

@Component({
  components: {
    Datepicker,
    VueTagsInput
  },
  data() {
    return {
      tag: "",
      form: {
        title: "",
        description: "",
        date: new Date(),
        tags: []
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
        date: moment().format("YYYY-MM-DD")
      };
    }
  }
})
export default class KnowledgeForm extends Vue {}
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;

  max-width: 512px;

  .label {
    margin-top: 16px;
  }

  .ti-input,
  .input {
    padding: 16px;
    border-radius: 8px;
    margin-top: 16px;
    border: 0;
    box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.3);
    font-size: 1.2rem;

    min-width: 512px;

    box-sizing: border-box;
  }

  .submit-button {
    border: none;
    font-size: 2rem;
    margin-top: 32px;
    background-image: linear-gradient(
      to right,
      #f6d365 0%,
      #fda085 51%,
      #f6d365 100%
    );
    border-radius: 10px;
    flex: 1 1 auto;
    padding: 30px;
    text-align: center;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    font-family: "Roboto Slab", serif;
    font-weight: bold;

    &:hover {
      background-position: right center; /* change the direction of the change here */
      transition: 0.5s;
      cursor: pointer;
    }
  }
}
</style>

