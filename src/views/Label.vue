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
      label: {},
      query: {}
    };
  },
  components: {
    ItemList
  },
  metaInfo() {
    return {
      title: this.label.name
    };
  },
  methods: {
    getData: JavDataService.getLabelJav,
    getLabel() {
      this.label = {
        name: "TEST"
      };
    }
  },
  created() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
    this.getLabel();
    this.query = { id: Number(this.$route.params.id) };
  }
};
</script>
