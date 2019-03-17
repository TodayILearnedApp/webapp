<template>
  <div class="form-container">
    <KnowledgeForm v-if="knowledgeData" :knowledgeData="knowledgeData" mode="edit" :save="save"/>
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
  async mounted() {
    const doc = await firebase
      .firestore()
      .collection(config.collection_endpoint)
      .doc(this.$route.params.id)
      .get();

    const data = doc.data();

    this.knowledgeData = {
      ...data,
      tags: data.tags.map(t => ({ text: t }))
    };
  },
  data() {
    return {
      knowledgeData: null
    };
  },
  methods: {
    save: async function(newData) {
      const id = this.$route.params.id;

      console.log("ne dat", newData);

      await firebase
        .firestore()
        .collection(config.collection_endpoint)
        .doc(id)
        .update(newData);
    }
  },
  filters: {}
})
export default class Edit extends Vue {}
</script>

<style scoped>
.form-container {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
