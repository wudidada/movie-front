import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./utils/Filters";
import Meta from "vue-meta";
import VueClipboard from "vue-clipboard2";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = true;

Vue.use(VueClipboard);
Vue.use(Meta);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch("initApp");
  }
}).$mount("#app");
