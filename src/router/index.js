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
import ActorList from "../views/ActorList.vue";
import DanyuList from "../views/DanyuList.vue";
import DirectorList from "../views/DirectorList.vue";
import MakerList from "../views/MakerList.vue";
import LabelList from "../views/LabelList.vue";
import SeriesList from "../views/SeriesList.vue";
import SearchResult from "../views/SearchResult.vue";
import MyPage from "../views/MyPage.vue";
import Like from "../views/Like.vue";

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
    path: "/actor",
    name: "ActorList",
    component: ActorList
  },
  {
    path: "/danyu",
    name: "DanyuList",
    component: DanyuList
  },
  {
    path: "/director",
    name: "DirectorList",
    component: DirectorList
  },
  {
    path: "/label",
    name: "LabelList",
    component: LabelList
  },
  {
    path: "/maker",
    name: "MakerList",
    component: MakerList
  },
  {
    path: "/series",
    name: "SeriesList",
    component: SeriesList
  },
  {
    path: "/actor/:id/:page?",
    name: "Actor",
    component: Actor
  },
  {
    path: "/director/:id/:page?",
    name: "Director",
    component: Director
  },
  {
    path: "/label/:id/:page?",
    name: "Label",
    component: Label
  },
  {
    path: "/maker/:id/:page?",
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
    path: "/search",
    name: "Search",
    component: SearchResult
  },
  {
    path: "/my/:type",
    name: "MyPage",
    component: MyPage
  },
  {
    path: "/likes/:type",
    name: "Like",
    component: Like
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
