<template>
  <div class="container">
    <div class="illustration">
      <div class="remove">
        <img src="@/assets/remove.svg">
      </div>
      <img :src="`https://api.adorable.io/avatars/285/${title}.png`">
    </div>
    <div class="separator"/>
    <div class="content">
      <div class="title">{{title}}</div>
      <div class="description">{{description}}</div>
    </div>
    <div class="date">
      <div>{{date | dateDisplay}}</div>
      <div>
        <img src="@/assets/eye.svg">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";

@Component({
  components: {},
  methods: {},
  filters: {
    dateDisplay: date => moment(date).format("YYYY-MM-DD")
  }
})
export default class VerticalKnowledge extends Vue {
  @Prop() private date!: string;
  @Prop() private title!: string;
  @Prop() private description!: string;
  @Prop() private illustration!: string;
}
</script>

<style scoped lang="scss">
.container {
  background-color: #fff;
  width: 256px;
  height: 400px;

  margin: 16px;

  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  transition: all 0.3s ease-in-out;

  border-radius: 5px;

  &:hover {
    box-shadow: 0 1px #ffffff inset, 0 3px 5px rgba(34, 25, 25, 0.4);
    cursor: pointer;
    background-color: #06bcfb;
    background-image: linear-gradient(315deg, #06bcfb 0%, #4884ee 74%);

    .remove {
      display: inherit !important;
    }
  }

  display: flex;
  flex-direction: column;

  .separator {
    border-radius: 4px;
    border: 1px solid lightgrey;
    margin: 0 16px;
  }

  .illustration {
    position: relative;

    border-radius: 5px;

    flex: 5;

    display: flex;

    align-content: center;
    align-items: center;
    justify-content: center;

    width: 100%;

    img {
      border-radius: 50%;
      width: 128px;
      height: 128px;
    }

    .remove {
      display: none;
      position: absolute;
      right: 1rem;
      top: 1rem;

      transition: transform 0.8s ease-in-out;

      &:hover {
        transform: rotate(360deg);
      }
      img {
        height: 2rem;
        width: 2rem;
      }
    }
  }

  .content {
    padding: 16px;

    flex-grow: 1;

    .title {
      font-weight: bolder;
    }

    .description {
      margin-top: 1rem;
    }
  }

  .date {
    flex: 1;

    margin: 0 16px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;

    img {
      height: 2rem;
      width: 2rem;
      transition: transform 0.8s ease-in-out;
      &:hover {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
