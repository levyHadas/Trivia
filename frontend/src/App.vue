<template>
  <div id="app">
    <app-header></app-header>
    <div class="bg">
      <router-view/>
      <window-size/>
    </div>
    <app-footer></app-footer>
    <link href="https://fonts.googleapis.com/css?family=Cabin|PT+Sans" rel="stylesheet">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    >
  </div>
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

import SocketService from "@/services/SocketService.js";
import UserService from "@/services/UserService.js";
import WindowSize from "@/components/WindowSize.vue";

export default {
  name: "App",
  components: {
    AppNav,
    AppHeader,
    AppFooter,
    WindowSize
  },

  async created() {
    this.$store.dispatch({ type: "setLoggedUser" });
  }
};
</script>

<style scoped lang="scss">



</style>
