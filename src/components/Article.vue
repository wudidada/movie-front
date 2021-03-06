<template>
  <div class="video-box flex-container">
    <div class="info flex-container">
      <h2 class="article-title">
        {{ title }}
      </h2>
      <div id="cover">
        <img :src="jav.cover | largePic" />
      </div>
      <div id="detail">
        <div class="monthly">
          <el-button
            type="primary"
            icon="el-icon-check"
            circle
            :loading="checkingMonthly"
            @click="checkMonthly"
          ></el-button>
        </div>
        <table class="detail-table">
          <tbody>
            <tr>
              <td class="key">番号</td>
              <td class="value">{{ jav.dvd_id }}</td>
            </tr>
            <tr>
              <td class="key">发行日期</td>
              <td class="value">
                {{ jav.pub_date || jav.release_date | fDate }}
              </td>
            </tr>
            <tr>
              <td class="key">长度</td>
              <td class="value">{{ jav.duration }}分钟</td>
            </tr>
            <tr v-if="jav['director']">
              <td class="key">导演</td>
              <td class="value">
                <LinkItem :item="jav.director" type="director" />
              </td>
            </tr>
            <tr v-if="jav['maker']">
              <td class="key">制作商</td>
              <td class="value">
                <LinkItem :item="jav.maker" type="maker" />
              </td>
            </tr>
            <tr v-if="jav['label']">
              <td class="key">发行商</td>
              <td class="value">
                <LinkItem :item="jav.label" type="label" />
              </td>
            </tr>
            <tr v-if="jav['series']">
              <td class="key">系列</td>
              <td class="value">
                <LinkItem :item="jav.series" type="series" />
              </td>
            </tr>
            <tr>
              <td class="key">评分</td>
              <td class="value">
                {{ jav.score | fScore }}
                <a
                  class="out-link"
                  :href="
                    `http://www.javlibrary.com/cn/vl_searchbyid.php?keyword=${jav.dvd_id}`
                  "
                  target="_blank"
                  ><img src="http://www.javlibrary.com/favicon.ico"
                /></a>
                <a
                  class="out-link"
                  :href="`https://javdb.com/search?q=${jav.dvd_id}&f=all`"
                  target="_blank"
                  ><img src="https://javdb.com/favicon-16x16.png"
                /></a>
              </td>
            </tr>
            <tr>
              <td class="key">类别</td>
              <td class="value">
                <router-link
                  v-for="tag in jav.tags"
                  :key="tag.id"
                  :to="`/tag/${tag.id}`"
                  target="_blank"
                  >{{ tag.name }}</router-link
                >
              </td>
            </tr>
            <tr>
              <td class="key">演员</td>
              <td class="value">
                <LinkItem
                  v-for="actor in jav.actors"
                  :key="actor.id"
                  :item="actor"
                  type="actor"
                  :title="actorComment(actor.id)"
                />
              </td>
            </tr>
            <tr v-if="jav['danyus'] && jav.danyus.length > 0">
              <td class="key">男优</td>
              <td class="value">
                <router-link
                  v-for="danyu in jav.danyus"
                  :key="danyu.id"
                  :to="`/actor/${danyu.id}`"
                  target="_blank"
                  >{{ danyu.name }}</router-link
                >
              </td>
            </tr>
            <tr>
              <td colspan="2" class="intrest">
                <div
                  v-if="isWatched(jav)"
                  class="watched marked"
                  @click="delWatched(jav)"
                >
                  看过
                </div>
                <div v-else class="watched unmarked" @click="addWatched(jav)">
                  看过
                </div>
                <div
                  v-if="isSubscribed(jav)"
                  class="subscribed marked"
                  @click="delSubscribed(jav)"
                >
                  想看
                </div>
                <div
                  v-else
                  class="subscribed unmarked"
                  @click="addSubscribed(jav)"
                >
                  想看
                </div>
                <div
                  v-if="isOwned(jav)"
                  class="owned marked"
                  @click="delOwned(jav)"
                >
                  拥有
                </div>
                <div v-else class="owned unmarked" @click="addOwned(jav)">
                  拥有
                </div>
              </td>
            </tr>
            <tr v-if="isWatched(jav)">
              <td colspan="2" class="watched-message">
                <div class="watch-date">{{ getWatched(jav).date | fDate }}</div>
                <el-rate
                  v-model="rate"
                  allow-half
                  show-text
                  @change="updateRate"
                ></el-rate>
                <div class="comment" v-if="!isInput">{{ comment }}</div>
                <el-input v-else v-model="comment"></el-input>

                <el-button size="medium" v-if="!isInput" @click="inputComment"
                  >评论</el-button
                >
                <el-button size="medium" v-if="isInput" @click="updateComment"
                  >确定</el-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="desc">{{ jav.desc }}</div>
    </div>
  </div>
</template>

<script>
import LinkItem from "./LinkItem.vue";
import { mapActions, mapGetters } from "vuex";
import JavDataService from "../services/JavDataService";

export default {
  components: {
    LinkItem
  },
  data() {
    return {
      isInput: false,
      rate: 0,
      comment: "",
      checkingMonthly: false
    };
  },
  props: {
    jav: Object
  },
  computed: {
    title() {
      return `${this.jav.dvd_id} ${this.jav.title}`;
    },
    ...mapGetters([
      "isOwned",
      "isSubscribed",
      "isWatched",
      "getWatched",
      "getComment"
    ])
  },
  methods: {
    ...mapActions([
      "addOwned",
      "delOwned",
      "addSubscribed",
      "delSubscribed",
      "addWatched",
      "delWatched",
      "updateWatched"
    ]),
    updateRate(rate) {
      this.updateWatched({ cid: this.jav.cid, rate: rate * 2 });
    },
    inputComment() {
      this.isInput = true;
    },
    updateComment() {
      this.updateWatched({ cid: this.jav.cid, comment: this.comment });
      this.isInput = false;
    },
    checkMonthly() {
      if (!this.checkingMonthly) {
        this.checkingMonthly = true;
        JavDataService.isMonthly(this.jav.cid)
          .then(response => {
            const data = response.data;
            if (data.success) {
              const title = data.monthly ? "月额" : "非月额";

              this.$notify.success({
                title,
                message: data.bitrate + "kbps",
                duration: 0
              });
            } else {
              this.$notify.warning({ title: "未找到", duration: 0 });
            }
          })
          .catch(() => this.$notify.error({ title: "查询失败", duration: 0 }))
          .finally(() => (this.checkingMonthly = false));
      }
    },
    actorComment(id) {
      const comment = this.getComment({ type: "actor", id });
      if (comment) {
        return (
          this.$options.filters.fRate(comment.rate) + " " + comment.comment
        );
      }
      return "";
    }
  },
  watch: {
    "jav.rate": function(rate) {
      this.rate = rate / 2;
    },
    "jav.comment": function(comment) {
      this.comment = comment;
    }
  }
};
</script>

<style scoped>
.article-title {
  margin: 0 0 1rem 0;
  width: 100%;
}

.info {
  width: 80%;
}

#cover img {
  min-width: 800px;
  min-height: 540px;
}

#detail {
  flex-basis: 0;
  flex-shrink: 1;
  flex-grow: 1;
  width: 30%;
  padding: 0.75rem;
}

#detail img {
  width: 16px;
  height: 16px;
  vertical-align: baseline;
}

.monthly {
  float: right;
}

.detail-table > tbody > tr {
  margin: 10px;
  display: block;
}

.key {
  width: 6rem;
  text-align: right;
  vertical-align: top;
  font-weight: bold;
}

.value {
  padding-left: 2rem;
}

.value > a {
  padding: 0 1rem 0 0;
}

#desc {
  margin: 30px;
  text-indent: 2em;
}

.intrest {
  display: flex;
  flex-wrap: wrap;
  margin-left: 3rem;
}

.intrest div {
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #dcdcdc;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  white-space: nowrap;
}

.unmarked:hover {
  background-color: #e9e9e9;
}

.intrest .marked {
  background-color: #333333;
  color: white;
}

.watch-date {
  color: #999;
}

.watched-message {
  padding-left: 3.5rem;
}

.watched-message div {
  margin: 8px 0;
}

.value .out-link {
  padding-right: 4px;
}
</style>
