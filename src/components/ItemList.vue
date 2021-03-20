<template>
  <div class="item-list">
    <ItemGallery :items="items" @scrollReachBottom="loadData">
      <template v-slot:info-bar v-if="this.type">
        <div class="info-bar">
          <div class="info">
            <h2>{{ name }}</h2>
            <el-rate v-model="rate" @change="update"></el-rate>
            <div class="comment" v-if="!isInput">{{ comment }}</div>
            <div class="comment" v-else>
              <el-input v-model="comment"></el-input>
            </div>
            <i
              v-if="!isInput"
              @click="input"
              class="el-icon-edit"
              title="编辑"
            ></i>
            <el-button size="medium" v-if="isInput" @click="update"
              >确定</el-button
            >
          </div>
          <div class="blank"></div>
        </div>
      </template>
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
          <i :class="[orderIcon, 'order-icon']" @click="sort" />
        </div>
      </template>
    </ItemGallery>
  </div>
</template>

<script>
import ItemGallery from "@/components/ItemGallery.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    getData: Function,
    getInfo: Function,
    page: Number,
    query: Object,
    type: String
  },
  data() {
    return {
      isInput: false,
      rate: 0,
      comment: "",
      currentPage: 1,
      items: [],
      info: {},
      end: false,
      limit: 50,
      isLoading: false,
      filter: [],
      order: -1
    };
  },
  components: {
    ItemGallery
  },
  computed: {
    ...mapGetters(["getComment"]),
    orderIcon() {
      return this.order > 0 ? "el-icon-sort-up" : "el-icon-sort-down";
    },
    param() {
      let param = {
        page: this.currentPage,
        limit: this.limit,
        order: this.order,
        ...this.query
      };
      if (this.filter.length > 0) {
        param.filter = this.filter[0];
      }
      return param;
    },
    name() {
      if (this.info.alias && this.info.alias.length > 0) {
        const alias = this.info.alias.join(",");
        return this.info.name + `(${alias})`;
      }

      return this.info.name;
    }
  },
  metaInfo() {
    return {
      title: this.info.name
    };
  },
  methods: {
    ...mapActions(["updateComment"]),
    sort() {
      this.order = -this.order;
      this.reloadData();
    },
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
          if (this.type) {
            const comment = this.getComment({
              type: this.type,
              id: this.query.id
            });
            if (comment) {
              this.rate = comment.rate;
              this.comment = comment.comment;
            }
          }
        });
      }
    },
    input() {
      this.isInput = true;
    },
    update() {
      this.isInput = false;
      this.updateComment({
        type: this.type,
        id: this.query.id,
        rate: this.rate,
        comment: this.comment
      });
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
.info-bar {
  width: 100%;
  display: flex;
}

.info {
  margin-left: 60px;
}

h2 {
  margin: 0;
}

.blank {
  flex-grow: 1;
}

.filter-bar {
  width: 100%;
  margin-bottom: 10px;
}

.order-icon {
  cursor: pointer;
  margin-left: 2em;
}
</style>
