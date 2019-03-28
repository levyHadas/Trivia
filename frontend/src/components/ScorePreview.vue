<template>
  <section>
    <li class="quest-score-container">
      <div class="quest-score-item questPreview">{{questPreview}}</div>
      <div class="quest-score-item result" :class="isCorrect">{{result}}</div>
      <div class="quest-score-item time" :class="isCorrect">{{timeForDisplay}}</div>
      <div class="quest-score-item compare-to" v-if="score.isCorrect">Only {{randVal}}% faster</div>
      <div class="quest-score-item compare-to" v-if="!score.isCorrect">Only {{randVal}}% wins</div>
    </li>
  </section>
</template>

<script>
import UtilService from "@/services/UtilService.js";

export default {
  props: {
    score: Object
  },
  created() {
  },
  computed: {
    result() {
      if (this.score.isCorrect === true) return "V";
      return "X";
    },
    questPreview() {
      return this.score.quest.txt.substring(0, 70) + "...";
    },
    isCorrect() {
      if (this.score.isCorrect === true) return "correct";
      return "incorrect";
    },
    timeForDisplay() {
      const secs = this.score.time;
      return secs + " Secs";
    },
    randVal() {
      return UtilService.getRandomIntInclusive(30, 70);
    }
  }
};
</script>

<style scoped>
.quest-score-container {
  display: grid;
  grid-template-columns: 7fr 1fr 2fr 4fr;
  grid-gap: 20px;
  width: 100%;
}
.quest-score-item {
  color: white;
  font-size: 1rem;
}

.correct {
  color:green;
}

.incorrect {
  color:red;
}
</style>