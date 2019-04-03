<template>
  <div id="app">
      <app-header></app-header>
      <div class="bg">
        <router-view/>

      </div>
      <app-footer></app-footer>
      <link href="https://fonts.googleapis.com/css?family=Cabin|PT+Sans" rel="stylesheet">
    </div>
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

import SocketService from "@/services/SocketService.js";
import UserService from "@/services/UserService.js";


export default {
  name: "App",
  components: {
    AppNav,
    AppHeader,
    AppFooter
  },

  async created() {
    this.$store.dispatch({ type: "setLoggedUser" });
  }
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat');
body {
  font-family: 'Montserrat', sans-serif;
}

// .bg {


//     &::before {
//      content: '';
//        width: 100%;
//        height: 100%;
//        top: 65px;
//        left: 0;
//        position: absolute;
//        opacity: 0.4;
//       //  background-image: url('https://static.vecteezy.com/system/resources/previews/000/092/926/original/question-mark-background-in-vector.jpg');
//        background-image: url('./assets/5.png');
//       //  background-image: url('./assets/4.jpg');
//        z-index: -1;
    
   
//   }
   
// }
// @import url("@../assets/reset.css");
// @import url("../assets/main.css");

// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// nav {
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: white;
//     }
//   }
// }
</style>
