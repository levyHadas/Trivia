<template>
  <header>
    <router-link to="/"><h1>Trivia.</h1></router-link>
    <AppNav></AppNav>
  </header>

</template>

<script>
import AppNav from "@/components/AppNav.vue";

export default {
  name: 'Header',
  props: {
    msg: String
  },
    components: {
    AppNav
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  a {
    text-decoration: none;
  }

</style>
