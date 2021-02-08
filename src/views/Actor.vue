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
      page: Number,
      actor: Object,
      query: {}
    };
  },
  components: {
    ItemList
  },
  metaInfo() {
    return {
      title: this?.actor?.name
    };
  },
  methods: {
    getData: JavDataService.getActorJav,
    getActor() {
      this.actor = {
        name: "TEST"
      };
    }
  },
  mounted() {
    console.log("mounted");
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
    this.getActor;
    this.query = { dmm_id: Number(this.$route.params.dmm_id) };
  }
};
</script>
