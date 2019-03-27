<template>
  <section class="signup">
    <h1>Sign Up and Enjoy (:</h1>
    <el-form @submit="signup" class="form-container">
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
            @click.prevent="signup">
            signup
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
        img: null
      }
    }
  },


  methods: {
    async signup() { 
        if (!this.user.username || !this.user.password) return //client side validation. there is also validation in the server
        try {
            const signedUser = await this.$store.dispatch({ type: 'signup', user: this.user})
            setTimeout(async ()=>{   //check why we can't login without timeout.
              await this.$store.dispatch({ type: 'login', user: signedUser})
              this.$router.go(-1)
                
            },200)
        }
        catch {
            console.log('Something went wrong, please try again')
        }

    }

  },
 
}
</script>

<style lang="scss" scoped>
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
    h1 {
        margin-top: 40px;
        font-size: 30px;
        text-transform: uppercase;

    }
</style>

