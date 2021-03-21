import Vue from "vue";
import { createDefault } from "./state";
import _ from "lodash";
export default {
  initState(state, data) {
    const history =
      (localStorage.history && JSON.parse(localStorage.history)) || [];
    const search =
      (localStorage.search && JSON.parse(localStorage.search)) || [];

    if (!data) {
      data = createDefault();
    }
    const token = data.token || localStorage.token;
    const { owned, likes, watched, subscribed, comments } = data;

    state.token = token;
    state.history.push(...history);
    state.name = data.name;
    state.search.push(...search);

    for (const [key, value] of Object.entries(likes || {})) {
      Vue.set(state.likes, key, value);
    }

    for (const [key, value] of Object.entries(comments || {})) {
      Vue.set(state.comments, key, value);
    }

    for (const [key, value] of Object.entries(watched || {})) {
      value.date = new Date(value.date);
      Vue.set(state.watched, key, value);
    }

    for (const [key, value] of Object.entries(owned || {})) {
      value.date = new Date(value.date);
      Vue.set(state.owned, key, value);
    }

    for (const [key, value] of Object.entries(subscribed || {})) {
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
  addSearch(state, search) {
    state.search.push(_.clone(search));
    localStorage.search = JSON.stringify(state.search);
  },
  delSearch(state, search) {
    for (const [i, s] of state.search.entries()) {
      if (_.isEqual(s, search)) {
        state.search.splice(i, 1);
        break;
      }
    }
    localStorage.search = JSON.stringify(state.search);
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
  updateComment(state, item) {
    Vue.set(state.comments[item.type], item.id, {
      rate: item.rate,
      comment: item.comment
    });
  },
  saveComments(state) {
    localStorage.comments = JSON.stringify(state.comments);
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
