export default {
  isLiked(state) {
    return item => {
      return state.likes[item.type].some(a => a.id == item.id);
    };
  },
  isOwned(state) {
    return jav => {
      return jav.cid in state.owned;
    };
  },
  isSubscribed(state) {
    return jav => {
      return jav.cid in state.subscribed;
    };
  },
  isWatched(state) {
    return jav => {
      return jav.cid in state.watched;
    };
  },
  getWatched(state) {
    return jav => {
      return state.watched[jav.cid];
    };
  },
  getCids(state) {
    return type => {
      return Object.keys(state[type]);
    };
  }
};
