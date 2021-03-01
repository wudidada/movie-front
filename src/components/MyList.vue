<template>
  <div class="my-list">
    <ItemGallery :items="items" @scrollReachBottom="loadData" />
  </div>
</template>

<script>
import ItemGallery from "@/components/ItemGallery.vue";
import JavDataService from "@/services/JavDataService";
export default {
  props: {
    cids: Array,
    message: String
  },
  data() {
    return {
      index: 0,
      limit: 50,
      items: [],
      isLoading: false
    };
  },
  components: {
    ItemGallery
  },
  computed: {
    param() {
      return { cids: this.cids.slice(this.index, this.limit) };
    }
  },
  metaInfo() {
    return {
      title: this.message
    };
  },
  methods: {
    loadData() {
      if (this.index < this.cids.length && !this.isLoading) {
        this.isLoading = true;
        JavDataService.getByCids(this.param)
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
    }
  },
  created() {
    this.loadData();
  }
};
</script>
