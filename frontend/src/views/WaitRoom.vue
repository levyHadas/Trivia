<template>
  <section class="section-container">
    <div class="main-container waitroom-container" :class="{'scale-down':isMenuOpen}">
      <p class="waiting">Waiting for friends to join the party<span>.</span><span>.</span><span>.</span></p>
      <div class="joke-box" id="animate-area">
        <p v-html="joke"  @click="killInterval"></p>
      </div>
    </div>
    
  </section>
</template>
<script>
// The data in this page is not coming from the store since it's not relvant to other components

// TODO - Bring jokes to storage in case api not working properly

import GameService from "../services/GameService.js"
import SocketService from "@/services/SocketService.js"


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
  computed: {
     isMenuOpen() {
      return this.$store.getters.isMenuOpen;
    }
  },
  watch: {}
};
</script>

<style scoped>


.section-container {
  background-image: url('https://media.giphy.com/media/5QSIcVPpTj9r7RXbNb/giphy.gif');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.waitroom-container {
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 481px){
.waitroom-container {
  width: auto;

}

}


.joke-box {
  /* width: 100%; */
  /* max-width: 600px; */
  margin-left: auto;
  margin-right: auto;
  margin-top: 300px;
}
.joke-box p {
  font-size: 1.5em;
  font-family: 'Merriweather', serif;
  /* font-family: 'PT Sans', sans-serif; */
}

.waiting {
  font-size: 30px;
  position: absolute;
  top: 90px;
  text-align: center;
  padding: 0 30px;

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

		/* #animate-area	{
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
      width: inherit;
		} */
</style>
