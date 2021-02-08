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
    query: {
      type: Object,
      default: new Object()
    }
  },
  data() {
    return {
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
      return { page: this.page, ...this.query };
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
          this.page++;
        });
      }
    }
  },
  mounted() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
    this.loadData();
  }
};
</script>
