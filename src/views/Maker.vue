<template>
  <div class="actor-items">
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
      maker: {},
      query: {}
    };
  },
  components: {
    ItemList
  },
  metaInfo() {
    return {
      title: this.maker.name
    };
  },
  methods: {
    getData: JavDataService.getMakerJav,
    getMaker() {
      this.label = {
        name: "TEST"
      };
    }
  },
  created() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
    this.getMaker();
    this.query = { dmm_id: Number(this.$route.params.dmm_id) };
  }
};
</script>
