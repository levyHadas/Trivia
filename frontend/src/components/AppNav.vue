<template>
  <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signup">Sign Up</router-link> |
      <router-link to="/login" v-if="!isUser">Login |</router-link> 
      <router-link to="/logout" v-if="isUser">Logout</router-link>
      <p v-if="isUser">Hello: {{loggedUser}}</p>
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
      return this.$store.getters.currUser.username
    },
    isUser() {
      if (this.$store.getters.currUser.username) return true
      return false

    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  p {
    text-transform: uppercase;
  }

</style>
