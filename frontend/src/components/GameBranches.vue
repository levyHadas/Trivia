<template>
  <!-- <section class="main"> -->
  <section class="gameScreen">

    <section v-if="isPartyOn" class="partyMode">
      <div class="players">
        <party-players></party-players>
      </div>
      <div class="game">
        <game-core></game-core>
      </div>
    </section>

    <section v-else class="singleMode">
      <player-progress :player="player" :scores="playerScore"></player-progress>
      <game-core @updateProgress="sendProgress"></game-core>
    </section>
    
  </section>
</template>

<script>
import GameCore from "@/views/GameCore";
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

  },
  components: {
    PartyPlayers,
    PlayerProgress,
    GameCore
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

.gameScreen {
  min-height: calc(100vh - 160px); 
  // should be 10vh - header hight- footer
}
</style>