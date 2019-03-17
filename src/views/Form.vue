<template>
  <div class="form-container">
    <KnowledgeForm mode="create"/>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import moment from "moment";
import { Component, Vue } from "vue-property-decorator";

import { Knowledge } from "@/domains/knowledges/model";
import { config } from "@/domains/knowledges/config";
import KnowledgeForm from "@/components/KnowledgeForm";

@Component({
  components: {
    KnowledgeForm
  },
  data() {
    return {};
  },
  methods: {},
  filters: {}
})
export default class Form extends Vue {}
</script>

<style scoped>
.form-container {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
