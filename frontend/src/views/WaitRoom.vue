<template>
  <section class="main-container waitroom-container">
    <p class="waiting">Waiting for friends to join the party<span>.</span><span>.</span><span>.</span></p>
    <!-- <h6>Welcome to our lounge, we'll do our best to fullfill your time while you wait.<br/>In the meanwhile here are some Chuck Norris jokes to ease the wait</h6> -->
    <div class="msg-box" id="animate-area">
      <p v-html="joke"  @click="killInterval"></p>
    </div>
    <!-- <button>Temp Button to kill interval</button> -->
  </section>
</template>
<script>
// The data in this page is not coming from the store since it's not relvant to other components

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
    this.jokeInterval = setInterval(this.getRandomJoke, 8000);
  },

  destroyed() {
    this.killInterval();
  },

  methods: {
    async getRandomJoke() {
      let res = await GameService.getRandomJoke();
      this.joke = res.data;
    },
    killInterval() {
      clearInterval(this.jokeInterval);
      this.jokeInterval = null
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped>
/* section {
  min-height: calc(100vh - 180px);
} */

.waitroom-container {
  display: flex;
  flex-direction: column;
  align-items: center;

}

h6 {
  padding: 40px;
  color: black;
}
div.msg-box {
  width: 60vw;
  margin-left: auto;
  margin-right: auto;
}
.msg-box p {
  padding: 20px;
  font-size: 2em;
}

.waiting {
  font-size: 40px;
  margin-top:20px;
}

.waiting span {
  font-size: 50px;
  animation-name: blink;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.waiting span:nth-child(2) {
  animation-delay: .2s;
}

.waiting span:nth-child(3) {
  animation-delay: .4s;
}

@keyframes blink {
  0% {
    opacity: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
}


		@keyframes animatedBackground {
			from { background-position: 0 0; }
			to { background-position: 100% 0; }
		}
		@-webkit-keyframes animatedBackground {
			from { background-position: 0 0; }
			to { background-position: 100% 0; }
		}
		@-ms-keyframes animatedBackground {
			from { background-position: 0 0; }
			to { background-position: 100% 0; }
		}
		@-moz-keyframes animatedBackground {
			from { background-position: 0 0; }
			to { background-position: 100% 0; }
		}

		#animate-area	{
      height: 300px;
      margin-top: 30px;
      background-size: cover;
      padding: 40px;
			background-image: url('../assets/bg-clouds.png');
			background-position: 0px 0px;
			background-repeat: repeat-x;
			animation: animatedBackground 40s linear infinite;
			-ms-animation: animatedBackground 40s linear infinite;
			-moz-animation: animatedBackground 40s linear infinite;
			-webkit-animation: animatedBackground 40s linear infinite;
		}
</style>
