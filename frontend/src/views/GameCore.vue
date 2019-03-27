<template>
  <div class="quest">
    <count-down v-if="ShowPartyCountDown"/>
    <transition name="fadeOne">
      <div v-show="show" class="container" v-if="thisQuestion">
        <p class="One">
          <span class="timer" :class="{redTimer: isTimerLessThen10}">{{currentTimer}}</span>
          <br>
          {{thisQuestion.txt}}
        </p>
      </div>
    </transition>
    <transition name="fadeTwo">
      <div v-show="show" class="containerAnswers" v-if="thisQuestion">
        <p
          class="Two answer"
          v-for="(answer, idx) in thisAnswers"
          :key="idx"
          :class="classList(idx)"
          @click="checkAnswer($event,answer)"
        >{{answer}}</p>
      </div>
    </transition>
    <!-- <score-summary
      v-if="showSummary"
      :scores="scores"
      @resumeGame="startGameInterval"
      @newGame="newGame"
    />-->
  </div>
</template>

<script>
import ScoreSummary from "@/components/ScoreSummary";
import SocketService from "@/services/SocketService.js";
import CountDown from "@/components/CountDown";

export default {
  name: "Question",
  data() {
    return {
      wrong:
        "https://res.cloudinary.com/sarel/video/upload/v1553422191/wrong.wav",
      right:
        "https://res.cloudinary.com/sarel/video/upload/v1553422191/right.mp3",
      show: false,
      question: {},
      isOver: false,
      quests: [],
      timerInterval: "",
      timer: 15,
      counter: 0,
      isTimerLessThen10: false,
      scores: [], //only this user scores
      playersWithScores: [], //all scores
      partyCountDown: false
    };
  },
  methods: {
    newGame() {
      this.$router.push("/CategorySelection");
    },
    startGameInterval() {
      this.show = true;
      if (this.quests.length === 1) {
        console.log("end");
      }
      this.scores = [];
      this.timerInterval = setInterval(() => {
        if (this.timer === 0) {
          this.scores.push(this.saveScore(this.question, false, 15));

          if (this.$route.name === "partyMode") this.updateGameScores();

          this.isOver = true;
          this.counter += 1;
          this.nextQuestion();
          return;
        }
        this.timer -= 1;
        if (this.timer < 10) this.isTimerLessThen10 = true;
      }, 1000);
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    checkAnswer(event, answer) {
      var answers = this.$store.getters.currQuest.answers;
      this.question = this.$store.getters.currQuest;
      var answerIdx = +answers.indexOf(answer);
      var correctAnswerIdx = +this.$store.getters.currQuest.correctAnswerIdx;
      var isCorrect = false;
      if (correctAnswerIdx === answerIdx) {
        this.playSound(this.right);
        isCorrect = true;
      } else {
        this.playSound(this.wrong);
      }
      this.isOver = true;
      this.scores.push(
        this.saveScore(this.question, isCorrect, 15 - this.timer)
      );
      if (this.$route.name === "partyMode") this.updateGameScores();

      this.counter += 1;
      this.nextQuestion();
    },
    saveScore(quest, isCorrect, time) {
      return {
        quest,
        time,
        isCorrect
      };
    },
    nextQuestion() {
      this.$emit("updateProgress", this.scores);
      if (this.quests.length === 1) {
        clearInterval(this.timerInterval);
        this.counter = 5;
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
    classList(idx) {
      var correctAnswerIdx = +this.$store.getters.currQuest.correctAnswerIdx;
      if (correctAnswerIdx === idx) {
        return { answerCorrect: this.isOver };
      } else {
        return { answerWrong: this.isOver };
      }
    },
    updateGameScores() {
      const playerScores = this.$store.getters.currUser;
      playerScores.scores = this.scores;
      SocketService.emit("updateGameScores", playerScores);
    }
  },

  async created() {
    if (this.$route.name !== "partyMode") {
      try {
        var quests = await this.$store.dispatch({
          type: "loadQuests",
          filterBy: {}
        });
      } catch {
        console.log("Unable to load questions. Please try again later");
      }
      this.$store.dispatch({ type: "setGameQuests", quests });
      this.quests = quests;
      this.$store.commit({ type: "setCurrQuest", quest: this.quests[0] });

      this.question = this.$store.getters.currQuest;

      setTimeout(() => {
        this.show = true;
      }, 300);
      this.startGameInterval();
    }

    //need to make sure timer doesn't show for joined
    else {
      //show counter for 3 seconds
      this.$store.dispatch({ type: "setPartyRequest" });

      this.partyCountDown = true;
      setTimeout(() => {
        this.quests = this.$store.getters.questsForDisplay;
        this.updateGameScores();
        this.playersWithScores = this.$store.getters.playersWithScores;
        this.show = true;
        this.startGameInterval();
        this.partyCountDown = false;
      }, 4000);
    }
  },

  destroyed() {
    clearInterval(this.timerInterval);
    const loggedUser = this.$store.getters.currUser;
  },

  computed: {
    thisQuestion() {
      return this.$store.getters.currQuest;
    },
    thisAnswers() {
      return this.$store.getters.currQuest.answers;
    },
    currentTimer() {
      return this.timer;
    },
    showSummary() {
      if (this.counter === 5) {
        this.show = false;
        clearInterval(this.timerInterval);
        this.counter = 0;
        return true;
      }
      return false;
    },
    ShowPartyCountDown() {
      return this.partyCountDown;
    }
  },

  components: {
    ScoreSummary,
    CountDown
  }
};
</script>

<style scoped lang="scss">
.quest {
  max-height: 90%;
  max-height: 520px;
  padding: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

.containerAnswers {
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
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
  font-size: 30px;
  overflow: hidden;
  color: black;
}

.timer {
  font-size: 25px;
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
  background: #00a6ed;
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

.answer:hover {
  cursor: pointer;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
  box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
}
.answer:active {
  animation: nudge 0.4s linear;
}

.answerCorrect {
  background: #7fb800;
}

.answerWrong {
  background: #f6511d;
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
</style>