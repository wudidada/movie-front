<template>
  <div class="new-release">
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
      title: "新发布"
    };
  },
  methods: {
    getData: JavDataService.getNewRelease
  },
  created() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
  }
};
</script>
