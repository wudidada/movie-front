<template>
  <div class="maker-list">
    <OrderList :getData="getData" :page="page" type="series" />
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
      title: "系列"
    };
  },
  methods: {
    getData: JavDataService.getSeries
  },
  created() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
  }
};
</script>
