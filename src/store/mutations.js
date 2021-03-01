import Vue from "vue";
export default {
  clearHistory(state) {
    state.history.splice(0);
  },
  saveHistory(state) {
    localStorage.history = JSON.stringify(state.history);
  },
  delLiked(state, item) {
    let index = state.likes[item.type].findIndex(a => {
      return a.id == item.id;
    });
    state.likes[item.type].splice(index, 1);
  },
  addLiked(state, item) {
    state.likes[item.type].push({ name: item.name, id: item.id });
  },
  saveLiked(state) {
    localStorage.likes = JSON.stringify(state.likes);
  },
  addOwned(state, jav) {
    Vue.set(state.owned, jav.cid, new Date());
  },
  delOwned(state, jav) {
    Vue.delete(state.owned, jav.cid);
  },
  addSubscribed(state, jav) {
    Vue.set(state.subscribed, jav.cid, new Date());
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
  }
};
