<template>
  <div>
    <h2>What users had learned about today ?</h2>
    <div class="today-tags">
      <div class="today-tag" :key="tag.key" v-for="tag in todayTags">#{{tag.title}} ({{tag.amount}})</div>
    </div>
    <h2>Last acquired knowledges</h2>
    <div class="knowledges">
      <div class="knowledge" :key="item.key" v-for="item in lastAcquired">
        <KnowledgeSmall :title="item.title" :date="item.date"/>
        <div>{{item.date | calendar}}</div>
        <div v-if="Array.isArray(item.tags)" class="tags">
          <div :key="tag" class="tag" v-for="tag in item.tags">#{{tag}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import orderBy from "lodash/orderBy";

import KnowledgeSmall from "@/components/KnowledgeSmall";
import { config } from "@/domains/knowledges/config";

@Component({
  components: {
    KnowledgeSmall
  },
  data: function() {
    return {
      lastAcquired: [],
      todayTags: []
    };
  },
  mounted() {
    this.getLastAcquired();
    this.getTodayTags();
  },
  methods: {
    getLastAcquired: function() {
      firebase
        .firestore()
        .collection(config.collection_endpoint)
        .orderBy("date", "desc")
        .limit(8)
        .onSnapshot(convo => {
          let source = convo.metadata.hasPendingWrites ? "Local" : "Server";
          const knowledges = [];

          convo.docs.forEach(doc => {
            knowledges.push({ id: doc.id, ...doc.data() });
          });

          this.lastAcquired = knowledges;
        });
    },
    getTodayTags: function() {
      firebase
        .firestore()
        .collection(config.collection_endpoint)
        .where(
          "date",
          ">=",
          moment()
            .subtract(1, "week")
            .format("YYYY-MM-DD")
        )
        .orderBy("date", "desc")
        .limit(8)
        .onSnapshot(convo => {
          let source = convo.metadata.hasPendingWrites ? "Local" : "Server";
          const tags = {};

          convo.docs.forEach(doc => {
            const data = doc.data();
            if (Array.isArray(data.tags)) {
              for (const tag of data.tags) {
                tags[tag] = tags[tag] ? tags[tag] + 1 : 1;
              }
            }
          });

          console.log("tags", tags);

          this.todayTags = orderBy(
            Object.keys(tags).map(tag => ({
              title: tag,
              amount: tags[tag]
            })),
            "amount",
            "desc"
          );
        });
    }
  },
  filters: {
    calendar: d =>
      moment(d).calendar(null, {
        lastDay: "[Yesterday]",
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        lastWeek: "[Last] dddd",
        nextWeek: "dddd",
        sameElse: "L"
      })
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.today-tags {
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .today-tag {
    margin: 20px 4px;
  }
}

.knowledges {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .knowledge {
    margin: 20px 4px;

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
</style>
