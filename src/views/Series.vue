<template>
  <div class="actor-items">
    <ItemList
      :getData="getData"
      :getInfo="getInfo"
      :query="query"
      :page="page"
    />
  </div>
</template>

<script>
import ItemList from "@/components/ItemList.vue";
import JavDataService from "@/services/JavDataService";
export default {
  data() {
    return {
      page: 1,
      query: {}
    };
  },
  components: {
    ItemList
  },
  methods: {
    getData: JavDataService.getSeriesJav,
    getInfo: JavDataService.getSeriesInfo
  },
  created() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
    this.query = { dmm_id: Number(this.$route.params.dmm_id) };
  }
};
</script>
