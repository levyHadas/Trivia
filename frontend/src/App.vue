<template>
  <div id="app">
    <appHeader></appHeader>
    <router-view/>
    <appFooter></appFooter>
  </div>
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

import socketService from '@/services/SocketService.js'

export default {
  name: "App",
  components: {
    AppNav,
    AppHeader,
    AppFooter
  },

  created() {
    var vueSocket = socketService.getSocketConnection()
    vueSocket.emit('testingAgain', '123123')
    socketService.on('pingUser', pingMsg => {
        console.log(pingMsg)
    })
    // vueSocket.on('pingUser', pingMsg => {
    //     console.log(pingMsg)
    // })
  }
}






</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
