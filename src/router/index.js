import Vue from "vue";
import VueRouter from "vue-router";
import NewRlease from "../views/NewRlease.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/new_release/:page?",
    alias: "/",
    name: "New_release",
    component: NewRlease
  },
  {
    path: "/v/:cid",
    name: "Video",
    component: () => import("@/views/Video.vue")
  },
  {
    path: "/actor",
    name: "ActorList",
    component: () => import("@/views/ActorList.vue")
  },
  {
    path: "/danyu",
    name: "DanyuList",
    component: () => import("@/views/DanyuList.vue")
  },
  {
    path: "/director",
    name: "DirectorList",
    component: () => import("@/views/DirectorList.vue")
  },
  {
    path: "/label",
    name: "LabelList",
    component: () => import("@/views/LabelList.vue")
  },
  {
    path: "/maker",
    name: "MakerList",
    component: () => import("@/views/MakerList.vue")
  },
  {
    path: "/series",
    name: "SeriesList",
    component: () => import("@/views/SeriesList.vue")
  },
  {
    path: "/actor/:id/:page?",
    name: "Actor",
    component: () => import("@/views/Actor.vue")
  },
  {
    path: "/director/:id/:page?",
    name: "Director",
    component: () => import("@/views/Director.vue")
  },
  {
    path: "/label/:id/:page?",
    name: "Label",
    component: () => import("@/views/Label.vue")
  },
  {
    path: "/maker/:id/:page?",
    name: "Maker",
    component: () => import("@/views/Maker.vue")
  },
  {
    path: "/series/:id/:page?",
    name: "Series",
    component: () => import("@/views/Series.vue")
  },
  {
    path: "/tag/:dmm_id/:page?",
    name: "Tag",
    component: () => import("@/views/Tag.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/SearchResult.vue")
  },
  {
    path: "/my/:type",
    name: "MyList",
    component: () => import("@/views/MyList.vue")
  },
  {
    path: "/likes/:type",
    name: "Like",
    component: () => import("@/views/Like.vue")
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
