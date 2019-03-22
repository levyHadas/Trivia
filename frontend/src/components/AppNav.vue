<template>
  <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signup">Sign Up</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/logout" @click="logout">Logout</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  methods: {
    async logout() { 
      try {
          await this.$store.dispatch({ type: 'logout'})
          this.$router.push('/home')
      }
      catch {
          console.log('Something went wrong, please try again')
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
