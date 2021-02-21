<template>
  <div class="item-list">
    <ItemGallery :items="items" @scrollReachBottom="loadData" />
  </div>
</template>

<script>
import ItemGallery from "@/components/ItemGallery.vue";
export default {
  props: {
    getData: Function,
    page: Number,
    query: Object
  },
  data() {
    return {
      currentPage: 1,
      items: [],
      end: false,
      limit: 50
    };
  },
  components: {
    ItemGallery
  },
  computed: {
    param() {
      return { page: this.currentPage, limit: this.limit, ...this.query };
    }
  },
  methods: {
    loadData() {
      if (!this.end) {
        console.log(this.param);
        this.getData(this.param).then(response => {
          if (response.data.length < this.limit) {
            this.end = true;
          }
          this.items.push(...response.data);
          if (this.currentPage == 1 && response.data.length == 0) {
            this.$router.replace("/404");
          }
          this.currentPage++;
        });
      }
    }
  },
  created() {
    this.currentPage = this.page || 1;
    this.loadData();
  }
};
</script>
