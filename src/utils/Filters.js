import Vue from "vue";

Vue.filter("fScore", value => {
  if (!value) return 0;
  return parseFloat(value.toFixed(1));
});

Vue.filter("smallPic", url => {
  if (!url) return url;
  let i = url.lastIndexOf("pl");
  if (i > -1) {
    return url.slice(0, i) + "ps" + url.slice(i + 2);
  }
  return url;
});

Vue.filter("largePic", url => {
  if (!url) return url;
  let i = url.lastIndexOf("ps");
  if (i > -1) {
    return url.slice(0, i) + "pl" + url.slice(i + 2);
  }
  return url;
});
