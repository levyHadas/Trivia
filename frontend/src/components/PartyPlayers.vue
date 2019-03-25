<template>
  <section class="players">
    <h2>Players</h2>
    <div v-if="playersWithScores" v-for="player in playersWithScores">
      {{player.username}}
      {{player.scores}}
    </div>
    <player-progress v-for="player in players"></player-progress>
  </section>
</template>

<script>
import PlayerProgress from "@/components/PlayerProgress"
import SocketService from '@/services/SocketService.js'


export default {
  name: "Party",
  props: {
    question2: Array
  },
  created() {
  },
  data() {
    return {
      players: [],
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
  components: {
    PlayerProgress
  },

  computed: {
    playersWithScores() {
      SocketService.on('ShowUpdatedScores', playersWithScores => {
        this.playersAndScores = playersWithScores
      })
      // console.log(this.players, 'outside')
      return this.players
    }
  }

};
</script>

<style scoped lang="scss">
.players {
  padding: 10px;
}
</style>