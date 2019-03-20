<template>
  <div class="home">
    <section class="main">
      <h3>Global. Knowlege. Play</h3>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  components: {}
};
</script>

<style lang="scss">
@import url("../assets/reset.css");

.home {
  img {
    width: 100%;
  }
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 50px;
  height: 60vh;
  background: url("../assets/main.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  h3 {
    color:white;
    background-color: green; 
    font-size: 50px;
    font-weight: bold;
  }
}

header {
  display: flex;
  justify-content: space-around;
  padding: 30px;
  background-color: rgb(101, 33, 43);
  color: white;
  a {
    color: white;
  }
  h1 {
    font-size: 60px;
  }
}

footer {
  background-color: rgb(0, 0, 0);
  color: white;
  a {
    color: white;
  }
  padding: 30px;
}
</style>
