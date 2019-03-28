<template>
  <footer>
   <br/>
    2019 All rights reserved.
    <div class="icon-credit">Icons made by <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
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
.icon-credit {
  display: none;
}
</style>
