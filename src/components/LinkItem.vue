<template>
  <div class="link-item">
    <router-link :to="`/${type}/${item.id}`" target="_blank">{{
      item.name
    }}</router-link>
    <div
      v-if="isLiked({ ...item, type: type })"
      class="liked"
      @click="delLiked({ ...item, type: type })"
    >
      <HeartSolid class="liked-icon" />
    </div>
    <div v-else class="tolike" @click="addLiked({ ...item, type: type })">
      <HeartRegular class="tolike-icon" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HeartRegular from "@/assets/heart-regular.svg";
import HeartSolid from "@/assets/heart-solid.svg";

export default {
  props: {
    item: Object,
    type: String
  },
  components: {
    HeartRegular,
    HeartSolid
  },
  computed: {
    ...mapGetters(["isLiked"])
  },
  methods: {
    ...mapActions(["delLiked", "addLiked"])
  }
};
</script>

<style scoped>
.tolike {
  display: inline-block;
  color: red;
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-left: 4px;
  vertical-align: bottom;
}

.liked {
  display: inline-block;
  color: red;
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-left: 4px;
  vertical-align: bottom;
}
</style>
