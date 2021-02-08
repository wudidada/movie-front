import Vue from "vue";

Vue.filter("fScore", value => {
  if (!value) return 0;
  return parseFloat(value.toFixed(1));
});
