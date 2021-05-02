<template>
  <div id="outer" class="flex-container">
    <div class="slot-button">
      <slot></slot>
    </div>
    <div class="export-button">
      <el-button
        type="primary"
        icon="el-icon-document-copy"
        circle
        @click="exportCids"
      ></el-button>
    </div>
    <div class="items flex-container">
      <slot name="info-bar"></slot>
      <slot name="sort-bar"></slot>
      <div class="item" v-for="item in items" :key="item.pid">
        <div class="side flex-container">
          <div
            :class="[
              'side-button',
              'el-icon-time',
              { checked: isSubscribed(item) }
            ]"
            title="想看"
            @click.prevent="toggleSubscribed(item)"
          ></div>
          <div
            :class="[
              'side-button',
              'el-icon-check',
              { checked: isWatched(item) }
            ]"
            title="已看"
            @click.prevent="toggleWatched(item)"
          ></div>
          <div
            :class="[
              'side-button',
              'el-icon-document-checked',
              { checked: isOwned(item) }
            ]"
            title="已有"
            @click.prevent="toggleOwned(item)"
          ></div>
        </div>
        <router-link :to="`/v/${item.cid}`" :title="item.title">
          <div class="id" :title="getID(item)">{{ getID(item) | fID }}</div>
          <div class="cover-container">
            <img class="cover" :src="item.poster || item.cover | smallPic" />
          </div>
          <div class="title">
            <div>{{ item.title }}</div>
          </div>
          <div class="date">{{ getPubDate(item) | fDate }}</div>
          <div v-if="item.score" class="score">{{ item.score | fScore }}</div>
        </router-link>
      </div>
    </div>
    <div v-if="slideButton" class="backtop" @click="slideToTop">
      <i class="el-icon-caret-top"></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: { items: Array },
  data() {
    return { slideButton: false };
  },
  computed: {
    ...mapGetters(["isSubscribed", "isWatched", "isOwned"])
  },
  methods: {
    ...mapActions([
      "addSubscribed",
      "delSubscribed",
      "addWatched",
      "delWatched",
      "addOwned",
      "delOwned"
    ]),
    toggleSubscribed(item) {
      console.log("toggleSub");
      if (this.isSubscribed(item)) {
        console.log("del sub");
        this.delSubscribed(item);
      } else {
        console.log("add sub");
        this.addSubscribed(item);
      }
    },
    toggleWatched(item) {
      if (this.isWatched(item)) {
        this.delWatched(item);
      } else {
        this.addWatched(item);
      }
    },
    toggleOwned(item) {
      if (this.isOwned(item)) {
        this.delOwned(item);
      } else {
        this.addOwned(item);
      }
    },
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
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
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
    },
    exportCids() {
      const cids = [];
      this.items.forEach(item => cids.push(item.cid));
      const text = cids.join(",");
      this.$copyText(text).then(
        () => this.$message.success("导出cid成功"),
        () => this.$message.error("导出cid失败")
      );
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

<style scoped src="./ItemGallery.css"></style>
