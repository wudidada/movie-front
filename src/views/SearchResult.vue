<template>
  <div class="result-items">
    <ItemList :getData="getData" :query="query" :page="page" />
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
  metaInfo() {
    return {
      title: "搜索"
    };
  },
  methods: {
    getData: JavDataService.getSearchResult
  },
  created() {
    this.query = this.$route.query;
  }
};
</script>
