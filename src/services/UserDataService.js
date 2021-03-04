import { user } from "./Api";

export default {
  getUserInfo() {
    return user.get("/user_info");
  },

  register(info) {
    return user.post("/register", info);
  },

  login(info) {
    return user.post("/login", info);
  },

  pushState(data) {
    return user.put("/state", data);
  },

  delLikes(data) {
    return user.put("/del_likes", data);
  },

  addLikes(data) {
    return user.put("/add_likes", data);
  },

  addOwned(data) {
    return user.put("/add_owned", data);
  },

  delOwned(data) {
    return user.put("/del_owned", data);
  },

  addSubscribed(data) {
    return user.put("/add_subscribed", data);
  },

  delSubscribed(data) {
    return user.put("/del_subscribed", data);
  },

  addWatched(data) {
    return user.put("/add_watched", data);
  },

  delWatched(data) {
    return user.put("/del_watched", data);
  }
};
