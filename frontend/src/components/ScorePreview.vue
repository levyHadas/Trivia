<template>
  <section>
    <li class="quest-score-container">
      <div class="quest-score-item questPreview">{{questPreview}}</div>
      <!-- <div class="quest-score-item result" :class="isCorrect">{{result}}</div> -->
      <div class="quest-score-item result" 
        :class="isCorrect" 
        v-if="score.isCorrect" >
          <i class="fas fa-check-circle"></i>
      </div>
      <div class="quest-score-item result" 
        :class="isCorrect" 
        v-if="!score.isCorrect" >
          <i class="fas fa-times-circle"></i>
      </div>
      <div class="quest-score-item time" 
        :class="isCorrect">
        <i class="far fa-clock"></i> {{timeForDisplay}}
      </div>
      <!-- <div class="quest-score-item compare-to" v-if="score.isCorrect">Only {{randVal}}% faster</div> -->
      <!-- <div class="quest-score-item compare-to" v-if="!score.isCorrect">Only {{randVal}}% wins</div> -->
      <div class="quest-score-item compare-to" :title="statisticForDisplay"> 
          <i class="fas fa-chart-line"></i>
      </div>
    </li>
  </section>
</template>

<script>
import UtilService from "@/services/UtilService.js";

export default {
  props: {
    score: Object
  },
  methods: {
    randScore() {
      return UtilService.getRandomIntInclusive(40, 80);
    },
  },
  computed: {

    questPreview() {
      if (this.score.quest.txt.length >= 90 ) {
        return this.score.quest.txt.substring(0, 90) + "...?"
      }
      return this.score.quest.txt.substring(0, 90)
    },
    isCorrect() {
      if (this.score.isCorrect === true) return "correct"
      return "incorrect";
    },
    timeForDisplay() {
      let secs = this.score.time;
      return secs
    },

    statisticForDisplay() {
      if (this.score.isCorrect) return `Only ${this.randScore()}% wins`
      return `Only ${this.randScore()}% faster`
    }
  }
};
</script>

<style scoped>
.quest-score-container {
  display: grid;
  grid-template-columns: 10fr 1fr 2fr 1fr;
  grid-template-rows: fit-content(40%);
  grid-gap: 35px;
  width: 85%;
  margin: 0 auto;
}
.quest-score-item {
  color: rgb(8, 58, 69);
  font-size: 1.7rem;
}

@media (max-width: 680px) {
  .quest-score-container {
    grid-gap: 25px;
    width: 90%;
  }
  .quest-score-item {
    font-size: 1.2rem;
  }
}
@media (max-width: 450px) {
  .quest-score-container {
    grid-gap: 15px;
    width: 90%;
  }
  .quest-score-item {
    font-size: 1rem;

  }
}

.correct {
  color:green;
}

.incorrect {
  color:#f4376d;
}
</style>