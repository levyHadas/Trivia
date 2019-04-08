<template>
  <header class="header-container">
    <div class="app-header header-footer-container">
      <router-link to="/">
        <h1 class="logo">Trivia.</h1>
      </router-link>
      <Slide v-if="windowWidth < 700" right @openMenu="emitMenuChange" @closeMenu="emitMenuChange" disableEsc>
        <app-nav/>
      </Slide>
      <app-nav v-else/>
    </div>
  </header>
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import { Slide } from "vue-burger-menu";

export default {
  name: "Header",
  props: {
    msg: String
  },
  components: {
    AppNav,
    Slide
  },
  data() {
    return {
      realUser: true
    };
  },
 
  methods: {
    emitMenuChange() {
      this.$store.commit("toggleMenu");
    }
  },

  computed: {
    windowWidth() {
      return this.$store.getters.windowWidth;
    }
  }
};
</script>

<!-- Unscoped css -->
<style lang="scss">
.bm-menu {
  background-color: #1D1D2C;
}



div.bm-burger-button {
  top: 15px;
}

</style>

 <!-- Add "scoped" attribute to limit CSS to this component only -->	<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.header-container {
  height: 55px;
  background-color: #f9f8f6;
  border: 1px solid rgba(190, 190, 190, 0.658);
  display: flex;
  box-shadow: 5px -16px 12px 18px rgba(0, 0, 0, 0.32);
  align-items: center;
  opacity: 0.7;
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
  color: #101032;
  font-size: 2.5rem;
}
</style>