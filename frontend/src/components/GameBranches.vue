<template>
  <!-- <section class="main"> -->
  <section class="game-branches main-container">

    <section v-if="isPartyOn" class="partyMode">
      <div class="players">
        <party-players :playersWithScores="playersWithScores"></party-players>
      </div>
      <div class="game">
        <game-screen @updateProgress="sendProgress"></game-screen>
      </div>
    </section>

    <section v-else class="singleMode">
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
    isPartyOn() {
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
.partyMode {
  display: flex;
  flex-direction: row;
}

.players {
  flex-basis: 25%;
  // border-right: 1px solid black;
}

.game {
  flex-basis: 75%;
}
.game-branches {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


</style>