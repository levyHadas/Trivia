<template>
  <section class="players">
    <h2>Players</h2>
    <div v-if="playersProgress.length">
      <player-progress
        v-for="(player,idx) in playersProgress"
        :key="idx"
        :player="player"/>
    </div>
   
</section>
    <!-- <h2>Players Online</h2>
    <player-progress v-for="player in players" :player="player"></player-progress>
   -->
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
  margin-top:25px;
}
</style>