import Vue from "vue";

Vue.filter("fScore", value => {
  if (!value) return 0;
  return parseFloat(value.toFixed(1));
});

Vue.filter("fDate", date => {
  if (!date) return date;
  let dateString = date;
  if (date instanceof Date) {
    const copy_date = new Date(date);
    copy_date.setMinutes(
      copy_date.getMinutes() - copy_date.getTimezoneOffset()
    );
    dateString = copy_date.toJSON();
  }
  return dateString.slice(0, 10);
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
  let i = url.lastIndexOf("ps.");
  if (i > -1) {
    return url.slice(0, i) + "pl." + url.slice(i + 3);
  }
  return url;
});

Vue.filter("fID", ID => {
  if (!ID) return ID;
  let res = ID.match(/[^\s]+\s*[^\s]*/);
  if (res && res[0].length < ID.length) {
    return res[0] + "...";
  }
  return ID;
});

Vue.filter("fType", type => {
  const typeMap = {
    actor: "演员",
    director: "导演",
    maker: "制作商",
    label: "发行商",
    tag: "类别",
    series: "系列",
    dvd_id: "番号",
    title: "标题",
    keyword: "关键词",
    watched: "已看",
    subscribed: "想看",
    owned: "拥有"
  };
  return typeMap[type] || type;
});

Vue.filter("fKeyword", keyword => {
  const keywordMap = {
    发布时间: "pub_date",
    加入时间: "add_date"
  };
  return keywordMap[keyword] || keyword;
});
