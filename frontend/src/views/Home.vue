<template>
  <div class="home">
    <section class="main">
      <h3>Global. Knowlege. Compete With Others</h3>
      <br>
      <a href="" class="download2">Play</a>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 50px;
  height: 60vh;
  background: url("../assets/main.jpg") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  h3 {
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    // background-color: green;
    border-radius: 20px;
    font-size: 30px;
    font-weight: bold;
    padding: 10px;
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

.download2 {
  display: inline-block;
  margin-right: 10px;
  background: rgb(253,47,83);
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  line-height: 38px;
  border-radius: 50px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: 170px;
  text-align: center;
}

.download2:hover {
  background: #fff;
  color: #339dff;
  box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
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
