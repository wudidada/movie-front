<template>
  <div class="video-box flex-container">
    <h2 class="article-title">
      {{ title }}
    </h2>
    <div class="info flex-container">
      <div id="cover">
        <img :src="jav.cover" />
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
                <router-link
                  :to="`/director/${jav.director.dmm_id}`"
                  target="_blank"
                  >{{ jav.director.name }}</router-link
                >
              </td>
            </tr>
            <tr v-if="jav['maker']">
              <td class="key">制作商</td>
              <td class="value">
                <router-link
                  :to="`/maker/${jav.maker.dmm_id}`"
                  target="_blank"
                  >{{ jav.maker.name }}</router-link
                >
              </td>
            </tr>
            <tr v-if="jav['label']">
              <td class="key">发行商</td>
              <td class="value">
                <router-link
                  :to="`/label/${jav.label.dmm_id}`"
                  target="_blank"
                  >{{ jav.label.name }}</router-link
                >
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
                <router-link
                  v-for="actor in jav.actors"
                  :key="actor.dmm_id"
                  :to="`/actor/${actor.dmm_id}`"
                  target="_blank"
                  >{{ actor.name }}</router-link
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
export default {
  props: {
    jav: Object
  },
  computed: {
    title() {
      return `${this.jav.dvd_id} ${this.jav.title}`;
    }
  }
};
</script>

<style>
.video-box {
  justify-content: center;
}

.article-title {
  margin: 0 0 1.5rem 0;
  width: 100%;
}

.info {
  width: 90%;
}

#detail {
  flex-grow: 1;
  width: 30%;
  border: 3px solid yellow;
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
</style>
