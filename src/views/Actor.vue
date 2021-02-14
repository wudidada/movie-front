<template>
  <div class="actor-items">
    <ItemList
      :getData="getData"
      :query="query"
      :page="page"
      :incresePage="increasePage"
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
      actor: {},
      query: {}
    };
  },
  components: {
    ItemList
  },
  metaInfo() {
    return {
      title: this.actor.name
    };
  },
  methods: {
    getData: JavDataService.getActorJav,
    getActor() {
      this.actor = {
        name: "TEST"
      };
    },
    increasePage() {
      this.page++;
    }
  },
  created() {
    console.log("mounted");
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
    this.getActor();
    this.query = { id: Number(this.$route.params.id) };
  }
};
</script>
