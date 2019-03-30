<template>
  <section :readyToResume="readyToResume">
    <start-countdown v-if="ShowPartyCountDown"/>
    <resume-countdown v-if="showCountdownToResume"/>
    <party-summary
      v-if="endOfRoundForAll"
      :playersWithScores="playersWithScores"
      @askToContinue="askToContinue"
      @goHome="goHome"
    />
  </section>
</template>

<script>
import ScoreSummary from "@/components/ScoreSummary";
import PartySummary from "@/components/PartySummary";
import SocketService from "@/services/SocketService.js";
import StartCountdown from "@/components/StartCountdown";
import ResumeCountdown from "@/components/ResumeCountdown";

export default {
  name: "Question",
  data() {
    return {
      show: false,
      playersWithScores: [], //all scores
      partyCountDown: false,
      partyStartTime: Date.now(),
      resumeCountdown: false
    }
  },
  methods: {
    askToContinue() {
      let user = this.$store.getters.currUser
      SocketService.emit('askToContinue', user);
      SocketService.emit('resetAllScores');
    },

    resumeParty() {
      SocketService.emit('resetAllScores')
      this.partyStartTime = Date.now()
      this.resumeCountdown = false
      this.$emit('startGameInterval')
    },


    goHome() {
      this.$router.push("/");
    },

    initGame() {
      SocketService.emit("resetAllScores");
      this.$emit("startGameInterval");
      this.partyStartTime = Date.now()
      this.endOfRound = false
    },

    startCountdownToResume() {
      this.resumeCountdown = true
      if(this.endOfRound) {
        setTimeout(() => {
          this.resumeCountdown = false
        }, 10000)
      }
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
      this.endOfRound = timeUp || allDone
      if (this.endOfRound) {
        SocketService.emit('quitGame')
        SocketService.emit('countToNextRound')
        this.startCountdownToResume()
      }
      return this.endOfRound
    },

    showCountdownToResume() {
      return this.resumeCountdown
    },

    readyToResume() {
      if (this.$store.getters.readyToResume) {
        this.resumeParty()
        this.$store.dispatch({type:'setReadyToResume', isReady:false})
      }
    }
 
  },

  components: {
    ScoreSummary,
    StartCountdown,
    PartySummary,
    ResumeCountdown
  }
};
</script>

<style scoped lang="scss">

</style>