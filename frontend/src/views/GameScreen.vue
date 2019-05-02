<template>
  <section class="game-screen" :class="scoresInFocus">
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
      <div :show="show" class="container quest-container" v-if="thisQuestion">
        <div class="One">
          <div
            :show="show"
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
            </svg>

            <div class="countdown__number">
              <span class="number">{{currentTimer}}</span>
            </div>
          </div>
          <br>
          <div class="quest-txt" 
            v-html="thisQuestion.txt"
            v-if="shouldShowQestion"
            :class="(partyMode)? 'quest-txt-party' : 'quest-txt-single'"></div>
        </div>
      </div>
    </transition>
    <transition name="fadeTwo">
      <div v-show="show" class="answer-container" v-if="thisQuestion && timerInterval">
        <p
          class="Two answer"
          v-for="(answer, idx) in thisAnswers"
          :key="idx"
          :class="classList(idx)"
          @click="checkAnswer($event,idx)"
        >{{answer}}</p>
      </div>
    </transition>
  </section>
</template>

<script>
import SocketService from "@/services/SocketService.js";
import SingleGame from "@/views/SingleGame";
import PartyGame from "@/views/PartyGame";
import { NUM_OF_QUESTS, QUEST_TIMER_SECS } from '@/services/GameConsts'

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
      timerInterval: null,
      isTimer: true,
      timer: QUEST_TIMER_SECS,
      counter: 0,
      isTimerLessThen10: false,
      myScores: [], //only this user scores
      partyMode: false,
      showQuestion: true,
      showScores: false
    };
  },
  created() {
    this.partyMode = this.$route.name === "partyMode" ? true : false;
    this.resetGame()
  
  },
  methods: {
    startGameInterval() {
      this.resetGame();
      this.startInterval();
    },
    startInterval() {
      clearInterval(this.timerInterval);
      this.timerInterval = null
      this.timerInterval = setInterval(() => {
        if (this.timer === 0) {
          this.isTimer = false;
          clearInterval(this.timerInterval);
          this.updateMyScores(this.thisQuestion, false, QUEST_TIMER_SECS);
          this.counter += 1;
          this.nextQuestion();
          return;
        }
        this.timer -= 1;
        if (this.timer < 6) this.isTimerLessThen10 = true;
      }, 1000);
    },
    resetGame() {
      this.show = true;
      this.myScores = [];
      this.isOver = false;
      this.counter = 0;
      clearInterval(this.timerInterval);
      this.timerInterval = null
    },

    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },

    checkAnswer(event, answerIdx) {
      if (this.isTimer === false) return
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
      this.updateMyScores(this.thisQuestion, isCorrect, QUEST_TIMER_SECS - this.timer);
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
      } else {
        setTimeout(() => { //show result for 1.5 secs
          
          this.$store.dispatch({ type: "nextQuest" });
          this.question = this.$store.getters.currQuest;
          this.isOver = false;
          this.isTimerLessThen10 = false;
          this.timer = QUEST_TIMER_SECS;
          this.isTimer = true;
          if (this.partyMode  && !this.endOfRound) { //scores in focus for 2 seconds
            this.showScores = true
            setTimeout(() => {
              this.showScores = false
              this.startInterval()
            }, 1700)
          }
          else if (!this.partyMode) this.startInterval()
        }, 1500);
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
    },
    shouldShowQestion() {
      return this.showQuestion
    },
    scoresInFocus() {
      if (this.showScores) return 'hide-quest-section'
      return ''
    }
  },

  destroyed() {
    this.resetGame()
  },

  components: {
    SingleGame,
    PartyGame
  }

};
</script>

<style scoped lang="scss">





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
    text-align: center;
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




