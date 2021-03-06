<template>
  <div :class="`${type}-items`">
    <MyList :cids="cids" :type="type" />
  </div>
</template>

<script>
import MyList from "@/components/MyList.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cids: [],
      type: ""
    };
  },
  metaInfo() {
    return {
      title: "我" + this.$options.filters.fType(this.type) + "的"
    };
  },
  components: {
    MyList
  },
  computed: {
    ...mapGetters(["getCids"])
  },
  created() {
    console.log("created");
    this.type = this.$route.params.type;
    this.cids = this.getCids(this.type);
  }
};
</script>
