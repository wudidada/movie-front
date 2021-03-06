<template>
  <div id="outer" class="flex-container">
    <div class="slot-button">
      <slot></slot>
    </div>
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
    <div v-if="slideButton" class="backtop" @click="slideToTop">
      <i class="el-icon-caret-top"></i>
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
      slideButton: false
    };
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
    slideToTop() {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
      });
    },
    onScroll() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      // console.log("scroll");
      let scrollTop = Math.ceil(
        document.documentElement.scrollTop || document.body.scrollTop
      );
      let windowHeight = Math.ceil(
        document.documentElement.clientHeight || document.body.clientHeight
      );
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // console.log(scrollTop, windowHeight, scrollHeight);
      if (scrollTop + windowHeight >= scrollHeight) {
        this.$emit("scrollReachBottom");
        console.log("next page");
      }
      if (scrollTop > windowHeight * 1.2) {
        this.slideButton = true;
      } else {
        this.slideButton = false;
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

.slot-button {
  position: fixed;
  right: 40px;
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

.backtop {
  position: fixed;
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgb(0 0 0 / 12%);
  cursor: pointer;
  z-index: 5;
  right: 40px;
  bottom: 40px;
}
</style>
