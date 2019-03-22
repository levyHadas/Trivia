<template>
  <section class="login">
    <form>
      <el-input class="el-input" required 
          v-model="user.username" 
          placeholder="Username" clearable>
      </el-input>

      <el-input type="password" class="el-input" required 
          v-model="user.password" 
          placeholder="Password" clearable>
      </el-input>
      <el-button type="primary" plain @click.prevent="login">login</el-button>
      <el-button type="primary" plain @click.prevent="logout">logout</el-button>

    </form>

  </section>
</template>





<script>

export default {
  name: 'login',

 

  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  created() {
      console.log('hi')
  },

  methods: {
    async login() { 
        if (!this.user.username || !this.user.password) return //client side validation. there is also validation in the server
        try {
            await this.$store.dispatch({ type: 'login', user: this.user})
            this.$router.push('/CategorySelection')
        }
        catch {
            console.log('Something went wrong, please try again')
        }

    }

  },
 
}
</script>
