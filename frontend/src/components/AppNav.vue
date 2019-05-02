<template>
  <nav class="nav-container">
    <div class="btn-container">
      <router-link to="/">
        <button class="btn btn-nav">Home</button>
      </router-link>

      <router-link to="/signup">
        <button class="btn btn-nav">Sign Up</button>
      </router-link>

      <router-link to="/login" v-if="!realUser">
        <button class="btn btn-nav">Login</button>
      </router-link>

      <button @click="navToCreateQuest" class="btn btn-nav">Create</button>

      <router-link to="/logout" v-if="realUser">
        <button class="btn btn-nav">Logout</button>
      </router-link>
    </div>
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
      else
        this.$swal.fire({
          position: "top-end",
          type: "success",
          title: "Please login or sign up to create a question",
          showConfirmButton: true,
          timer: 3500
        });
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.currUser;
    },
    realUser() {
      let user = this.$store.getters.currUser;
      if (!user._id) return false;
      if (user._id.includes("guest")) return false;
      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.btn.btn-nav {
  padding: 10px;
  margin: 10px;

  color: #f9f8f6;
  // color: #F7F4E9;
  font-size: 1.2rem;
  width: 160px;
  background-color: inherit;
  border: 1px solid grey;
  &:hover{
		background-color: #3cbcc3;
	} 
}
.btn-container {
  .btn.btn-nav.btn-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
@media (min-width: 700px) {
  
  .btn.btn-nav {
    border: none;
    width: unset;
    padding: 7px 10px;
    font-size: 0.9rem;
    margin: 0 5px;
    background-color: #101032;
    color:#f9f8f6;
    &:last-of-type() {
      margin: 0;
    }
  }
 
}
</style>
