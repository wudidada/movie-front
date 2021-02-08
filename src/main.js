import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./utils/Filters";
import Meta from "vue-meta";

Vue.config.productionTip = true;

Vue.use(Meta);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
