<template>
  <section class="players">
    <div>
      <player-progress
        v-for="(player,idx) in playersProgress"
        :key="idx"
        :player="player"/>
    </div>
  </section>
</template>

<script>
import PlayerProgress from "@/components/PlayerProgress"
import SocketService from '@/services/SocketService.js'

export default {
  name: 'Party',
  props: {
    // question2: Array,
    // playersWithScores: Array
  },  

  components: {
    PlayerProgress
  },

  computed: {
    playersProgress() {
      if (!this.$store.getters.playersWithScores.length) return this.$store.getters.playersWithScores
      var playersWithScores = JSON.parse(JSON.stringify(this.$store.getters.playersWithScores)) 
      console.log(playersWithScores)
      var user = this.$store.getters.currUser
      var userIdx = playersWithScores.findIndex(player => player._id === user._id)
      var user = playersWithScores[userIdx]
      playersWithScores.splice(userIdx, 1)
      playersWithScores.unshift(user)
      console.log(playersWithScores)
      return playersWithScores
      return this.$store.getters.playersWithScores
    }
  }
}
</script>

<style scoped lang="scss">

</style>