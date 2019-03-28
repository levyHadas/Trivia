<template>
  <div id="app">
      <appHeader></appHeader>
      <router-view/>
      <appFooter></appFooter>
    </div>
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

import SocketService from "@/services/SocketService.js";
import UserService from "@/services/UserService.js";


export default {
  name: "App",
  components: {
    AppNav,
    AppHeader,
    AppFooter
  },

  async created() {
    this.$store.dispatch({ type: "setLoggedUser" });
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
