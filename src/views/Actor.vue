<template>
  <div class="actor-items">
    <ItemList
      :getData="getData"
      :getInfo="getInfo"
      :query="query"
      :page="page"
      type="actor"
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
    getData: JavDataService.getActorJav,
    getInfo: JavDataService.getActorInfo
  },
  created() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
    this.query = { id: Number(this.$route.params.id) };
  }
};
</script>
