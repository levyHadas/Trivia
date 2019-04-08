<template>
  <section>
    <ol v-if="playerScores[0]" class="ProgressBar">
      <li class="ProgressBar-step" :class="{'is-complete': playerScores[0]}">
        <svg class="ProgressBar-icon">
          <use v-if="playerScores[0].isCorrect" xlink:href="#checkmark-bold"></use> 
          <use v-else xlink:href="#wrong-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Q1</span>
      </li>
    </ol>
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="checkmark-bold" viewBox="0 0 24 24">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
      </symbol>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
       <symbol id="wrong-bold" viewBox="0 0 24 24">
      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
       </symbol>
    </svg>
  </section>
</template>

<script>
export default {
  name: "PlayerProgress",
  props: {
    score: Array
  },
  created() {},
  data() {
    return {

    };
  },
  computed: {
    playerScores() {
      return this.score
    }
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">

</style>