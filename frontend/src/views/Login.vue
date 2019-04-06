<template>
  <section class="login main-container">
    <div class="space"></div>
    <el-form @submit="login" class="form-container"
     :class="{'scale-down': isMenuOpen}">
        <el-input class="el-input" required 
            v-model="user.username" 
            placeholder="Username" clearable>
        </el-input>
        <el-input type="password" class="el-input" required
            v-model="user.password"
            clearable show-password
            placeholder="Password">
        </el-input>
        <el-button type="primary" plain 
            native-type="submit" 
            @click.prevent="login">
            login
        </el-button>
    </el-form>

  </section>
</template>



<script>

export default {
  name: 'Login',

  data() {
    return {
      user: {
        username: '',
        password: '',
      }
    }
  },


  methods: {
    async login() { 
        if (!this.user.username || !this.user.password) return 
        //client side validation. there is also validation in the server
        try {
            await this.$store.dispatch({ type: 'login', user: this.user})
            this.$router.go(-1)
        }
        catch {
            console.log('Opss... Something went wrong, please try again')
        }

    }

  },
  computed: {
    isMenuOpen () {
      return this.$store.getters.isMenuOpen
    }
  }
 
}
</script>

<style scoped lang="scss" scoped>
  .space {
    padding-top: 50px;
  }
</style>

