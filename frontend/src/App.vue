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

import SocketService from '@/services/SocketService.js'
import UserService from '@/services/UserService.js'

export default {
  name: "App",
  components: {
    AppNav,
    AppHeader,
    AppFooter
  },

  async created() {
    // var vueSocket = socketService.getSocketConnection()
    // vueSocket.emit('testingAgain', '123123')
    // vueSocket.on('pingUser', pingMsg => {
    //     console.log(pingMsg)
    // })

    //if currUser -> take from store, if not, make id)
    // SocketService.emit('connectionTest', 'Hi from Component')
    // SocketService.on('connectionTest', msgFromServer => {
    //     console.log(msgFromServer)
    // })
    const loggedUser = await UserService.getLoggedUser()
    if (loggedUser)  {
      // SocketService.emit("userConnected", loggedUser)
      this.$store.commit({type: 'setCurrUser', user:loggedUser})
    }
    // else SocketService.emit("userConnected", 'annonymouse')
    
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
