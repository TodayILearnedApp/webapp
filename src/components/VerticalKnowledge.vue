<template>
  <div class="container">
    <div>{{title}}</div>
    <div>{{date}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
  methods: {}
})
export default class VerticalKnowledge extends Vue {
  @Prop() private date!: string;
  @Prop() private title!: string;
}
</script>

<style scoped lang="scss">
.container {
  width: 250px;
  height: 400px;

  margin: 16px;
  padding: 16px;

  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  border-radius: 4px;
}
</style>
