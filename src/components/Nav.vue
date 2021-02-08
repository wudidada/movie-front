<template>
  <div id="nav" class="flex-container">
    <ul>
      <li v-for="button in buttons" :key="button.name">
        <router-link :to="button.url"> {{ button.name }} </router-link>
      </li>
    </ul>
    <div id="search-bar" class="flex-container">
      <input placeholder="搜索" />
      <button>搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttons: Array
  }
};
</script>

<style>
#nav {
  position: sticky;
  top: 0;
  background-color: white;
}

ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

a {
  display: inline-block;
  padding: 8px;
}

#search-bar {
  margin-left: 50px;
}

#search-bar button {
  background-color: blanchedalmond;
  margin: 0 5px;
}
</style>
