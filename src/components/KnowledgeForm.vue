<template>
  <div class="form">
    <input
      v-model="form.title"
      class="input"
      type="text"
      placeholder="What did you learn ?"
      v-focus
    >
    <VueEditor
      v-model="form.description"
      placeholder="Let's write a quick definition / explanation"
      :editorToolbar="[
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['code-block']
      ]"
    />
    <label class="label" for="date">
      When ? Default is
      <i>today</i>
    </label>
    <datepicker
      v-model="form.date"
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
      @tags-changed="newTags => form.tags = newTags"
    />
    <button v-if="mode === 'create'" class="submit-button" @click="addKnowledge">Add new knowledge</button>
    <button v-if="mode === 'edit'" class="submit-button" @click="editKnowledge">Edit knowledge</button>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import moment from "moment";
import get from "lodash/get";
import { Component, Prop, Vue } from "vue-property-decorator";
import Datepicker from "vuejs-datepicker";
import VueTagsInput from "@johmun/vue-tags-input";
import { VueEditor } from "vue2-editor";

import { Knowledge } from "../domains/knowledges/model";
import { config } from "../domains/knowledges/config";

@Component({
  components: {
    Datepicker,
    VueTagsInput,
    VueEditor
  },
  data() {
    return {
      tag: "",
      form: {
        title: get(this.knowledgeData, "title", ""),
        description: get(this.knowledgeData, "description", ""),
        date: get(this.knowledgeData, "date", new Date()),
        tags: get(this.knowledgeData, "tags", [])
      }
    };
  },
  methods: {
    editKnowledge: async function() {
      const { title, description, date, tags } = this.$data.form;

      const newDoc = {
        title,
        description,
        date: moment(date).format("YYYY-MM-DD"),
        tags: tags.map(i => i.text)
      };

      await this.save(newDoc);

      this.$router.push({ name: "user" });
    },
    addKnowledge: async function() {
      const { title, description, date, tags } = this.$data.form;

      const currentUser = firebase.auth().currentUser;
      const uid = currentUser.uid;

      const collection = firebase
        .firestore()
        .collection(config.collection_endpoint);

      await collection.add({
        title,
        description,
        date: moment(date).format("YYYY-MM-DD"),
        author: currentUser.uid,
        tags: tags.map(i => i.text)
      });

      this.$data.form = {
        title: "",
        description: "",
        date: new Date(),
        tags: []
      };

      this.$router.push({ name: "user" });
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  }
})
export default class KnowledgeForm extends Vue {
  @Prop() private knowledgeData!: object;
  @Prop() private mode!: string;
  @Prop() private save!: function;
}
</script>

<style lang="scss">
.quillWrapper {
  margin-top: 16px;
  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.3);
  .ql-container.ql-snow {
    border: none !important;
  }
  .ql-toolbar.ql-snow {
    border-right: none;
    border-left: none;
    border-top: none;
  }
}

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

