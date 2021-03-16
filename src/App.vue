<template>
  <div id="app">
    <Nav :buttons="buttons" />
    <div id="main">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
export default {
  name: "App",
  components: { Nav },
  data: () => ({
    buttons: [
      {
        name: "我的",
        url: "/my/watched",
        sub: [
          { name: "已看", url: "/my/watched" },
          { name: "想看", url: "/my/subscribed" },
          { name: "已有", url: "/my/owned" }
        ]
      },
      { name: "最新", url: "/new_release" },
      {
        name: "演员",
        url: "/actor",
        sub: [
          { name: "女优", url: "/actor" },
          { name: "男优", url: "/danyu" }
        ]
      },
      { name: "导演", url: "/director" },
      { name: "发行商", url: "/label" },
      { name: "制作商", url: "/maker" },
      // { name: "标签", url: "/tag" },
      { name: "系列", url: "/series" },
      { name: "排行榜", url: "/rank/most_wanted/latest" }
    ]
  }),
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Home Page",
    // all titles will be injected into this template
    titleTemplate: "%s - Movie Front"
  }
};
</script>

<style>
@import "assets/reset.css";

#main {
  padding-top: 20px;
}

body {
  overflow-y: scroll;
}
</style>
