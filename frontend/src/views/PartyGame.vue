<template>
  <section>
    <start-countdown v-if="ShowStartCountdown"/>
    <!-- <resume-countdown/> -->
    <resume-countdown v-if="showSummary"
      @askToContinue="askToContinue"
      @goHome="goHome"/>

    <div v-if="endOfRoundForMe && !endOfRoundForAll" 
      class="waiting-modal-container">
        <wait-message class="waiting-for-others" 
          v-if="endOfRoundForMe"
          @goHome="goHome"/>
    </div>

    <party-summary
      v-if="showSummary"/>
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
      showSummary: false,
      wishToContinue: false,
      endOfGameForMe: false,
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
    if (this.wishToContinue) SocketService.emit("userLeftPartyPage");
  },
  methods: {
    askToContinue() {
      this.wishToContinue = true
      // this.$store.dispatch({type:'setPartyTimeUp', isTimeUp:false})
    },

    goHome() {
      this.$router.push("/");
    },


    async resumeParty() {
      this.endOfGameForMe = false
      await this.$store.dispatch({type: 'setPartyRequest'})
      this.wishToContinue = false
      this.showSummary = false
      SocketService.emit("resetAllScores");
      this.$emit('resetGame')
      this.$emit('startGameInterval')
      
    },

    startCountdownToResume() {      
      setTimeout(() => {
        if (this.wishToContinue) this.resumeParty()
      }, 16500)
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
      // let timeUp = this.$store.getters.isPartyTimeUp
      // let endOfRound = timeUp || allDone
      let endOfRound = allDone
      if  (endOfRound) { //if this is the end of round, we need to reset everything,but keep the summary
        this.showSummary = true
        // this.$store.dispatch({type:'setPartyTimeUp', isTimeUp:false})
        SocketService.emit('partyEnded')
        this.startCountdownToResume()
      }
      return endOfRound
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