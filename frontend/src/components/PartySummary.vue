<template>
  <section class="summary-section">
    <div class="summary-container">
      <div class="podium-container">
        <div class="winners-container">
          <div class="second">{{second}}</div>
          <div class="first">{{first}} </div>
          <div class="third">{{third}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ScorePreview from "@/components/ScorePreview";

export default {
 
  data() {
    return {
      playersScores:[],
      first: '',
      second: '',
      third: ''
    }
  },
  created() {
    this.playersScores = this.$store.getters.playersWithScores
  },
  mounted() {
    this.findWinner()
  },
  components: {
    ScorePreview
  },
  methods: {
    findWinner() {
      this.playersScores = 
      this.playersScores.map(player => {
        var numOfCorrect = 0
        var totalCorrectTime = 0
        player.scores.forEach(score => {
          if (score.isCorrect) {
            numOfCorrect++
            totalCorrectTime += score.time
          }
        })
        player.numOfCorrect = numOfCorrect
        player.totalCorrectTime = totalCorrectTime
        return player
      })

      this.playersScores.sort((player1, player2) => {
        if (player1.numOfCurrect < player2.numOfCurrect) return 1 
        else if (player1.numOfCurrect > player2.numOfCurrect) return -1 
        else {
          if (player1.totalCorrectTime > player2.totalCorrectTime) return 1
          else if (player1.totalCorrectTime < player2.totalCorrectTime) return -1
          else return 0
        }
      })
      if (this.playersScores[0]) this.first = this.playersScores[0].nickname
      if (this.playersScores[1]) this.second = this.playersScores[1].nickname
      if (this.playersScores[2]) this.third = this.playersScores[2].nickname
    }
  },
}
</script>

<style scoped lang="scss">
.summary-section {
  position: absolute;
  width: 100vw;
  height: calc(100vh - 110px);
  top: 55px;
  left: 0;
  z-index: 10;
  background-color: #e3f5f6;
  background-image: url('https://img.pngio.com/confetti-birthday-party-png-party-streamers-940_425.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.summary-container {
    margin: 0 auto;
    width: 88vw;
    max-width: 650px;
    

  .podium-container {
    background: url("../assets/podium6.jpg") no-repeat center center;
    background-size: cover;
    max-height: 100vw;
    height: calc(80vh - 110px);
    margin: 0 auto;
    z-index: 20;
    box-shadow: -1px 1px 11px 3px #487d80;
    border-radius: 10px;
    margin-top: calc(7vh + 55px);
		animation: zoomIn .5s linear;
  }
  .winners-container {
    display: grid;
    grid-template-columns: 2fr 1.5fr 2fr;
    grid-template-rows: 6fr 1fr 1fr 1fr;
    font-size: 2.5rem;
    height: 100%;
    text-align: center;
    color: #E40C2B;
    font-family: 'Special Elite', cursive;
    @media (max-width: 750px) {
      font-size: 2.2rem;
      font-weight: 400;
    }
    @media (max-width: 500px) {
      font-size: 1.4rem;
      font-weight: 400;

    }
  }
  .second {
    grid-row-start: 3;
    text-align: right;
  }
  .first {
    grid-row-start: 2;
    grid-column-start: 2;
  }
  .third {
    grid-row-start: 3;
    grid-column-start: 3;
    text-align: left;
    padding: 10px 0;
  }
}


.zoomIn {
  -webkit-animation-name: zoomIn;
  animation-name: zoomIn;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}




</style>
