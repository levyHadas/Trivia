<template>
  <header>
    <h1>Trivia.</h1>
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

</style>
