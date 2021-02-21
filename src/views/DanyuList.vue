<template>
  <div class="danyu-list">
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
      title: "男优"
    };
  },
  methods: {
    getData: JavDataService.getDanyus
  },
  created() {
    this.page = this.$route.params["page"]
      ? Number(this.$route.params.page)
      : 1;
  }
};
</script>
