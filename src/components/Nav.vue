<template>
  <div id="nav" class="flex-container">
    <ul>
      <li v-for="button in buttons" :key="button.name" class="nav-button">
        <router-link :to="button.url" class="nav-link">
          {{ button.name }}
        </router-link>
      </li>
    </ul>
    <form action="/search" target="_blank" class="search-box">
      <div class="search-container">
        <div class="input-wrapper">
          <input name="keyword" class="search-input" />
        </div>
        <button type="submit" id="search-btn">
          <div class="search-logo"><SearchLogo class="logo" /></div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import SearchLogo from "@/assets/search.svg";

export default {
  components: {
    SearchLogo
  },
  props: {
    buttons: Array
  }
};
</script>

<style scoped>
#nav {
  position: sticky;
  top: 0;
  padding: 5px 60px;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-bottom-color: rgba(0, 0, 0, 0.12);
  border-style: solid;
  border-width: 0 0 thin;
  align-items: center;
}

ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
  padding: 8px;
}

.nav-link {
  padding-bottom: 3px;
  color: #304455;
}

.nav-link:hover,
.router-link-active {
  border-bottom: 3px solid #42b983;
}

.search-box {
  position: fixed;
  right: 60px;
}

.search-container {
  display: flex;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  height: 40px;
  width: 400px;
  margin: 0 auto;
}

.input-wrapper {
  padding: 5px 4px 0 20px;
  padding-top: 0;
  flex: 1;
  display: flex;
}

.search-input {
  flex: 1;
  outline: none;
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex: 100%;

  /* flex: 1; */
}

#search-btn {
  border: None;
  background: transparent;
  padding: 0;
  flex: 0 0 auto;
  padding-right: 13px;
  height: 40px;
  width: 40px;
}

.logo {
  width: 24px;
  height: 24px;
  fill: #4285f4;
}
</style>
