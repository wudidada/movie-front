<template>
  <Article :jav="jav" />
</template>

<script>
import JavDataService from "../services/JavDataService";
import Article from "../components/Article.vue";

export default {
  data() {
    return {
      jav: {}
    };
  },
  components: {
    Article
  },
  metaInfo() {
    return {
      title: `${this?.jav?.dvd_id} ${this?.jav?.title}`
    };
  },
  methods: {
    getData(cid) {
      JavDataService.getJav({ cid })
        .then(res => {
          if (!res.data) this.redirect();
          this.jav = res.data;
        })
        .catch(() => this.redirect());
    },
    redirect() {
      this.$route.replace("/404");
    }
  },
  created() {
    let cid = this.$route.params.cid;
    this.getData(cid);
  }
};
</script>
