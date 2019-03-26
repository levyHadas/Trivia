<template>
  <!-- <section class="main"> -->
  <section class="gameScreen">
    <section v-if="isPartyOn" class="partyMode">
      <div class="players">
        <party-players></party-players>
      </div>
      <div class="game">
        <quest-details></quest-details>
        <!-- <router-view></router-view> -->
      </div>
    </section>
    <section v-else class="singleMode">
      <player-progress :player="player" :scores="playerScore"></player-progress>
      <quest-details @updateProgress="sendProgress"></quest-details>
      <!-- <router-view></router-view> -->
    </section>
  </section>
  <!-- </section> -->
</template>

<script>
import QuestDetails from "@/components/QuestDetails";
import PartyPlayers from "@/components/PartyPlayers";
import PlayerProgress from "@/components/PlayerProgress";

export default {
  name: "Game",
  props: {
    question2: Array
  },
  created() {
    console.log("group game was created");
    var params = this.$route;
    this.params = params;
  },
  data() {
    return {
      params: "",
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
      console.log(scores);
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
    }
  },
  components: {
    PartyPlayers,
    PlayerProgress,
    QuestDetails
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
</style>