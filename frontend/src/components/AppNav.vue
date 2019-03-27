<template>
  <nav>
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <router-link to="/signup">Sign Up</router-link>|
    <router-link to="/login" v-if="!realUser">Login |</router-link>
    <router-link to="/quest/edit" v-if="realUser">Create Question</router-link>
    <span v-if="realUser">|</span>
    <router-link to="/logout" v-if="realUser">Logout</router-link>
    <p v-if="realUser">Hello: {{loggedUser.username}}</p>
    <img :src="loggedUser.img" width="50px">
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },

  computed: {
    loggedUser() {
      return this.$store.getters.currUser;
    },
    realUser() {
      const user = this.$store.getters.currUser.username;
      if (this.$store.getters.currUser.username) return true;
      return false;
      //   if (!user) return false
      //   if (user._id.includes('guest')) {
      //     console.log(user._id.includes('guest'), 'real user?')
      //     return false
      //   }
      //   return true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  text-transform: uppercase;
}
</style>
