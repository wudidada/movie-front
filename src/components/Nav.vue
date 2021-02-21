<template>
  <div id="nav" class="flex-container">
    <ul>
      <li
        v-for="button in buttons"
        :key="button.name"
        :class="{ 'nav-dropdown-container': button['sub'] }"
      >
        <router-link
          :to="button.url"
          :class="['nav-link', { active: isActive(button) }]"
          >{{ button.name }}</router-link
        >
        <span v-if="button['sub']" class="arrow"></span>
        <ul v-if="button['sub']" class="nav-dropdown">
          <li v-for="sub in button.sub" :key="sub.url">
            <router-link :to="sub.url" class="nav-link">{{
              sub.name
            }}</router-link>
          </li>
        </ul>
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
  },
  methods: {
    isActive(button) {
      if (this.$route.path === button.url) {
        return true;
      }
      if (button["sub"]) {
        for (let sub of button.sub) {
          if (this.$route.path === sub.url) {
            return true;
          }
        }
      }
      return false;
    }
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

#nav > ul {
  display: flex;
  list-style-type: none;
  height: 40px;
  line-height: 40px;
  margin: 0;
  padding: 0;
}

#nav ul li {
  display: inline-block;
  margin: 0 0.6em;
  position: relative;
}

.nav-link {
  padding-bottom: 3px;
  color: #304455;
}

.nav-link:hover,
.router-link-active,
.active {
  border-bottom: 3px solid #42b983;
}

.nav-dropdown-container {
  padding-right: 0.8em;
}

.nav-dropdown-container .nav-link:hover:not(.router-link-active) {
  border-bottom: none;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #4f5959;
}

.nav-dropdown {
  display: none;
  max-height: calc(100vh - 61px);
  padding: 5px 0;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-color: #ccc;
  text-align: left;
  border-radius: 4px;
  white-space: nowrap;
}

.nav-dropdown-container:hover .nav-dropdown {
  display: block;
}

.nav-dropdown a:hover {
  color: #42b983;
}

.nav-dropdown .router-link-active {
  color: #42b983;
  border-bottom: none;
}

#nav .nav-dropdown .router-link-active::after {
  content: "";
  width: 0;
  height: 0;
  border-bottom: 5px solid #42b983;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  position: absolute;
  bottom: 0;
  left: calc(50% - 3px);
  transform: translateY(-50%);
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
