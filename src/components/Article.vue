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
        <table class="detail-table">
          <tbody>
            <tr>
              <td class="key">番号</td>
              <td class="value">{{ jav.dvd_id }}</td>
            </tr>
            <tr>
              <td class="key">发行日期</td>
              <td class="value">{{ jav.pub_date || jav.release_date }}</td>
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
                <router-link
                  :to="`/series/${jav.series.dmm_id}`"
                  target="_blank"
                  >{{ jav.series.name }}</router-link
                >
              </td>
            </tr>
            <tr>
              <td class="key">评分</td>
              <td class="value">{{ jav.score }}</td>
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
                  v-model="rating"
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

export default {
  components: {
    LinkItem
  },
  data() {
    return {
      isInput: false,
      rating: 0
    };
  },
  props: {
    jav: Object,
    comment: String,
    rate: Number
  },
  computed: {
    title() {
      return `${this.jav.dvd_id} ${this.jav.title}`;
    },
    ...mapGetters(["isOwned", "isSubscribed", "isWatched", "getWatched"])
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
    updateRate(rating) {
      this.updateWatched({ cid: this.jav.cid, rate: rating * 2 });
    },
    inputComment() {
      this.isInput = true;
    },
    updateComment() {
      this.updateWatched({ cid: this.jav.cid, comment: this.comment });
      this.isInput = false;
    }
  },
  mounted() {
    this.rating = this.rate / 2;
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

img {
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
</style>
