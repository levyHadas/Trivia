<template>
  <section class="summary-section">
    <div class="summary-container">
      <div class="pudium-container">
        <div class="winners-container">
          <div class="second">{{first}}</div>
          <div class="first">{{second}} </div>
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
  background-color: #818e94;
}
.summary-container {
    width: 88vw;
    margin-left: 5vw;


 

  .pudium-container {
    background: url("../assets/podium2.jpg") no-repeat center center;
    background-size: cover;
    max-width: 750px;
    max-height: 100vw;
    height: calc(80vh - 110px);
    margin: 0 auto;
    z-index: 20;
    box-shadow: -1px 1px 11px 3px #5f6972;
    border-radius: 10px;
    margin-top: calc(5vh + 55px);
  }
  .winners-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 0.5fr 0.5fr 0.5fr 0.5fr 1fr 1fr;
    font-size: 3rem;
    height: 100%;
    text-align: center;
    color: #f4376d;
    font-weight: bold;
    font-family: 'Merriweather', serif;
    @media (max-width: 750px) {
      font-size: 2.4rem;
      font-weight: 400;
    }
    @media (max-width: 500px) {
      font-size: 1.4rem;
      font-weight: 400;

    }

  }
  .second {
    grid-row-start: 6;
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .first {
    grid-row-start: 5;
    grid-column-start: 2;
  }
  .third {
    margin-right: 20px;
    grid-row-start: 6;
    grid-column-start: 3;
    margin-bottom: 20px;
  }
}

h1 {
  color:white;
  font-weight: bold;
}
</style>
