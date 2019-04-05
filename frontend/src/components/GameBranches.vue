<template>
  <!-- <section class="main"> -->
  <section class="game-branches main-container">

    <section v-if="isPartyMode" class="party-mode">
      <div class="party-players">
        <party-players :playersWithScores="playersWithScores"></party-players>
      </div>
      <div class="game">
        <game-screen @updateProgress="sendProgress"></game-screen>
      </div>
    </section>

    <section v-else class="single-mode">
      <player-progress :player="player" :scores="playerScore"></player-progress>
      <game-screen @updateProgress="sendProgress"></game-screen>
    </section>
    
  </section>
</template>

<script>
import GameScreen from "@/views/GameScreen";
import PartyPlayers from "@/components/PartyPlayers";
import PlayerProgress from "@/components/PlayerProgress";
import SocketService from "@/services/SocketService.js";


export default {
  name: "Game",
  props: {
    question2: Array
  },

  async created() {

    console.log("group game was created");
    this.params = this.$route

  },

  data() {
    return {
      params: '',
      player: {
        _id: "22",
        name: "puki",
        img: "src",
        scores: [
        ]
      }
    };
  },
  methods: {
    sendProgress(scores) {
      this.player.scores = scores;
    }
  },
  computed: {
    isPartyMode() {
      if (this.params.name === "partyMode") return true;
      false;
    },
    playerScore() {
      return this.player.scores;
    },
    playersWithScores() {
      return this.$store.getters.playersWithScores
    }


  },
  components: {
    PartyPlayers,
    PlayerProgress,
    GameScreen
  }
};
</script>

<style scoped lang="scss">
.party-mode {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
	margin-top: 40px;

}

.single-mode {
  margin-top: 55px;
  min-width: 100%;
}

@media ( max-width: 1100px)  {
  .party-mode {
    margin-top: 30px;
  }
}

@media ( max-height: 800px)  {
  .single-mode {
    margin-bottom: 60px;
    margin-top: 0;
  }  
  .party-mode {
    margin-bottom: 60px;
    margin-top: 20px;
  }
}

@media ( max-width: 550px ) {
  .single-mode {
    margin-bottom: 30px;
    margin-top: 0;
  } 
  .party-mode {
    margin-top: 10px;
  }

}





</style>