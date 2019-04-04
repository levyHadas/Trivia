<template>
  <header class="header-container">
    <div class="app-header header-footer-container">
      <router-link to="/">
        <h1 class="logo">Trivia.</h1>
      </router-link>
      <app-nav/>
      <Slide right class="burger-menu2">
        <a id="home" href="#">
          <span>Home</span>
        </a>
      </Slide>
      <!-- <svg
        @click="menuClicked"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="bars"
        class="svg-inline--fa fa-bars fa-w-14"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="blue"
          d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
        ></path>
      </svg>-->
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
  methods: {
    menuClicked() {
      console.log("Menu clicked");
    }
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
  box-shadow: 5px -16px 12px 18px rgba(0, 0, 0, 0.32);
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
  color: black;
  font-size: 1.8rem;
}
.burger-menu2 {
  
}
@media (min-width: 700px) {
  .burger-menu2 {
    display: none;
  }
}
</style>
