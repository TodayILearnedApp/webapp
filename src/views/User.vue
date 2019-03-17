<template>
  <div class="home">
    <div class="form-container">
      <div class="form">
        <router-link to="/new">
          <input class="input" type="text" placeholder="What did you learn ?" disabled>
        </router-link>
      </div>
    </div>

    <h2>Latest knowledges</h2>
    <div class="vertical-knowledges-container">
      <swiper
        :options="{
          freeMode: true,
          slidesPerView: 4,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true,
          },
          breakpoints: {
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          }
        }"
      >
        <swiper-slide :key="item.id" v-for="item in latestKnowledges">
          <VerticalKnowledge
            :id="item.id"
            :date="item.date"
            :title="item.title"
            :description="item.description"
            :imageURL="item.imageURL"
          />
        </swiper-slide>
        <div class="pagination swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <h2>All knowledges</h2>
    <div class="timeline">
      <div class="knowledge" :key="item.key" v-for="item in knowledges">
        <div class="marker-container">
          <div class="marker" :style="{ borderColor: timelineBorderColor(item.title) }"/>
        </div>
        <div class="date">{{ item.date | humanDate}}</div>
        <div class="content">
          <div class="title">{{item.title}}</div>
          <div v-if="Array.isArray(item.tags)" class="tags">
            <div :key="tag" class="tag" v-for="tag in item.tags">#{{tag}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import moment from "moment";
import { Component, Vue } from "vue-property-decorator";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import colors from "@/utils/colors";
import { Knowledge } from "../domains/knowledges/model";
import { config } from "../domains/knowledges/config";
import KnowledgeForm from "@/components/KnowledgeForm";
import VerticalKnowledge from "@/components/VerticalKnowledge";

@Component({
  components: {
    VerticalKnowledge,
    KnowledgeForm,
    swiper,
    swiperSlide
  },
  data() {
    const user = firebase.auth().currentUser;

    return {
      displayName: user ? user.displayName : null,
      knowledges: [],
      latestKnowledges: []
    };
  },
  mounted() {
    this.getKnowledges();
  },
  methods: {
    timelineBorderColor: title => colors.fromString(title),
    navigateToForm() {},
    async getKnowledges() {
      const currentUser = firebase.auth().currentUser;

      const collection = firebase
        .firestore()
        .collection(config.collection_endpoint)
        .where("author", "==", currentUser.uid);

      // get three latest knowledges
      firebase
        .firestore()
        .collection(config.collection_endpoint)
        .where("author", "==", currentUser.uid)
        .orderBy("date", "desc")
        .limit(8)
        .onSnapshot(convo => {
          let source = convo.metadata.hasPendingWrites ? "Local" : "Server";
          const knowledges = [];

          convo.docs.forEach(doc => {
            knowledges.push({ id: doc.id, ...doc.data() });
          });

          this.latestKnowledges = knowledges;
        });

      firebase
        .firestore()
        .collection(config.collection_endpoint)
        .where("author", "==", currentUser.uid)
        .orderBy("date", "desc")
        .onSnapshot(convo => {
          let source = convo.metadata.hasPendingWrites ? "Local" : "Server";
          const knowledges = [];

          convo.docs.forEach(doc => {
            knowledges.push({ id: doc.id, ...doc.data() });
          });
          console.log("know", knowledges);

          this.knowledges = knowledges;
          // TODO: add messages to store
        });
    }
  },
  filters: {
    humanDate: date => moment(date).format("YYYY-MM-DD")
  }
})
export default class User extends Vue {}
</script>


<style scoped lang="scss">
.vertical-knowledges-container {
  width: 100%;
  display: flex;
  flex-direction: row;

  .pagination {
    margin-top: 2rem;
  }
}

.form-container {
  display: flex;
  align-content: center;
  justify-content: center;

  input {
    cursor: pointer;
    &:disabled {
      background-color: #fff;
    }
  }
}

.timeline {
  position: relative;
  margin: 0 auto;
  max-width: 1024px;

  display: flex;
  flex-direction: column;

  &:before {
    position: absolute;
    top: 0;
    height: 100%;
    padding-right: 11px;
    border-right: 2px solid #f2f2f2;
    content: "";
  }

  .knowledge {
    display: flex;
    align-items: stretch;
    margin-top: 2em;

    .marker-container {
      padding-right: 62px;
    }
    .marker {
      position: relative;
      display: table-cell;

      // size
      height: 24px;
      min-height: 24px;
      width: 24px;
      min-width: 24px;

      // border
      border: 2px solid #ff1744;
      border-radius: 50%;

      background-color: white;
      z-index: 0;

      box-sizing: border-box;
    }

    .date {
      padding-right: 126px;
    }
    .content {
      .title {
        font-size: 0.9em;
      }
      .tags {
        font-size: 0.7rem;
        color: #808080;
        margin-top: 8px;
        display: flex;
        flex-direction: row;
        .tag:not(:first-child) {
          margin-left: 1rem;
        }

        .tag {
          &:hover {
            color: #3d5afe;
            cursor: pointer;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
