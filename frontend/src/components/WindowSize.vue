<template>

 </template>

 <script>
export default {
  name: "window-size",
   created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.$store.commit({
        type: "setWidthSize", 
        windowWidth: window.innerWidth
      })
      if (window.innerWidth > 700) this.$store.commit('setMenuStatToFalse')
    }
  }
};
</script>

 <style scoped lang="scss">
</style>