<template>
  <section>
    <start-countdown v-if="ShowStartCountdown"/>
    <!-- <resume-countdown/> -->
    <resume-countdown v-if="showResumeCountdown"
      @askToContinue="askToContinue"
      @goHome="goHome"
      @dontContinue="dontContinue"/>

    <div v-if="endOfRoundForMe && !endOfRoundForAll & !endOfGameForMe" 
      class="waiting-modal-container">
        <wait-message class="waiting-for-others" 
          v-if="endOfRoundForMe"
          @goHome="goHome"/>
    </div>

    <party-summary
      v-if="endOfRoundForAll || endOfGameForMe"/>
      <!-- @askToContinue="askToContinue"
      @goHome="goHome"
      @dontContinue="dontContinue" -->
  </section>
</template>

<script>
import ScoreSummary from "@/components/ScoreSummary";
import PartySummary from "@/components/PartySummary";
import SocketService from "@/services/SocketService.js";
import StartCountdown from "@/components/StartCountdown";
import ResumeCountdown from "@/components/ResumeCountdown";
import WaitMessage from "@/components/WaitMessage";

const NUM_OF_QUESTS = 6

export default {
  name: "Question",
  props: ['myScores'],
  data() {
    return {
      show: false,
      startCountdown: false,
      resumeCountdown: false,
      wishToContinue: false,
      endOfGameForMe: false
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
    }, 4500);
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

    goHome() {
      this.$router.push("/");
    },

    dontContinue() {
      this.wishToContinue = false
    },

    resumeParty() {
      SocketService.emit('startPartyTimer')
      this.$emit('startGameInterval')
    },

    startCountdownToResume() {
      this.resumeCountdown = true
      setTimeout(() => {
        SocketService.emit('resetAllScores')
        if (!this.wishToContinue) {
          SocketService.emit("userLeftPartyPage");
          this.endOfGameForMe = true
          // this.goHome()
          //for demo - do nothing!
        } else {
          this.resumeCountdown = false
          this.resumeParty()
        }
        this.endOfRound = false
        this.wishToContinue = false
      }, 17500)
    },

    isAllDone() {
      let playersWithScores = this.$store.getters.playersWithScores
      if (playersWithScores.length) {
        var allDone = playersWithScores.every(player => {
          return player.scores.length === NUM_OF_QUESTS
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
      return this.myScores.length === NUM_OF_QUESTS
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