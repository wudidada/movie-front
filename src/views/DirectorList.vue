<template>
  <div class="director-list">
    <OrderList :getData="getData" :page="page" type="director" />
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
      title: "导演"
    };
  },
  methods: {
    getData: JavDataService.getDirectors
  },
  created() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
  }
};
</script>
