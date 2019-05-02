<template>
  <section class="end-of-party">
    <resume-countdown
      @askToContinue="askToContinue"
      @goHome="goHome"/>
    <party-summary/>
  </section>
</template>

<script>
import PartySummary from "@/components/PartySummary";
import ResumeCountdown from "@/components/ResumeCountdown";
import SocketService from '@/services/SocketService'
import { COUNTDOWN_TO_RESUME_SECS } from '@/services/GameConsts'
export default {
  name: "endOfParty",
    
  components: {
    ResumeCountdown,
    PartySummary,
  },
  created() {
    if (!this.$store.getters.playersWithScores.length) this.$router.go(-1)
    this.startCountdownToResume()
  },
  data() {
    return {
      showSummary: false,
      wishToContinue: false,
      resumeTimeout: null
    }
  },
  methods: {
    async resumeParty() {
        await SocketService.emit('handleRequest'); 
    },

    startCountdownToResume() {      
        this.resumeTimeout = setTimeout(() => {
            if (this.wishToContinue) this.resumeParty()
        }, COUNTDOWN_TO_RESUME_SECS*1000)
    },

    askToContinue() {
        this.wishToContinue = true
        SocketService.emit("setRequest", this.$store.getters.currUser); 
    },

    goHome() {
      this.$router.push("/");
    },

  },
  destroyed() {
    clearTimeout(this.resumeTimeout)
    this.resumeTimeout = null
  },

}
</script>

<style scoped lang="scss">
</style>