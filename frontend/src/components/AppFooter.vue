<template>
  <footer class="footer-container">
    <div class="app-footer header-footer-container">
      <p>2019 All rights reserved.</p>
      <!-- <app-nav/> -->
      <div class="icon-credit">
        Icons made by
        <a href="https://www.flaticon.com/authors/smalllikeart" title="smalllikeart">smalllikeart</a> from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
        >CC 3.0 BY</a>
      </div>
    </div>
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
.footer-container {
  // box-shadow: 1px -5px 20px 0px #f4376d94;
  box-shadow: -1px 0px 2px 1px #3CBCC3;
  height: 55px;
  display: flex;
  align-items: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(60, 188, 195, 0.65);
  // z-index: ;

}
.app-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #04576a;
}

.icon-credit {
  display: none;
}
</style>
