<template>
  <section class="player-progress"
    v-if="playerScores"
   :class="{'scale-down': isMenuOpen}">
    <p class="player-nickname"> {{playerNickname}} </p>
    <ol v-if="playerScores[0]" class="ProgressBar">
      <li class="ProgressBar-step" :class="{'is-complete': playerScores[0]}">
        <svg class="ProgressBar-icon" v-if="playerScores[0]" :class="(playerScores[0].isCorrect) ? 'correct' : 'incorrect'">
          <use :class="{'show': playerScores[0].isCorrect }" xlink:href="#checkmark-bold"></use>
          <use :class="{'show': playerScores[0].isCorrect===false }" xlink:href="#wrong-bold"></use>
        </svg>
        <svg class="ProgressBar-icon" v-else></svg>
        <span class="ProgressBar-stepLabel">Q1</span>
      </li>
      <li
        class="ProgressBar-step"
        :class="{'is-current': playerScores.length===1, 'is-complete': playerScores.length>1}"
      >
        <svg class="ProgressBar-icon" v-if="playerScores.length>1" :class="(playerScores[1].isCorrect) ? 'correct' : 'incorrect'">
          <use :class="{'show': playerScores[1].isCorrect }" xlink:href="#checkmark-bold"></use>
          <use :class="{'show': playerScores[1].isCorrect===false }" xlink:href="#wrong-bold"></use>
        </svg>
        <svg class="ProgressBar-icon" v-else></svg>
        <span class="ProgressBar-stepLabel">Q2</span>
      </li>
      <li
        class="ProgressBar-step"
        :class="{'is-current': playerScores.length===2, 'is-complete': playerScores.length>2}"
      >
        <svg class="ProgressBar-icon" v-if="playerScores[2]" :class="(playerScores[2].isCorrect) ? 'correct' : 'incorrect'">
          <use :class="{'show': playerScores[2].isCorrect }" xlink:href="#checkmark-bold"></use>
          <use :class="{'show': playerScores[2].isCorrect===false }" xlink:href="#wrong-bold"></use>
        </svg>
        <svg class="ProgressBar-icon" v-else></svg>
        <span class="ProgressBar-stepLabel">Q3</span>
      </li>
      <li
        class="ProgressBar-step"
        :class="{'is-current': playerScores.length===3, 'is-complete': playerScores.length>2}"
      >
        <svg class="ProgressBar-icon" v-if="playerScores[3]" :class="(playerScores[3].isCorrect) ? 'correct' : 'incorrect'">
          <use :class="{'show': playerScores[3].isCorrect }" xlink:href="#checkmark-bold"></use>
          <use :class="{'show': playerScores[3].isCorrect===false }" xlink:href="#wrong-bold"></use>
        </svg>
        <svg class="ProgressBar-icon" v-else></svg>
        <span class="ProgressBar-stepLabel">Q4</span>
      </li>
      <li
        class="ProgressBar-step"
        :class="{'is-current': playerScores.length===4, 'is-complete': playerScores.length>3}"
      >
        <svg class="ProgressBar-icon" v-if="playerScores[4]" :class="(playerScores[4].isCorrect) ? 'correct' : 'incorrect'">
          <use :class="{'show': playerScores[4].isCorrect }" xlink:href="#checkmark-bold"></use>
          <use :class="{'show': playerScores[4].isCorrect===false }" xlink:href="#wrong-bold"></use>
        </svg>
        <svg class="ProgressBar-icon" v-else></svg>
        <span class="ProgressBar-stepLabel">Q5</span>
      </li>
      <li
        class="ProgressBar-step"
        :class="{'is-current': playerScores.length===5, 'is-complete': playerScores.length>4}"
      >
        <svg class="ProgressBar-icon" v-if="playerScores[5]" :class="(playerScores[5].isCorrect) ? 'correct' : 'incorrect'">
          <use :class="{'show': playerScores[5].isCorrect }" xlink:href="#checkmark-bold"></use>
          <use :class="{'show': playerScores[5].isCorrect===false }" xlink:href="#wrong-bold"></use>
        </svg>
        <svg class="ProgressBar-icon" v-else></svg>
        <span class="ProgressBar-stepLabel">Q6</span>
      </li>
    </ol>

    <ol v-else class="ProgressBar">
      <li class="ProgressBar-step is-current">
        <svg class="ProgressBar-icon">
          <use xlink:href="#checkmark-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Q1</span>
      </li>
      <li class="ProgressBar-step">
        <svg class="ProgressBar-icon">
          <use xlink:href="#checkmark-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Q2</span>
      </li>
      <li class="ProgressBar-step">
        <svg class="ProgressBar-icon">
          <use xlink:href="#checkmark-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Q3</span>
      </li>
      <li class="ProgressBar-step">
        <svg class="ProgressBar-icon">
          <use xlink:href="#checkmark-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Q4</span>
      </li>
      <li class="ProgressBar-step">
        <svg class="ProgressBar-icon">
          <use xlink:href="#checkmark-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Q5</span>
      </li>
      <li class="ProgressBar-step">
        <svg class="ProgressBar-icon">
          <use xlink:href="#checkmark-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Q5</span>
      </li>
    </ol>
    <svg xmlns="http://www.w3.org/2000/svg" class="problem-svg">
      <symbol id="checkmark-bold" viewBox="0 0 24 24">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
      </symbol>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <symbol id="wrong-bold" viewBox="0 0 24 24">
        <path
          d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
        ></path>
      </symbol>
    </svg>
  </section>
</template>

<script>
export default {
  name: "PlayerProgress",
  props: ["player"],
  data() {
    return {
      right: ' <use xlink:href="#checkmark-bold"></use> ',
      wrong: ' <use xlink:href="#wrong-bold"></use> '
    };
  },

  computed: {
    playerScores() {
      if (!this.player) return []
      return this.player.scores;
    },
    playerNickname() {
      if (!this.player) return ''
      return this.player.nickname || this.player.username
    },
    isMenuOpen() {
      return this.$store.getters.isMenuOpen;
    }	
  },
  methods: {
    startInterval() {
      this.interval = setInterval(() => {
        this.count++;
      }, 1000);
    },
    isCorrect(num) {
      return '<use xlink:href="#checkmark-bold"></use>';
  
    },
  },
  destroyed() {
    clearInterval(this.interval);
    this.interval = null
  }

};
</script>

<style scoped lang="scss">

.player-nickname {
    text-align: center;
    padding-bottom: 7px;
    font-size: 1.5rem;
    font-weight: bold;
}

.player-progress {
  max-height: 50px;
  padding: 10px 0 40px 0;
}

@media (max-width: 550px) {

  .player-nickname {
    font-size: 1.1rem;
  }
  .single-mode .player-progress  {
    padding: 20px 0 20px 0;;
  }
  .single-mode {
    margin-bottom: 30px;
    margin-top: 0;
  }  

}




//Variables
$blue: 	#6d7691;
$grey: 	#1D1D2C;
$white: #f9f8f6;
$red: #E40C2B;
$green: #438945;

.ProgressBar {
  margin: 0 auto;
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
    height: 4px;
    background-color: $blue;
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
    background-color: $grey;
    width: 0%;
  }

  &.is-complete + &.is-current:after,
  &.is-complete + &.is-complete:after {
    width: 100%;
  }
}

.ProgressBar-icon {
  width: 1.45em;
  height: 1.45em;
  background-color: $blue;
  fill: $white;
  border-radius: 50%;
  max-width: 100%;
  z-index: 9;
  position: relative;
  transition: all 0.25s ease-out;
  border: 1px solid $blue;

  .is-current & {
    fill: $grey;
    background-color: $grey;
    border: 1px solid $grey;

  }

  .is-complete & {
    fill: $white;
    background-color: $grey;
    border: 1px solid $grey;

  }
}
.ProgressBar-icon.correct {
  border: 1px solid $green;
  background-color: $green;
}
.ProgressBar-icon.incorrect {
  border: 1px solid $red;
  background-color: $red;
}

.ProgressBar-stepLabel {
  display: block;
  text-transform: uppercase;
  color: $blue;
  position: absolute;
  padding-top: 0.5em;
  width: 100%;
  transition: all 0.25s ease-out;

  //Add your breakpoint to turn off
  //the labels when you need it.

  .is-current > &,
  .is-complete > & {
    color: $grey;
  }
}

.show {
  display: inline-block;
}

use {
  display: none;
}

.problem-svg {
  height: 0;
}
</style>