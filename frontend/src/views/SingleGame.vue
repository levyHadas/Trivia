<template>
  <score-summary
    v-if="showSummary"
    :myScores="myScores"
    @resumeGame="resumeGame"
    @selecteNewTopic="selecteNewTopic"
  />
</template>

<script>
import ScoreSummary from "@/components/ScoreSummary";

export default {
  name: 'SingleGame',

  props: ['endOfRound', 'myScores'],
  
  async created() {
    try {
      var quests = await this.$store.dispatch({type: 'loadQuests'})
    } catch 
    { console.log("Unable to load questions. Please try again later")
    
    }
    
    setTimeout(() => {
      this.show = true;
    }, 300);
    this.$emit('startGameInterval')
  },

  methods: {
    resumeGame() {
      this.$emit('resetProgress', []);
      this.$emit('startGameInterval')
    },
    selecteNewTopic() {
      this.$router.push("/CategorySelection");
    },
  },

  computed: {
    showSummary() {
      return this.endOfRound
    }
  },

  components: {
    ScoreSummary,
  }
}
</script>

<style scoped lang="scss">

</style>