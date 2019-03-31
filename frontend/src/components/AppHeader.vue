<template>
  <header class="header-container">
    <div class="app-header header-footer-container">
      <router-link to="/">
        <h1 class="logo">Trivia.</h1>
      </router-link>
      <app-nav/>
    </div>
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

.header-container {
  height: 80px;
  background-color: #4704eb;
  display: flex;
  align-items: center;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%
}

.logo {
  color: white;
  font-size: 1.8rem;
}

</style>
