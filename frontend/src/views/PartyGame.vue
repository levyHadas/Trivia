<template>
  <section>
    <start-countdown v-if="ShowStartCountdown"/>
    <resume-countdown v-if="showResumeCountdown"/>
  
    <party-summary
      v-if="endOfRoundForAll"
      :playersWithScores="playersWithScores"
      @askToContinue="askToContinue"
      @goHome="goHome"/>
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
      startCountdown: false,
      partyStartTime: Date.now(),
      resumeCountdown: false,
      wishToContinue: false
    }
  },
  
  async created() {
    this.startCountdown = true;
    setTimeout(() => {
      
      SocketService.emit("resetAllScores");

      var quests = this.$store.getters.questsForDisplay;
      this.show = true;
      this.startCountdown = false;
      this.$emit('startGameInterval');
    }, 4000);
  },

  destroyed() {
    if (!this.$store.getters.isUserWaiting) {
      SocketService.emit("userLeftPartyPage");
    }
  },
  methods: {
    askToContinue() {
      this.wishToContinue = true
    },

    resumeParty() {
      SocketService.emit('resetAllScores')
      this.partyStartTime = Date.now()
      this.$emit('startGameInterval')
    },


    goHome() {
      SocketService.emit('resetAllScores')
      this.$router.push("/");
    },


    startCountdownToResume() {
      this.resumeCountdown = true
      setTimeout(() => {
        if (!this.wishToContinue) this.goHome()
        this.resumeCountdown = false
        this.endOfRound = false
        this.wishToContinue = false
        this.resumeParty()
      }, 10000)
    },

    isAllDone() {
      this.playersWithScores = this.$store.getters.playersWithScores
      if (this.playersWithScores.length) {
        var allDone = this.playersWithScores.every(player => {
          return player.scores.length === 5
        })
      }
      return allDone
    },
    isTimeUp() {
      let time = Date.now() - this.partyStartTime
      let timeUp = time > 95 * 1000 ? true : false
      return timeUp
    }
  },



  computed: {
    ShowStartCountdown() {
      return this.startCountdown;
    },

    endOfRoundForAll() {
      let allDone = this.isAllDone()
      let timeUp = this.isTimeUp()
      this.endOfRound = timeUp || allDone
      if (this.endOfRound) {
        this.startCountdownToResume()
      }
      return this.endOfRound
    },

    showResumeCountdown() {
      return this.resumeCountdown
    },
    
 
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