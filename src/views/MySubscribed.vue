<template>
  <div class="subscribed-items">
    <MyList :cids="cids" />
  </div>
</template>

<script>
import MyList from "@/components/MyList.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cids: []
    };
  },
  components: {
    MyList
  },
  computed: {
    ...mapGetters(["getCids"])
  },
  created() {
    this.cids = this.getCids("subscribed");
  }
};
</script>
