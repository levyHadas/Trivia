<template>

</template>

<script>
export default {

  name: 'Logout',

  async created() {
    try {
      await this.$store.dispatch({ type: 'logout'})
      this.$router.push('/')
      console.log('logged out')
    }
    catch {
        console.log('Something went wrong, please try again')
    }
  }


}
</script>

