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
  },

  getDirectorJav(params) {
    return http.get("jav/director", { params });
  },

  getMakerJav(params) {
    return http.get("jav/maker", { params });
  },

  getLabelJav(params) {
    return http.get("jav/label", { params });
  },

  getSeriesJav(params) {
    return http.get("jav/series", { params });
  },

  getTagJav(params) {
    return http.get("jav/tag", { params });
  }
};
