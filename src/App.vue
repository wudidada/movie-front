<template>
  <div id="app">
    <Nav :buttons="buttons" />
    <div id="main">
      <router-view />
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
      { name: "最新", url: "/new_release" },
      { name: "演员", url: "/actor" },
      { name: "导演", url: "/director" },
      { name: "发行商", url: "/label" },
      { name: "制作商", url: "/maker" },
      // { name: "标签", url: "/tag" },
      { name: "系列", url: "/series" },
      { name: "排行榜", url: "/rank" }
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
</style>
