<template>
  <div class="actor-list">
    <OrderList :getData="getData" :page="page" type="actor" />
  </div>
</template>

<script>
import OrderList from "@/components/OrderList.vue";
import JavDataService from "@/services/JavDataService";
export default {
  data() {
    return {
      page: 1
    };
  },
  components: {
    OrderList
  },
  metaInfo() {
    return {
      title: "演员"
    };
  },
  methods: {
    getData: JavDataService.getActors
  },
  created() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
  }
};
</script>
