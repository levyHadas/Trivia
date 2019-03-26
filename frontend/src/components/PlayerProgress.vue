<template>
  <section class="playerProgress" v-if="this.player">
    {{playerName}}
    {{numOfAnswered}}
    <ol class="ProgressBar">
      <li class="ProgressBar-step">
        <svg class="ProgressBar-icon">
          <use xlink:href="#checkmark-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Cheese</span>
      </li>
      <li class="ProgressBar-step">
        <svg class="ProgressBar-icon">
          <use xlink:href="#checkmark-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Pizza</span>
      </li>
      <li class="ProgressBar-step">
        <svg class="ProgressBar-icon">
          <use xlink:href="#checkmark-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Steak</span>
      </li>
      <li class="ProgressBar-step">
        <svg class="ProgressBar-icon">
          <use xlink:href="#checkmark-bold"></use>
        </svg>
        <span class="ProgressBar-stepLabel">Potatoes</span>
      </li>
    </ol>

    <p>
      <button id="previous">Previous</button>
      <button id="advance">Advance</button>
    </p>
  </section>
</template>

<script>
export default {
  name: "PlayerProgress",
  props: {
    player: Object
  },

  computed: {
    playerName() {
      return this.player.username
    },
    numOfAnswered() {
      return this.player.scores.length
    },

  },
  
};
</script>

<style scoped lang="scss">
//Variables
$gray: #9f9fa3;
$blue: #00637c;
$white: #dbf1ff;

.ProgressBar {
  margin: 0 auto;
  padding: 2em 0 3em;
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
  padding: 0.5em;
  max-width: 100%;
  z-index: 10;
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