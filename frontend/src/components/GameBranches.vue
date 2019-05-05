<template>
  <section class="game-branches main-container" :class="{'scale-down': isMenuOpen}">
    <section v-if="isPartyMode" class="party-mode">
      <game-screen @updateProgress="sendProgress"></game-screen>
      <div class="party-players">
        <party-players :playersWithScores="playersWithScores"></party-players>
      </div>
    </section>

    <section v-else class="single-mode">
      <player-progress :player="player"></player-progress>
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

  components: {
    PartyPlayers,
    PlayerProgress,
    GameScreen
  },

  data() {
    return {
      params: "",
      isPartyMode: false,
      player: {},
    };
  },
  created() {
    this.player= JSON.parse(JSON.stringify(this.$store.getters.currUser)) ,
    this.params = this.$route
    this.isPartyMode = (this.params.name === "partyMode") ? true : false
  },
  methods: {
    sendProgress(scores) {
      this.player.scores = scores;
    }
  },
  computed: {
    

 

    playersWithScores() {
      return this.$store.getters.playersWithScores;
    },
    isMenuOpen() {
      return this.$store.getters.isMenuOpen;
    }
  }
};
</script>

<style scoped lang="scss">
.party-mode {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  // flex-direction: row-reverse;
	margin-top: 40px;
}
.single-mode {
  margin-top: 55px;
  min-width: 100%;
}
@media (max-width: 1100px) {
  .party-mode {
    margin-top: 30px;
  }
}
@media ( max-width: 800px)  {
  .party-mode {
    flex-wrap: wrap;
    // flex-wrap: wrap-reverse;
  }
}
@media (max-height: 800px) {
  .single-mode {
    margin-bottom: 60px;
    margin-top: 0;
  }
  .party-mode {
    margin-bottom: 60px;
    margin-top: 20px;
  }
}
@media (max-width: 550px) {
  .single-mode {
    margin-bottom: 30px;
    margin-top: 0;
  }
  .party-mode {
    margin-top: 10px;
  }
}
</style>
