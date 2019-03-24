<template>
  <section class="main">
    <div class="quest">
      <transition name="fadeOne">
        <div v-show="show" class="container">
          <p class="One">
            <span class="timer" :class="{redTimer: isTimerLessThen10}">{{timer}}</span>
            <br>
            {{thisQuestion.txt}}
          </p>
        </div>
      </transition>
      <transition name="fadeTwo">
        <div v-show="show" class="container">
          <p
            class="Two answer"
            v-for="(answer, idx) in thisAnswers"
            :key="answer"
            :class="classList(idx)"
            @click="checkAnswer($event,answer)"
            @click.prevent="playSound('../assets/wrong.avi')"
          >{{answer}}</p>
        </div>
      </transition>
    </div>
    <!-- <score-summary :scores="scores"/> -->
    <!-- added to check the component. needs to be implemented in -->
    <!-- should be active after 5 questions. shoule pause the game and resume at emitted event @resumeGame -->
  </section>
</template>

<script>
// import ScoreSummary from '@/components/ScoreSummary';

export default {
  name: "Question",
  data() {
    return {
      show: false,
      question: {},
      isOver: false,
      quests: [],
      timerInterval: "",
      timer: 15,
      isTimerLessThen10: false,
      scores: []
    };
  },
  methods: {
    checkAnswer(event, answer) {
      var answers = this.$store.getters.currQuest.answers;
      var answerIdx = +answers.indexOf(answer);
      var correctAnswerIdx = +this.$store.getters.currQuest.correctAnswerIdx;
      var isCorrect = false;
      if (correctAnswerIdx === answerIdx) {
        this.playSound("../assets/right.mp3");
        // event.target.classList.toggle("answerCorrect");
        isCorrect = true;
      } else {
        this.playSound("../assets/wrong.avi");
        // event.target.classList.toggle("answerWrong");
        // event.target.classList.toggle("nudge");
      }
      this.isOver = true;
      this.scores.push(
        this.saveScore(this.question, isCorrect, 15 - this.timer)
      );
      console.log(this.scores);
      this.nextQuestion();
    },
    saveScore(quest, isCorrect, time) {
      return {
        quest,
        isCorrect,
        time
      };
    },
    nextQuestion() {
      if (this.quests.length === 1) {
        clearInterval(this.timerInterval);
      } else {
        this.timeoutNextQuestion = setTimeout(() => {
          this.$store.dispatch({ type: "nextQuest" });
          this.question = this.$store.getters.currQuest;
          this.isOver = false;
          this.isTimerLessThen10 = false;
          this.timer = 15;
        }, 800);
      }
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    classList(idx) {
      var correctAnswerIdx = +this.$store.getters.currQuest.correctAnswerIdx;
      if (correctAnswerIdx === idx) {
        return { answerCorrect: this.isOver };
      } else {
        return { answerWrong: this.isOver };
      }
    }
  },
  created() {
    var questId = this.$route.params.questId;
    this.$store.dispatch({ type: "loadQuest", questId });
    setTimeout(() => {
      this.show = true;
    }, 300);
    this.quests = this.$store.getters.questsForDisplay;
    this.question = this.$store.getters.currQuest;
    this.timerInterval = setInterval(() => {
      if (this.timer === 0) {
        this.scores.push(this.saveScore(this.question, false, 15));
        this.isOver = true;
        this.nextQuestion();
        return;
      }
      this.timer -= 1;
      if (this.timer < 10) this.isTimerLessThen10 = true;
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timerInterval);
  },
  computed: {
    thisQuestion() {
      return this.$store.getters.currQuest;
    },
    thisAnswers() {
      return this.$store.getters.currQuest.answers;
    },
    timer() {
      return this.timer;
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  // height: 100%;
  width: 100%;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(148, 150, 37, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
}

.quest {
  max-height: 100%;
}

.container {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

button {
  color: #435466;
  font-size: 15px;
  font-weight: 600;
  background-color: #4dba87;
  margin: auto;
  width: 100px;
  height: 50px;
  border: #3b3561;
}

p {
  text-align: center;
  font-size: 50px;
  overflow: hidden;
  color: black;
}

.timer {
  font-size: 15px;
}

.redTimer {
  color: red;
}

.Two {
  font-size: 18px;
  font-family: Georgia, serif;
}

.One {
  padding: 5px;
}

.fadeOne-enter-active,
.fadeOne-leave-active {
  transition: all 0.5s ease-out;
}
.fadeOne-enter,
.fadeOne-leave-to {
  clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  transform: translate(0%, 100%);
}

.fadeTwo-enter-active,
.fadeTwo-leave-active {
  transition: all 0.5s ease-out;
}
.fadeTwo-enter,
.fadeTwo-leave-to {
  clip-path: polygon(0% 100%, 100% 100%, 0% 100%, 0% 100%);
  transform: translate(0%, -100%);
}

.answer {
  margin-top: 20px;
  display: inline-block;
  margin-right: 10px;
  background: #339dff;
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  line-height: 38px;
  border-radius: 50px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: 300px;
  height: 70px;
  text-align: center;
  vertical-align: middle;
  line-height: 70px;
}

.answerCorrect {
  background: rgb(0, 193, 75);
}

.answerWrong {
  background: red;
}

.answer:active {
  animation: nudge 0.4s linear;
}

@keyframes nudge {
  0% {
    transform: rotate(-7deg);
  }

  33% {
    transform: rotate(7deg);
  }

  66% {
    transform: rotate(-7deg);
  }
}

.answer:hover {
  cursor: pointer;
  // background: #fff;
  // color: #339dff;
  box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
}
</style>