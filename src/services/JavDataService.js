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
  },

  getActors(params) {
    return http.get("jav/actors", { params });
  },

  getDanyus(params) {
    return http.get("jav/danyus", { params });
  },

  getDirectors(params) {
    return http.get("jav/directors", { params });
  },

  getMakers(params) {
    return http.get("jav/makers", { params });
  },

  getLabels(params) {
    return http.get("jav/labels", { params });
  },

  getSeries(params) {
    return http.get("jav/serieses", { params });
  },

  getSearchResult(params) {
    return http.get("jav/search", { params });
  }
};
