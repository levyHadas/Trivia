<template>
  <nav>
    <router-link to="/">Home</router-link>
    <span>|</span>
    <router-link to="/about">About</router-link>
    <span>|</span>
    <router-link to="/signup">Sign Up</router-link>
    <span>|</span>
    <router-link to="/login" v-if="!realUser">Login</router-link>
    <span v-if="!realUser">|</span>
    <button @click="navToCreateQuest" class="nav-btn">Create Question</button>
    <span>|</span>
    <router-link to="/logout" v-if="realUser">Logout</router-link>
    <span v-if="realUser">|</span>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  methods: {
    navToCreateQuest() {
      if (this.realUser) this.$router.push("/quest/edit");
      else this.$message("Please login or sign up to create question");
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.currUser;
    },
    realUser() {
      const user = this.$store.getters.currUser;
      if (!user._id) return false;
      if (user._id.includes("guest")) return false;
      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-btn {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
}
</style>
