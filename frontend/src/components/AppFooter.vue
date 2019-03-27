<template>
  <footer>
   <br/>
    2019 All rights reserved.
  </footer>
</template>

<script>
import AppNav from "@/components/AppNav.vue";

export default {
  name: "Footer",
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
