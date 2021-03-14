<template>
  <div id="outer">
    <div class="items flex-container" @scroll="onScroll">
      <div
        class="item"
        v-for="[key, item] of Object.entries(items)"
        :key="key"
        @dragend="doCopy(item.name)"
      >
        <div class="rank">{{ key }}</div>
        <router-link :to="`/${type}/${item.id}`" :title="item.name">
          <strong class="name">{{ item.name }}</strong>
          <span class="count">({{ item.count }})</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    getData: Function,
    page: Number,
    query: Object,
    type: String
  },
  data() {
    return {
      currentPage: 1,
      items: {},
      end: false,
      limit: 100,
      isRresh: false
    };
  },
  computed: {
    param() {
      return { page: this.currentPage, limit: this.limit, ...this.query };
    }
  },
  methods: {
    loadData() {
      if (!this.end) {
        this.onLoad = true;
        console.log(this.param);
        this.getData(this.param).then(response => {
          if (response.data.length < this.limit) {
            this.end = true;
          }
          this.items = Object.assign({}, this.items, response.data);
          this.currentPage++;
        });
      }
      this.isRresh = false;
    },
    onScroll() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      let scrollTop = Math.ceil(
        document.documentElement.scrollTop || document.body.scrollTop
      );
      //变量windowHeight是可视区的高度
      let windowHeight = Math.ceil(
        document.documentElement.clientHeight || document.body.clientHeight
      );
      //变量scrollHeight是滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      // console.log(scrollTop, windowHeight, scrollHeight);
      if (!this.isRresh && scrollTop + windowHeight >= scrollHeight) {
        //到了这个就可以进行业务逻辑加载后台数据了
        this.isRresh = true;
        this.loadData();
        console.log("next page");
      }
    },
    doCopy(text) {
      this.$copyText(text).then(
        function() {
          console.log("copy", text, "success!");
        },
        function() {
          console.log("copy", text, "failed!");
        }
      );
    }
  },
  created() {
    this.currentPage = this.page || 1;
    this.loadData();
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style scoped>
#outer {
  margin: 6rem;
  margin-top: 0;
}

.item {
  box-sizing: border-box;
  width: 20%;
  padding: 1rem;
  margin: 0.5rem 0.4rem;
  text-align: center;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 14px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  display: flex;
}

a {
  margin: auto auto;
}

a:hover {
  color: #363636;
}

.rank {
  color: #363636;
  font-size: 0.9em;
  float: left;
  margin: -5px;
}

.count {
  color: #999;
}
</style>
