<template>
  <section class="quest-score-preview">
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
          <i class="fas fa-chart-line"></i>  {{ statisticForDisplay}}
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

<style scoped lang="scss">
  


.quest-score-preview {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 250px;
  justify-content: center;
  text-align: center;
  background-color: rgb(249, 248, 246);
  border: 2.5px solid #7ed0d4;
  margin: 30px;
  padding: 20px;
  font-size: 1.2rem;
  padding: 20px;
}

.result {
  padding: 20px;
  font-size: 2rem
}
.time {
  font-size: 2rem
}
.compare-to  {
  padding: 20px;
}


@media (max-width: 450px) {
  .quest-score-preview {
    margin: 13px;
  }

}

.correct {
  color:green;
}

.incorrect {
  color:#E40C2B;
}
</style>