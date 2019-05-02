<template>
  <section>
    <start-countdown v-if="ShowStartCountdown"/>
    <div v-if="endOfRoundForMe && !endOfRoundForAll" 
      class="waiting-modal-container">
        <wait-message class="waiting-for-others" 
          v-if="endOfRoundForMe"
          @goHome="goHome"/>
    </div>
  </section>
</template>

<script>

import SocketService from "@/services/SocketService.js";
import StartCountdown from "@/components/StartCountdown";
import WaitMessage from "@/components/WaitMessage";
// import PartySummary from "@/components/PartySummary";
// import ResumeCountdown from "@/components/ResumeCountdown";

import { NUM_OF_QUESTS } from '@/services/GameConsts'

export default {
  name: "Question",
  props: ['myScores'],
  data() {
    return {
      show: false,
      startCountdown: false,
      endOfGameForMe: false,
    }
  },
  
  async created() {
    if (!this.$store.getters.isUserInParty) this.goHome()
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
    SocketService.emit("userLeftPartyPage");
  },
  methods: {

    goHome() {
      this.$router.push("/");
    },


    // async resumeParty() {
    //   this.endOfGameForMe = false
    //   await this.$store.dispatch({type: 'setPartyRequest'})
    //   this.wishToContinue = false
    //   this.showSummary = false
    //   SocketService.emit("resetAllScores");
    //   this.$emit('resetGame')
    //   this.$emit('startGameInterval')
      
    // },

    // startCountdownToResume() {      
    //   setTimeout(() => {
    //     if (this.wishToContinue) this.resumeParty()
    //   }, 16500)
    // },

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
     
      // let endOfRound = timeUp || allDone
      let endOfRound = allDone
      if  (endOfRound) { //if this is the end of round, we need to reset everything,but keep the summary
        // this.showSummary = true
        
        SocketService.emit('partyEnded')
        // this.startCountdownToResume()
        this.$router.push("/partysummary")
      }
      return endOfRound
    },


    
  },

  components: {
  
    StartCountdown,
    WaitMessage,
    // ResumeCountdown,
    // PartySummary,
  }
};
</script>

<style scoped lang="scss">

</style>