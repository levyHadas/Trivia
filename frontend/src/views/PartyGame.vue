<template>
  <section>
    <count-down v-if="ShowPartyCountDown"/>
    <party-summary
      v-if="endOfRoundForAll"
      :playersWithScores="playersWithScores"
      @resumeParty="resumeParty"
      @goHome="goHome"
    />
  </section>
</template>

<script>
import ScoreSummary from "@/components/ScoreSummary";
import PartySummary from "@/components/PartySummary";
import SocketService from "@/services/SocketService.js";
import CountDown from "@/components/CountDown";

export default {
  name: "Question",
  data() {
    return {
      show: false,
      playersWithScores: [], //all scores
      partyCountDown: false,
      partyStartTime: Date.now(),
    }
  },
  methods: {
    resumeParty() {
      SocketService.emit('resetAllScores');
      this.partyStartTime = Date.now()
      setTimeout(() => {
        this.$emit('startGameInterval')
      }, 1000)
    },

    goHome() {
      this.$router.push("/");
    },

  
 
    initGame() {
      SocketService.emit("resetAllScores");
      this.$emit("startGameInterval");
      this.partyStartTime = Date.now()
      this.isPartyOver = false
    }
  },

  async created() {
    this.partyCountDown = true;
    setTimeout(() => {
      
      SocketService.emit("resetAllScores");

      var quests = this.$store.getters.questsForDisplay;
      this.show = true;
      this.partyCountDown = false;
      this.$emit('startGameInterval');
    }, 4000);
  },

  destroyed() {
    if (!this.$store.getters.isUserWaiting) {
      SocketService.emit("userLeftPartyPage");
    }
  },

  computed: {
    ShowPartyCountDown() {
      return this.partyCountDown;
    },
    endOfRoundForAll() {
      this.playersWithScores = this.$store.getters.playersWithScores
      
      var allDone = false
      if (this.playersWithScores.length) {
        allDone = this.playersWithScores.every(player => {
          return player.scores.length === 5
        })
      }
      let time = Date.now() - this.partyStartTime
      let timeUp = time > 80 * 1000 ? true : false
      this.isPartyOver = timeUp || allDone
      return this.isPartyOver
    }
  },

  components: {
    ScoreSummary,
    CountDown,
    PartySummary,
  }
};
</script>

<style scoped lang="scss">

</style>