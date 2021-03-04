import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import { createDefault } from "./state";

Vue.use(Vuex);

export default new Vuex.Store({
  state: createDefault(),
  mutations,
  actions,
  modules: {},
  getters
});
