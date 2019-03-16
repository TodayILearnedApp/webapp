<template>
  <div class="container">
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide>
        <div class="card" @click="displayContent">
          <div class="illustration">
            <div class="remove">
              <img @click="remove" src="@/assets/remove.svg">
            </div>
            <img :src="`https://api.adorable.io/avatars/285/${title}.png`">
          </div>
          <div class="separator"/>
          <div class="content">
            <div class="title">{{title}}</div>
          </div>
          <div class="date">
            <div>{{date | dateDisplay}}</div>
            <div @click="displayContent" class="eye">
              <img src="@/assets/eye.svg">
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="card">
          <div class="content">
            <span v-html="description"/>
            <div @click="hideContent" class="eye">
              <img src="@/assets/eye-off.svg">
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { config } from "../domains/knowledges/config";
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";

@Component({
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  data() {
    return {
      swiperOption: {
        direction: "vertical"
      }
    };
  },
  methods: {
    remove: async function() {
      const userIsSure = window.confirm("Are you sure ?");

      if (!userIsSure) return;

      await firebase
        .firestore()
        .collection(config.collection_endpoint)
        .doc(this.id)
        .delete();
    },
    displayContent: function() {
      this.swiper.slideTo(1, 500, false);
    },
    hideContent: function() {
      this.swiper.slideTo(0, 1000, false);
    }
  },
  filters: {
    dateDisplay: date => moment(date).format("YYYY-MM-DD")
  }
})
export default class VerticalKnowledge extends Vue {
  @Prop() private id!: string;
  @Prop() private date!: string;
  @Prop() private title!: string;
  @Prop() private description!: string;
  @Prop() private illustration!: string;
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  background-color: #fff;

  margin: 50px 0;

  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  transition: all 0.3s ease-in-out;

  border-radius: 5px;

  overflow: hidden;

  &:hover {
    box-shadow: 0 1px #ffffff inset, 0 3px 5px rgba(34, 25, 25, 0.4);
    cursor: pointer;
    background-color: #06bcfb;
    background-image: linear-gradient(315deg, #06bcfb 0%, #4884ee 74%);

    .remove {
      display: inherit !important;
    }
  }

  width: 256px;
  min-width: 256px;
  height: 400px;

  .card {
    display: flex;
    flex-direction: column;

    width: 256px;
    height: 400px;
  }

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
  }

  .eye {
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
