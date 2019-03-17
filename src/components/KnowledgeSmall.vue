<template>
  <div class="container">
    <div class="card">
      <div class="content" :style="{ backgroundColor: contentBackground(title) }">
        <div :style="{ flexGrow: 1}">{{title}}</div>
        <div :style="{ display: 'flex', justifyContent: 'flex-end' }">
          <div @click="hideContent" class="eye"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { config } from "../domains/knowledges/config";
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import colors from "@/utils/colors";

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
    gradient: s => colors.gradientFromString(s),
    contentBackground: s => colors.fromString800(s),
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
export default class KnowledgeSmall extends Vue {
  @Prop() private id!: string;
  @Prop() private date!: string;
  @Prop() private title!: string;
  @Prop() private description!: string;
  @Prop() private illustration!: string;
  @Prop() private imageURL!: string;
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  background-color: #fff;

  margin: 8px 0px;

  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);

  transition: all 0.3s ease-in-out;

  border-radius: 8px;

  overflow: hidden;

  &:hover {
    box-shadow: 0 1px #ffffff inset, 0 3px 5px rgba(34, 25, 25, 0.4);
    .edit,
    .remove {
      display: inherit !important;
    }
  }

  width: 400px;
  height: 64px;

  .card {
    display: flex;
    flex-direction: column;

    width: 400px;
    height: 64px;
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px 20px;

    color: rgba(255, 255, 255, 0.8);

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

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

  .eye,
  .eye-off {
    background-repeat: no-repeat;
    background-size: contain;
    height: 2rem;
    width: 2rem;
    transition: transform 0.8s ease-in-out;
    &:hover {
      transform: rotate(360deg);
    }
  }
  .eye {
    background-image: url(../assets/eye.svg);
  }
  .eye-off {
    background-image: url(../assets/eye-off.svg);
  }

  .eye,
  .remove,
  .eye-off,
  .edit {
    cursor: pointer;
  }
}
</style>
