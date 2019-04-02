<template>
  <section>
    <start-countdown v-if="ShowStartCountdown"/>
    <resume-countdown v-if="showResumeCountdown"/>
    <wait-message v-if="endOfRoundForMe"/>
    <party-summary
      v-if="endOfRoundForAll"
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
import WaitMessage from "@/components/WaitMessage";

export default {
  name: "Question",
  props: ['myScores'],
  data() {
    return {
      show: false,
      startCountdown: false,
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
      SocketService.emit('startPartyTimer')
      this.$emit('startGameInterval')
    },


    goHome() {
      SocketService.emit('resetAllScores')
      this.$router.push("/");
    },


    startCountdownToResume() {
      this.resumeCountdown = true
      setTimeout(() => {
        this.resumeCountdown = false
        if (!this.wishToContinue) this.goHome()
        this.endOfRound = false
        this.wishToContinue = false
        this.resumeParty()
      }, 10000)
    },

    isAllDone() {
      let playersWithScores = this.$store.getters.playersWithScores
      if (playersWithScores.length) {
        var allDone = playersWithScores.every(player => {
          return player.scores.length === 5
        })
      }
      return allDone
    },
  },



  computed: {
    ShowStartCountdown() {
      return this.startCountdown;
    },

    endOfRoundForMe() {
      return this.myScores.length === 5
    },

    endOfRoundForAll() {
      let allDone = this.isAllDone()
      let timeUp = this.$store.getters.isPartyTimeUp
      this.endOfRound = timeUp || allDone
      if (this.endOfRound) {
        this.endOfRound = false
        this.$store.dispatch({type:'setPartyTimeUp', isTimeUp:false})

        this.startCountdownToResume()
        return true
      }
      return false
    },

    showResumeCountdown() {
      return this.resumeCountdown
    },
    
  },

  components: {
    ScoreSummary,
    StartCountdown,
    PartySummary,
    ResumeCountdown,
    WaitMessage
  }
};
</script>

<style scoped lang="scss">

</style>