<template>
  <div class="most-wanted">
    <ItemList :getData="getData" :page="page" />
  </div>
</template>

<script>
import ItemList from "@/components/ItemList.vue";
import JavDataService from "@/services/JavDataService";
export default {
  data() {
    return {
      page: 1
    };
  },
  components: {
    ItemList
  },
  metaInfo() {
    return {
      title: "热门"
    };
  },
  methods: {
    getData: JavDataService.getLatestMostWanted
  },
  created() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
  }
};
</script>
