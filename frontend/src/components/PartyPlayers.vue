<template>
  <section class="players">
    <h2>Players</h2>
    <player-progress v-for="player in players"></player-progress>
  </section>
</template>

<script>
import PlayerProgress from "@/components/PlayerProgress";

export default {
  name: "Party",
  props: {
    question2: Array
  },
  created() {
  },
  data() {
    return {
      players: [
        {
          _id: '22',
          name: 'puki',
          img: 'src',
          scores: []
        }
      ]
    };
  },
  components: {
    PlayerProgress
  }
};
</script>

<style scoped lang="scss">
.players {
  padding: 10px;
}
</style>