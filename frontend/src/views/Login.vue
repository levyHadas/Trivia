<template>
  <section class="login">
    <el-form @submit="login" class="form-container">
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
        if (!this.user.username || !this.user.password) return //client side validation. there is also validation in the server
        try {
            await this.$store.dispatch({ type: 'login', user: this.user})
            this.$router.go(-1)
        }
        catch {
            console.log('Opss... Something went wrong, please try again')
        }

    }

  },
 
}
</script>

<style scoped lang="scss" scoped>
    .form-container {
        width: 80%;
        padding: 50px;
        height: 66vh;

        .el-input {
            margin: 20px 0;
        }
        .el-button {
            margin: 20px 0;

        }
    }
</style>

