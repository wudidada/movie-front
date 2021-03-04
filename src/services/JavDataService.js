import { jav } from "./Api";

export default {
  getNewRelease(params) {
    return jav.get("/jav/new_release", { params });
  },

  getJav(params) {
    return jav.get("/jav/v", { params });
  },

  getActorJav(params) {
    return jav.get("/jav/actor", { params });
  },

  getDirectorJav(params) {
    return jav.get("/jav/director", { params });
  },

  getMakerJav(params) {
    return jav.get("/jav/maker", { params });
  },

  getLabelJav(params) {
    return jav.get("/jav/label", { params });
  },

  getSeriesJav(params) {
    return jav.get("/jav/series", { params });
  },

  getTagJav(params) {
    return jav.get("/jav/tag", { params });
  },

  getActors(params) {
    return jav.get("/jav/actors", { params });
  },

  getDanyus(params) {
    return jav.get("/jav/danyus", { params });
  },

  getDirectors(params) {
    return jav.get("/jav/directors", { params });
  },

  getMakers(params) {
    return jav.get("/jav/makers", { params });
  },

  getLabels(params) {
    return jav.get("/jav/labels", { params });
  },

  getSeries(params) {
    return jav.get("/jav/serieses", { params });
  },

  getSearchResult(params) {
    return jav.get("/jav/search", { params });
  },

  getActorInfo(params) {
    return jav.get("/jav/actor_info", { params });
  },

  getDirectorInfo(params) {
    return jav.get("/jav/director_info", { params });
  },

  getMakerInfo(params) {
    return jav.get("/jav/maker_info", { params });
  },

  getLabelInfo(params) {
    return jav.get("/jav/label_info", { params });
  },

  getSeriesInfo(params) {
    return jav.get("/jav/series_info", { params });
  },

  getByCids(params) {
    return jav.get("/jav/cids", { params });
  },

  getLikesByIds(ids, type) {
    console.log(ids, type);
    return jav.get("/jav/ids", { params: { ids, type } });
  }
};
