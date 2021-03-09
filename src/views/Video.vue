<template>
  <Article :jav="jav" />
</template>

<script>
import JavDataService from "../services/JavDataService";
import Article from "../components/Article.vue";
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["getWatched"])
  },
  methods: {
    getData(cid) {
      JavDataService.getJav({ cid })
        .then(res => {
          if (!res.data) this.redirect();
          this.jav = Object.assign({}, this.jav, res.data);
          return this.jav;
        })
        .then(() => {
          const w = this.getWatched(this.jav);
          if (!w) {
            return;
          }
          if (w.comment) {
            this.$set(this.jav, "comment", w.comment);
          }
          if (w.rate) {
            this.$set(this.jav, "rate", w.rate);
          }
        })
        .then(() => {
          if (!this.jav.desc) {
            return { data: this.jav.desc };
          }
          return JavDataService.translate(this.jav.desc);
        })
        .then(result => this.$set(this.jav, "desc", result.data))
        .catch(err => {
          console.log(this.jav.cid, err.message);
          this.redirect();
        });
    },
    redirect() {
      this.$router.replace("/404");
    }
  },
  created() {
    let cid = this.$route.params.cid;
    console.log("cid", cid);
    this.getData(cid);
  }
};
</script>
