<template>
  <div class="game-screen">
    <single-game
      v-if="!this.partyMode"
      @startGameInterval="startGameInterval"
      :myScores="myScores"
      :endOfRound="endOfRound"
      @resetProgress="updateProgress"/>

    <party-game
      v-if="this.partyMode"
      :myScores="myScores"
      @startGameInterval="startGameInterval"
      @resetProgress="updateProgress"/>

    <transition name="fadeOne" v-if="!endOfRound">
      <div v-show="show" class="container quest-container" v-if="thisQuestion">
        <div class="One">
          <div
            v-show="show"
            id="countdown"
            class="countdown timer"
            :class="{redTimer: isTimerLessThen10}"
            transition="countdown--appear"
            v-cloak
          >
            <svg class="countdown__circle" width="50" height="50">
              <circle
                v-if="this.isTimer"
                cx="-1.5"
                cy="-10"
                r="17"
                transform="rotate(-180 8.5 8.5)"
              ></circle>
              <!-- 51 = 102/2 -->
            </svg>

            <div class="countdown__number">
              <span class="number">{{currentTimer}}</span>
            </div>
          </div>
          <br>
          <div class="quest-txt" 
            v-html="thisQuestion.txt"
            :class="(partyMode)? 'quest-txt-party' : 'quest-txt-single'"></div>
        </div>
      </div>
    </transition>
    <transition name="fadeTwo">
      <div v-show="show" class="answer-container" v-if="thisQuestion">
        <p
          class="Two answer"
          v-for="(answer, idx) in thisAnswers"
          :key="idx"
          :class="classList(idx)"
          @click="checkAnswer($event,idx)"
        >{{answer}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import SocketService from "@/services/SocketService.js";
import SingleGame from "@/views/SingleGame";
import PartyGame from "@/views/PartyGame";
const NUM_OF_QUESTS = 6

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
      isTimer: true,
      timer: 1500,
      counter: 0,
      isTimerLessThen10: false,
      myScores: [], //only this user scores
      // playersWithScores: [], //all scores
      partyCountDown: false,
      partyMode: false,
      partyStartTime: Date.now(),
      isPartyOver: false
    };
  },
  created() {
    this.partyMode = this.$route.name === "partyMode" ? true : false;
  
  },
  methods: {
    startGameInterval() {
      this.resetGame();
      this.startInterval();
    },
    startInterval() {
      clearInterval(this.timerInterval);
      this.timerInterval=null
      this.timerInterval = setInterval(() => {
        if (this.timer === 0) {
          this.isTimer = false;
          clearInterval(this.timerInterval);
          this.updateMyScores(this.thisQuestion, false, 15);
          this.counter += 1;
          this.nextQuestion();
          return;
        }
        this.timer -= 1;
        if (this.timer < 10) this.isTimerLessThen10 = true;
      }, 1000);
    },
    resetGame() {
      this.show = true;
      this.myScores = [];
      this.isOver = false;
      this.counter=0;
    },

    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },

    checkAnswer(event, answerIdx) {
      this.isTimer = false;
      clearInterval(this.timerInterval);
      var correctAnswerIdx = +this.thisQuestion.correctAnswerIdx;
      if (correctAnswerIdx === answerIdx) {
        this.playSound(this.right);
        var isCorrect = true;
      } else {
        this.playSound(this.wrong);
        var isCorrect = false;
      }
      this.isOver = true;
      this.updateMyScores(this.thisQuestion, isCorrect, 15 - this.timer);
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
    updateMyScores(question, isCorrect, time) {
      this.myScores.push(this.saveScore(question, isCorrect, time));
      if (this.partyMode) this.reportChangeInScores();
    },
    nextQuestion() {
      this.updateProgress(this.myScores);
      if (this.quests.length === 1) {
        this.counter = NUM_OF_QUESTS;
        console.log("1");
      } else {
        this.timeoutNextQuestion = setTimeout(() => {
          this.$store.dispatch({ type: "nextQuest" });
          this.question = this.$store.getters.currQuest;
          this.isOver = false;
          this.isTimerLessThen10 = false;
          this.timer = 1500;
          this.isTimer = true;
          this.startInterval()
        }, 2100);
      }
    },

    updateProgress(updatedScores) {
      this.myScores = updatedScores;
      this.$emit("updateProgress", updatedScores);
      if (this.partyMode) this.$emit("updateProgress", this.playersWithScores);
    },

    reportChangeInScores() {
      let currUser = this.$store.getters.currUser;
      SocketService.emit("changeInScores", {
        playerToUpdate: currUser,
        newScores: this.myScores
      });
    },

    classList(idx) {
      var correctAnswerIdx = +this.$store.getters.currQuest.correctAnswerIdx;
      if (correctAnswerIdx === idx) {
        return { answerCorrect: this.isOver };
      } else {
        return { answerWrong: this.isOver };
      }
    },
    pauseGame() {
      this.show = false;
      clearInterval(this.timerInterval);
      // this.counter = 0;
    }
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
    endOfRound() {
      if (this.counter === NUM_OF_QUESTS) {
        this.pauseGame();
        return true;
      }
      return false;
    },
    playersWithScores() {
      var playersWithScores = this.$store.getters.playersWithScores
      if (!playersWithScores) return {}
      return playersWithScores
    }
  },

  destroyed() {
    clearInterval(this.timerInterval)
    this.timerInterval = null
  },

  components: {
    SingleGame,
    PartyGame
  }

};
</script>

<style scoped lang="scss">
.quest-container {
  margin: 50px auto;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  font-size: 32px;

}
.answer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;

}
.quest-txt {
  text-align: center;
  padding-bottom: 20px;

}    
.quest-txt-single {
  width: 80%;
  margin: 0 auto;
}    
.quest-txt-party {
  max-width: 400px;
  text-align: center;
}    

.game-screen {
  margin-right: 20px;
  //should be only on desktop
}


p {
  text-align: center;
  font-size: 2rem;
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
}

.One {
  padding: 5px;
  font-size: 30px;

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
  background: #2f1457;
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  border-radius: 30px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: 350px;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  line-height: 60px;
  box-shadow: -2px 3px 3px 0px #000000;
}

.answer:hover {
  cursor: pointer;
  box-shadow: -2px 3px 3px 0px #2f1457;
  background-color: #4f1b9b;
  // -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  // -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
  // box-shadow: 3px 3px 3px rgba(8, 58, 69, 0.7);
  // box-shadow: 4px 4px 4px rgba(83, 100, 255, 0.7);
}
.answer:active {
  box-shadow: -2px 3px 3px 0px #2f1457;
  // text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
  animation: nudge 0.4s linear;
}

.answerCorrect {
  box-shadow: -3px 4px 4px 0px #00dbc9;
  background: #25f0e0;
  color: black;
}
.answerCorrect:hover {
  box-shadow: -3px 4px 4px 0px #00dbc9;
  background: #25f0e0;
  color: black;
}

.answerWrong {
  box-shadow: -2px 2px 2px 0px #0e6d83;
  background: #0e6d83;
}
.answerWrong:hover {
  box-shadow: -2px 2px 2px 0px #0e6d83;
  background: #0e6d83;
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

//

@mixin xyCentered() {
  margin-top: 10px;
  // margin-bottom:5px;
  position: relative;
  top: -172%;
  left: 50%;
  transform: translate(-50%, -50%);
}

[v-cloak] {
  display: none;
}

.countdown {
  position: relative;
  width: 38px;
  height: 20px;
  @include xyCentered();

  &.countdown--appear-transition {
    transition: all 0.4s ease;

    .countdown__circle,
    .countdown__number {
      transition: all 0.3s ease-out;
    }
  }

  &.countdown--appear-enter {
    opacity: 0;

    .countdown__number {
      transform: translate(-50%, -50%) scale(0.7);
    }
  }

  &.countdown--appear-leave {
    opacity: 0;

    .countdown__circle {
      transform: translate(-50%, -50%) scale(1.1);

      circle {
        stroke-dasharray: 0;
        stroke-dashoffset: 0;
        animation: none;
      }
    }
  }

  .countdown__circle {
    // @include xyCentered();
    -webkit-filter: drop-shadow(0px 0px 5px rgba(156, 28, 74, 0.3));
    filter: drop-shadow(0px 0px 5px rgba(37, 240, 224, 0.7));

    circle {
      fill: none;
      stroke: #fff;
      stroke-width: 4px;
      stroke-dasharray: 106;
      stroke-dashoffset: -106;
      animation: dash 1s ease-in-out infinite forwards;
    }
  }

  .countdown__number {
    @include xyCentered();

    .number {
      font-size: 1.5rem;
    }
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: -212;
  }
}
</style>




