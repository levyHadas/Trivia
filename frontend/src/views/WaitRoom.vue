<template>
  <section>
    <h1>Welcome to our lounge, we'll do our best to fullfill your time while you wait</h1>
    <div class="msg-box"><p>{{joke}}</p></div>
    <button @click="killInterval">Temp Button to kill interval</button>
  </section>
</template>
<script>
// This Page does not going through store since this data is not relvant to other components


// TODO - Bring jokes to storage in case api not working properly

import GameService from "../services/GameService.js";

export default {
  data() {
    return {
      jokeInterval: null,
      joke: "Chuck Norris doesn't have pubic hairs because hair doesn't grow on balls of steal."
    };
  },

  created() {
    console.log("Created");
    this.jokeInterval = setInterval(this.getRandomJoke, 5000);
  },

  destroyed() {
    console.log("destroyed");
    this.killInterval();
  },

  methods: {
    async getRandomJoke() {
      console.log('new interval was invoked');
      
      let res = await GameService.getRandomJoke();
      this.joke = res.data;
    },
    killInterval() {
      console.log("kill interval was clicked");

      clearInterval(this.jokeInterval);
      console.log("Interval was killed interval: ", this.jokeInterval);
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped>
h1 {
  font-size: 2em;
  padding: 40px;
}
div.msg-box {
  width: 60vw;
  height: 400px;
  border: 2px solid black;
  margin-left: auto;
  margin-right: auto;
  /* width: 50%; */
}
.msg-box p {
  padding: 20px;
  font-size: 2em;
}
</style>
