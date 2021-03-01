<template>
  <div id="outer" class="flex-container">
    <div class="items flex-container">
      <router-link
        class="item"
        v-for="item in items"
        :key="item.pid"
        :to="`/v/${item.cid}`"
        :title="item.title"
      >
        <div class="id" :title="getID(item)">{{ getID(item) | fID }}</div>
        <img class="cover" :src="item.cover | smallPic" />
        <div class="title">
          <div>{{ item.title }}</div>
        </div>
        <div class="date">{{ getPubDate(item) }}</div>
        <div v-if="item.score" class="score">{{ item.score | fScore }}</div>
      </router-link>
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
    getID(item) {
      let id = item.dvd_id;
      if (item["actors"] && item.actors.length > 0) {
        id += " ";
        for (let actor of item.actors) {
          id += ` ${actor.name}`;
        }
      }

      return id;
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

<style scoped>
.items {
  width: 90%;
}

.item {
  width: 200px;
  height: 290px;
  padding: 0;
  margin: 0.5rem 0.4rem;
  text-align: center;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

.id {
  height: 1.5rem;
  line-height: 1.5rem;
  overflow: hidden;
  margin: 0 4px;
  white-space: pre-wrap;
}

.title {
  font-size: 0.8rem;
  margin: 3px 5px;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title > div {
  overflow: hidden;
  line-height: 1.2rem;
  max-height: 2.4rem;
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
