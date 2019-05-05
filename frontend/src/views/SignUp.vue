<template>
  <section class="signup main-container">
    <h1 :class="{'scale-down': isMenuOpen}">Sign Up and Enjoy (:</h1>
    <el-form @submit="signup" class="form-container" :class="{'scale-down': isMenuOpen}">
      <el-input class="el-input" required v-model="user.username" placeholder="Username" clearable></el-input>
      <el-input
        type="password"
        class="el-input"
        required
        v-model="user.password"
        clearable
        show-password
        placeholder="Password"
      ></el-input>
      <el-input
        class="el-input"
        required
        v-model="user.nickname"
        placeholder="Nickname (will show in party game)"
        clearable
      ></el-input>
      <el-button type="primary" plain native-type="submit" @click.prevent="signup">signup</el-button>
    </el-form>
  </section>
</template>





<script>
export default {
  name: "SignUp",

  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
        img: null
      }
    };
  },

  methods: {
    async signup() {
      if (!this.user.username || !this.user.password) return; //client side validation. there is also validation in the server
      try {
        var signedUser = await this.$store.dispatch({
          type: "signup",
          user: this.user
        });
        await this.$store.dispatch({ type: "login", user: signedUser });
        this.$router.go(-1);
      } catch {
        console.log("Something went wrong, please try again");
      }
    }
  },
  computed: {
    isMenuOpen() {
      return this.$store.getters.isMenuOpen;
    }
  }
};
</script>

<style scoped lang="scss" scoped>
h1 {
  margin: 0 auto;
  padding: 30px 0;
  font-size: 30px;
  text-transform: uppercase;
  text-align: center;
}
</style>

