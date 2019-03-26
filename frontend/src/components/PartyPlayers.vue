<template>
  <section class="players">
    <h2>Players</h2>
    <player-progress
      v-if="playersProgress.length"
      v-for="(player,idx) in playersProgress"
      :key="idx"
      :player="player"/>
   
    <!-- </div> -->
    <!-- <player-progress v-for="player in players"></player-progress> -->
  </section>
</template>

<script>
import PlayerProgress from "@/components/PlayerProgress"
import SocketService from '@/services/SocketService.js'


export default {
  name: 'Party',
  props: {
    question2: Array,
  },
  
  data() {
    return {
      playersWithScores: [],
      // players: [
      //   {
      //     _id: '22',
      //     name: 'puki',
      //     img: 'src',
      //     scores: []
      //   }
      // ]
    }
  },

  created() {

    SocketService.on('ShowUpdatedScores', playersWithScores => {
      this.playersWithScores = playersWithScores
    })
  },

  components: {
    PlayerProgress
  },

  computed: {
    playersProgress() {
        return this.playersWithScores
    }
  }
  

}
</script>

<style scoped lang="scss">
.players {
  padding: 10px;
}
</style>