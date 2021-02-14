<template>
  <div id="outer" class="flex-container">
    <div class="items flex-container" @scroll="onScroll">
      <div class="item" v-for="[key, item] of Object.entries(items)" :key="key">
        <router-link
          :to="`/${type}/${item.id}`"
          target="_blank"
          :title="item.name"
        >
          <div class="rank">{{ key }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="count">{{ item.count }}</div>
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
      console.log("scroll");
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
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
