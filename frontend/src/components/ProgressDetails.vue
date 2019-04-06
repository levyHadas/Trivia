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
.player-progress {
max-height: 50px;
padding:10px;
}
//Variables
$gray: #9f9fa3;
$blue: #00637c;
$white: #dbf1ff;
$red: red;

.ProgressBar {
  margin: 0 auto;
  // padding: 2em 0 3em;
  list-style: none;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.ProgressBar-step {
  text-align: center;
  position: relative;
  width: 100%;

  &:before,
  &:after {
    content: "";
    height: 0.5em;
    background-color: $gray;
    position: absolute;
    z-index: 1;
    width: 100%;
    left: -50%;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.25s ease-out;
  }

  &:first-child:before,
  &:first-child:after {
    display: none;
  }

  &:after {
    background-color: $blue;
    width: 0%;
  }

  &.is-complete + &.is-current:after,
  &.is-complete + &.is-complete:after {
    width: 100%;
  }
}

.ProgressBar-icon {
  width: 1.5em;
  height: 1.5em;
  background-color: $gray;
  fill: $gray;
  border-radius: 50%;
  // padding: 0.1em;
  max-width: 100%;
  z-index: 9;
  position: relative;
  transition: all 0.25s ease-out;

  .is-current & {
    fill: $blue;
    background-color: $blue;
  }

  .is-complete & {
    fill: $white;
    background-color: $blue;
  }
}

.ProgressBar-stepLabel {
  display: block;
  text-transform: uppercase;
  color: $gray;
  position: absolute;
  padding-top: 0.5em;
  width: 100%;
  transition: all 0.25s ease-out;

  //Add your breakpoint to turn off
  //the labels when you need it.

  .is-current > &,
  .is-complete > & {
    color: $blue;
  }
}
</style>