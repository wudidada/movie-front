import Vue from "vue";
import { merge } from "lodash";
import { createDefault } from "./state";
export default {
  initState(state, data) {
    let token = localStorage.token;
    const history =
      (localStorage.history && JSON.parse(localStorage.history)) || [];
    const likes = (localStorage.likes && JSON.parse(localStorage.likes)) || {
      actor: {},
      director: {},
      label: {},
      maker: {},
      tag: {},
      series: {}
    };
    const watched =
      (localStorage.watched && JSON.parse(localStorage.watched)) || {};
    const owned = (localStorage.owned && JSON.parse(localStorage.owned)) || {};
    const subscribed =
      (localStorage.subscribed && JSON.parse(localStorage.subscribed)) || {};
    let name = localStorage.name;

    if (data) {
      merge({ history, likes, watched, owned, subscribed }, data);
      name = data.name;
      token = data.token || token;
    }

    state.token = token;
    state.history.push(...history);
    state.name = name;

    for (const [key, value] of Object.entries(likes)) {
      Vue.set(state.likes, key, value);
    }

    for (const [key, value] of Object.entries(watched)) {
      value.date = new Date(value.date);
      Vue.set(state.watched, key, value);
    }

    for (const [key, value] of Object.entries(owned)) {
      value.date = new Date(value.date);
      Vue.set(state.owned, key, value);
    }

    for (const [key, value] of Object.entries(subscribed)) {
      // 兼容性做法 可去除
      if (typeof value == "string") {
        Vue.set(state.subscribed, key, { date: new Date(value) });
      } else {
        value.date = new Date(value.date);
        Vue.set(state.subscribed, key, value);
      }
    }
  },
  logout(state) {
    localStorage.clear();
    state.token = "";
    Object.assign(state, createDefault());
  },
  clearHistory(state) {
    state.history.splice(0);
  },
  saveHistory(state) {
    localStorage.history = JSON.stringify(state.history);
  },
  delLiked(state, item) {
    Vue.delete(state.likes[item.type], item.id);
  },
  addLiked(state, item) {
    Vue.set(state.likes[item.type], item.id, {
      name: item.name,
      id: item.id,
      date: new Date()
    });
  },
  saveLiked(state) {
    localStorage.likes = JSON.stringify(state.likes);
  },
  addOwned(state, jav) {
    Vue.set(state.owned, jav.cid, { date: new Date() });
  },
  delOwned(state, jav) {
    Vue.delete(state.owned, jav.cid);
  },
  addSubscribed(state, jav) {
    Vue.set(state.subscribed, jav.cid, { date: new Date() });
  },
  delSubscribed(state, jav) {
    Vue.delete(state.subscribed, jav.cid);
  },
  addWatched(state, jav) {
    Vue.set(state.watched, jav.cid, {
      date: new Date(),
      rate: jav.rate,
      comment: jav.comment
    });
  },
  delWatched(state, jav) {
    Vue.delete(state.watched, jav.cid);
  },
  saveOwned(state) {
    localStorage.owned = JSON.stringify(state.owned);
  },
  saveSubscribed(state) {
    localStorage.subscribed = JSON.stringify(state.subscribed);
  },
  saveWatched(state) {
    localStorage.watched = JSON.stringify(state.watched);
  },
  updateWatched(state, jav) {
    if (jav.rate) {
      Object.assign(state.watched[jav.cid], { rate: jav.rate });
    }
    if ("comment" in jav) {
      if (jav.comment == "") {
        Vue.delete(state.watched[jav.cid], "comment");
      } else {
        Object.assign(state.watched[jav.cid], { comment: jav.comment });
      }
    }
  },
  updateToken(state, token) {
    state.token = token;
    localStorage.token = token;
  }
};
