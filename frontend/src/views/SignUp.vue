<template>
  <section class="signup main-container">
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
            var signedUser = await this.$store.dispatch({ type: 'signup', user: this.user})
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

<style scoped lang="scss" scoped>

    h1 {
        margin: 0 auto;
        padding: 30px 0;
        font-size: 30px;
        text-transform: uppercase;
        text-align:center;

    }
</style>

