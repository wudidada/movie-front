<template>
  <div id="outer">
    <div class="items flex-container" @scroll="onScroll">
      <div class="item" v-for="item of items" :key="item.id">
        <router-link :to="`/${type}/${item.id}`" :title="item.name">
          <strong class="name">{{ item.name }}</strong>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import JavDataService from "../services/JavDataService";
import { mapGetters } from "vuex";
import Vue from "vue";

export default {
  data() {
    return {
      ids: [],
      items: [],
      type: "",
      index: 0,
      limit: 20,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters(["getLikesIds"]),
    idList() {
      return this.ids.slice(this.index, this.index + this.limit);
    }
  },
  metaInfo() {
    return {
      title: `我喜爱的${Vue.filter("fType")(this.type)}`
    };
  },
  methods: {
    loadData() {
      console.log("load data.");
      if (this.index < this.ids.length && !this.isLoading) {
        this.isLoading = true;
        JavDataService.getLikesByIds(this.idList, this.type)
          .then(response => {
            this.items.push(...response.data);
            this.index += this.limit;
            this.isLoading = false;
          })
          .catch(() => {
            console.log("get page failed:", this.$route.fullPath);
            this.$router.replace("/404");
          });
      }
    },
    redirect() {
      this.$router.replace("/404");
    },
    onScroll() {
      let scrollTop = Math.ceil(
        document.documentElement.scrollTop || document.body.scrollTop
      );
      let windowHeight = Math.ceil(
        document.documentElement.clientHeight || document.body.clientHeight
      );
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // console.log(scrollTop, windowHeight, scrollHeight);
      if (!this.isLoading && scrollTop + windowHeight >= scrollHeight) {
        this.loadData();
        console.log("next page");
      }
    }
  },
  created() {
    this.type = this.$route.params.type;
    this.ids = this.getLikesIds(this.type);
    this.loadData();
  }
};
</script>

<style scoped>
#outer {
  margin: 6rem;
  margin-top: 0;
}

.item {
  box-sizing: border-box;
  width: 20%;
  padding: 1rem;
  margin: 0.5rem 0.4rem;
  text-align: center;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  display: flex;
}

a {
  margin: auto auto;
}

a:hover {
  color: #363636;
}
</style>
