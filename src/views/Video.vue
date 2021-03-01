<template>
  <Article :jav="jav" :comment="comment" :rate="rate" />
</template>

<script>
import JavDataService from "../services/JavDataService";
import Article from "../components/Article.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      jav: {},
      comment: "",
      rate: 0
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
  computed: {
    ...mapGetters(["getWatched"])
  },
  methods: {
    getData(cid) {
      JavDataService.getJav({ cid })
        .then(res => {
          if (!res.data) this.redirect();
          this.jav = res.data;
        })
        .then(() => {
          const watched = this.getWatched(this.jav);
          if (watched) {
            this.comment = this.getWatched(this.jav).comment || "";
            this.rate = this.getWatched(this.jav).rate || 0;
          }
        })
        .catch(() => this.redirect());
    },
    redirect() {
      this.$router.replace("/404");
    }
  },
  created() {
    let cid = this.$route.params.cid;
    this.getData(cid);
  }
};
</script>
