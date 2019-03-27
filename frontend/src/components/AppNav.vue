<template>
  <nav>
      <router-link to="/">Home</router-link>
      <span> | </span> 
      <router-link to="/about">About</router-link>
      <span> | </span> 
      <router-link to="/signup">Sign Up</router-link>
      <span> | </span> 
      <router-link to="/login" v-if="!realUser">Login</router-link>
      <span v-if="!realUser"> | </span>
      <router-link to="/logout" v-if="realUser">Logout</router-link>
      <span v-if="realUser"> | </span>
      <img :src="loggedUser.img" width="50px" v-if="realUser">
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  },

  computed: {
    loggedUser(){
      return this.$store.getters.currUser
    },
    realUser() {
      const user = this.$store.getters.currUser
      if (!user._id) return false
      if(user._id.includes('guest')) return false
      return true


    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
