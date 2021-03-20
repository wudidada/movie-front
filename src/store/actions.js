import UserDataService from "../services/UserDataService";

export default {
  initApp({ dispatch }) {
    if (localStorage.token) {
      console.log("get user_info");
      UserDataService.getUserInfo(localStorage.token)
        .then(response => dispatch("initState", response.data))
        .catch(err => console.log("get user_info failed:", err.message));
    } else {
      dispatch("initState");
    }
  },
  initState({ commit }, data) {
    commit("initState", data);
  },
  delLiked({ commit }, item) {
    commit("delLiked", item);
    commit("saveLiked");
    UserDataService.delLikes({
      type: item.type,
      id: item.id
    }).catch(err => console.log("del_likes failed:", err.response.body.msg));
  },
  addLiked({ commit, state }, item) {
    commit("addLiked", item);
    commit("saveLiked");
    UserDataService.addLikes({
      type: item.type,
      id: item.id,
      data: state.likes[item.type][item.id]
    }).catch(err => console.log("add_likes failed:", err.response.body.msg));
  },
  updateComment({ commit, state }, item) {
    commit("updateComment", item);
    commit("saveComments");
    UserDataService.addComment({
      type: item.type,
      id: item.id,
      data: state.comments[item.type][item.id]
    }).catch(err =>
      console.log("update_comment failed:", err.response.body.msg)
    );
  },
  addOwned({ commit, state }, jav) {
    commit("addOwned", jav);
    commit("saveOwned");
    UserDataService.addOwned({
      cid: jav.cid,
      data: state.owned[jav.cid]
    }).catch(err => console.log("add_owned failed:", err.response.body.msg));
  },
  delOwned({ commit }, jav) {
    commit("delOwned", jav);
    commit("saveOwned");
    UserDataService.delOwned({
      cid: jav.cid
    }).catch(err => console.log("del_owned failed:", err.response.body.msg));
  },
  addSubscribed({ commit, state }, jav) {
    commit("addSubscribed", jav);
    commit("saveSubscribed");
    UserDataService.addSubscribed({
      cid: jav.cid,
      data: state.subscribed[jav.cid]
    }).catch(err =>
      console.log("add_subscribed failed:", err.response.body.msg)
    );
  },
  delSubscribed({ commit }, jav) {
    commit("delSubscribed", jav);
    commit("saveSubscribed");
    UserDataService.delSubscribed({
      cid: jav.cid
    }).catch(err =>
      console.log("del_subscribed failed:", err.response.body.msg)
    );
  },
  addWatched({ commit, state }, jav) {
    commit("addWatched", jav);
    commit("saveWatched");
    UserDataService.addWatched({
      cid: jav.cid,
      data: state.watched[jav.cid]
    }).catch(err => console.log("add_watched failed:", err.response.body.msg));
  },
  delWatched({ commit }, jav) {
    commit("delWatched", jav);
    commit("saveWatched");
    UserDataService.delWatched({
      cid: jav.cid
    }).catch(err => console.log("del_watched failed:", err.response.body.msg));
  },
  updateWatched({ commit, state }, watched) {
    commit("updateWatched", watched);
    commit("saveWatched");
    UserDataService.addWatched({
      cid: watched.cid,
      data: state.watched[watched.cid]
    }).catch(err =>
      console.log("update_watched failed:", err.response.body.msg)
    );
  },
  importRec({ dispatch }, { type, data }) {
    dispatch("add" + type[0].toUpperCase() + type.slice(1), data);
  }
};
