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
  height: 55px;
  background-color: white;
  border: 1px solid rgba(190, 190, 190, 0.658);
  display: flex;
  box-shadow:5px -16px 12px 18px rgba(0, 0, 0, 0.32);
  align-items: center;
  opacity: 0.6;

  z-index: 25;

}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 25;
}

.logo {
  color: white;
  font-size: 1.8rem;
}

</style>
