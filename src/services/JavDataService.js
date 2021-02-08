import http from "./Api";

export default {
  getNewRelease(params) {
    return http.get("/jav/new_release", { params });
  },

  getJav(params) {
    return http.get("/jav/v", { params });
  },

  getActorJav(params) {
    return http.get("/jav/actor", { params });
  }
};
