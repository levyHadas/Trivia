<template>
  <section class="players">
    <h2>Players</h2>
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
    question2: Array,
    playersWithScores: Array
  },  

  components: {
    PlayerProgress
  },

  computed: {
    playersProgress() {
      return this.$store.getters.playersWithScores
    }
  }
}
</script>

<style scoped lang="scss">
.players {
  padding: 10px;
  margin-top:25px;
}
</style>