import Vue from "vue";
import VueRouter from "vue-router";
import NewRlease from "../views/NewRlease.vue";
import NotFound from "../views/NotFound.vue";
import Video from "../views/Video.vue";
import Actor from "../views/Actor.vue";
import Label from "../views/Label.vue";
import Tag from "../views/Tag.vue";
import Series from "../views/Series.vue";
import Maker from "../views/Maker.vue";
import Director from "../views/Director.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: NewRlease
  },
  {
    path: "/new_release/:page?",
    name: "New_release",
    component: NewRlease
  },
  {
    path: "/v/:cid",
    name: "Video",
    component: Video
  },
  {
    path: "/actor/:dmm_id/:page?",
    name: "Actor",
    component: Actor
  },
  {
    path: "/director/:dmm_id/:page?",
    name: "Director",
    component: Director
  },
  {
    path: "/label/:dmm_id/:page?",
    name: "Label",
    component: Label
  },
  {
    path: "/maker/:dmm_id/:page?",
    name: "Maker",
    component: Maker
  },
  {
    path: "/series/:dmm_id/:page?",
    name: "Series",
    component: Series
  },
  {
    path: "/tag/:dmm_id/:page?",
    name: "Tag",
    component: Tag
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
