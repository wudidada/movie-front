<template>
  <div id="outer" class="flex-container">
    <div class="items flex-container">
      <div class="item" v-for="item in items" :key="item.pid">
        <router-link :to="`/v/${item.cid}`" target="_blank" :title="item.title">
          <div class="dvd-id">{{ item.dvd_id }}</div>
          <img class="cover" :src="getImageUrl(item.cover)" />
          <div class="title">{{ item.title }}</div>
          <div class="date">{{ getPubDate(item) }}</div>
          <div v-if="item.score" class="score">{{ item.score | fScore }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  },
  data() {
    return {
      isRresh: false
    };
  },
  watch: {
    items: function() {
      this.isRresh = false;
    }
  },
  methods: {
    getPubDate(item) {
      let date = item.pub_date || item.release_date;
      return date;
    },
    getImageUrl(url) {
      if (!url) return url;
      let i = url.lastIndexOf("pl");
      if (i > -1) {
        return url.slice(0, i) + "ps" + url.slice(i + 2);
      }
      return url;
    },
    onScroll() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      // console.log("scroll");
      let scrollTop = Math.ceil(
        document.documentElement.scrollTop || document.body.scrollTop
      );
      //变量windowHeight是可视区的高度
      let windowHeight = Math.ceil(
        document.documentElement.clientHeight || document.body.clientHeight
      );
      //变量scrollHeight是滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      // console.log(scrollTop, windowHeight, scrollHeight);
      if (!this.isRresh && scrollTop + windowHeight >= scrollHeight) {
        //到了这个就可以进行业务逻辑加载后台数据了
        this.isRresh = true;
        this.$emit("scrollReachBottom");
        console.log("next page");
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
#outer {
  justify-content: center;
}

.items {
  justify-content: center;
  margin: 10px 0;
  width: 80%;
}

.item {
  width: 200px;
  height: 300px;
  padding: 8px 6.4px;
  text-align: center;
}

.item:hover {
  background-color: #cccccc;
}

.title {
  font-size: 0.8rem;
  overflow: hidden;
  line-height: 1.4em;
  height: 2.8em;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
}

.date {
  font-size: 1;
  color: red;
  display: inline-block;
}

.score {
  font-size: 14px;
  color: red;
  display: inline-block;
  padding-left: 10px;
}

img {
  display: block;
  min-width: 147px;
  min-height: 200px;
  width: auto;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>
