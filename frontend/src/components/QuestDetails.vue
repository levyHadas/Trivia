<template>
  <section class="main">
    <div class="quest">
      <transition name="fadeOne">
        <div v-show="show" class="container">
          <p class="One">{{thisQuestion.txt}}</p>
        </div>
      </transition>
      <transition name="fadeTwo">
        <div v-show="show" class="container">
          <p
            v-for="answer in thisAnswers"
            :key="answer"
            class="Two answer"
            @click="checkAnswer($event,answer)"
          >{{answer}}</p>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: "Question",
  data() {
    return {
      show: false,
      question: {},
      isCorrect: false,
      quests: []
    };
  },
  methods: {
    checkAnswer(event, answer) {
      var answers = this.$store.getters.currQuest.answers;
      var answerIdx = +answers.indexOf(answer);
      var correctAnswerIdx = +this.$store.getters.currQuest.correctAnswerIdx;

      if (correctAnswerIdx === answerIdx) {
        event.target.classList.toggle("answerCorrect");
      } else {
        event.target.classList.toggle("answerWrong");
      }
      this.intervalNextQuestion = setTimeout(() => {
        this.nextQuestion();
      }, 600);
    },
    nextQuestion() {
      this.$store.dispatch({ type: "nextQuest" });
    }
  },
  created() {
    var questId = this.$route.params.questId;
    this.$store.dispatch({ type: "loadQuest", questId });
    setTimeout(() => {
      this.show = true;
    }, 300);
    this.quests = this.$store.getters.questsForDisplay;
    console.log(this.quests);
  },
  computed: {
    thisQuestion() {
      return this.$store.getters.currQuest;
    },
    thisAnswers() {
      return this.$store.getters.currQuest.answers;
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
  //   font-smoothing: antialiased;
  overflow: hidden;
  color: black;
  margin: 1px;
}

.Two {
  font-size: 18px;
  font-family: Georgia, serif;
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

.answer:hover {
  cursor: pointer;
  // background: #fff;
  // color: #339dff;
  box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
}
</style>