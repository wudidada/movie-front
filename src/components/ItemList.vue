<template>
  <div class="item-list">
    <ItemGallery :items="items" @scrollReachBottom="loadData">
      <template v-slot:sort-bar>
        <div class="flex-container filter-bar">
          <span style="font-size:14px; margin-right:40px">{{
            items.length
          }}</span>
          <el-checkbox-group
            class="filter"
            v-model="filter"
            :min="0"
            :max="1"
            @change="reloadData"
          >
            <el-checkbox label="mono">单体</el-checkbox>
            <el-checkbox label="nocollection">不看合集</el-checkbox>
          </el-checkbox-group>
        </div>
      </template>
    </ItemGallery>
  </div>
</template>

<script>
import ItemGallery from "@/components/ItemGallery.vue";
export default {
  props: {
    getData: Function,
    getInfo: Function,
    page: Number,
    query: Object
  },
  data() {
    return {
      currentPage: 1,
      items: [],
      info: {},
      end: false,
      limit: 50,
      isLoading: false,
      filter: []
    };
  },
  components: {
    ItemGallery
  },
  computed: {
    param() {
      let param = {
        page: this.currentPage,
        limit: this.limit,
        ...this.query
      };
      if (this.filter.length > 0) {
        param.filter = this.filter[0];
      }
      return param;
    }
  },
  metaInfo() {
    return {
      title: this.info.name
    };
  },
  methods: {
    reloadData() {
      this.currentPage = 1;
      this.end = false;
      this.items.splice(0);
      this.loadData();
    },
    loadData() {
      if (!this.end && !this.isLoading) {
        this.isLoading = true;
        console.log(this.param);
        this.getData(this.param)
          .then(response => {
            if (response.data.length < this.limit) {
              this.end = true;
            }
            this.items.push(...response.data);
            if (this.currentPage == 1 && response.data.length == 0) {
              this.$router.replace("/404");
            }
            this.currentPage++;
            this.isLoading = false;
          })
          .catch(() => {
            console.log("get page failed:", this.$route.fullPath);
            this.$router.replace("/404");
          });
      }
    },
    loadInfo() {
      if (this.getInfo) {
        this.getInfo(this.query).then(response => {
          this.info = response.data;
        });
      }
    }
  },
  created() {
    this.currentPage = this.page || 1;
    this.loadInfo();
    this.loadData();
  }
};
</script>

<style scoped>
.filter-bar {
  width: 100%;
  margin-bottom: 10px;
  align-items: center;
}
</style>
