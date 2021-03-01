export default {
  delLiked({ commit }, item) {
    commit("delLiked", item);
    commit("saveLiked");
  },
  addLiked({ commit }, item) {
    commit("addLiked", item);
    commit("saveLiked");
  },
  addOwned({ commit }, jav) {
    commit("addOwned", jav);
    commit("saveOwned");
  },
  delOwned({ commit }, jav) {
    commit("delOwned", jav);
    commit("saveOwned");
  },
  addSubscribed({ commit }, jav) {
    commit("addSubscribed", jav);
    commit("saveSubscribed");
  },
  delSubscribed({ commit }, jav) {
    commit("delSubscribed", jav);
    commit("saveSubscribed");
  },
  addWatched({ commit }, jav) {
    commit("addWatched", jav);
    commit("saveWatched");
  },
  delWatched({ commit }, jav) {
    commit("delWatched", jav);
    commit("saveWatched");
  },
  updateWatched({ commit }, watched) {
    commit("updateWatched", watched);
    commit("saveWatched");
  }
};
