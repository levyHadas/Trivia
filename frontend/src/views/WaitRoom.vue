<template>
  <section>
    <h1>Waiting for friends to join the party... </h1>
    <h6>Welcome to our lounge, we'll do our best to fullfill your time while you wait</h6>
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
      joke: "There are only two things that can cut diamonds: other diamonds, and Chuck Norris."
    };
  },

  created() {
    console.log("Created");
    this.jokeInterval = setInterval(this.getRandomJoke, 8000);
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
      this.jokeInterval = null
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
  color: black
}
h6 {
  padding: 40px;
  color: black
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
