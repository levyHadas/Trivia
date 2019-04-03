<template>
  <section class="summary-section">
    <div class="summary-container">
      <div class="pudium-container">
        <div class="winners-container">
          <div class="second">{{first}}</div>
          <div class="first">{{second}} </div>
          <div class="third">{{third}}</div>
          <div class="bts-container">
            <button class="btn continue" @click="$emit('askToContinue')" focus>Continue</button>
            <button class="btn goHome" @click="$emit('goHome')">Home</button>
          </div>

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
  // background-color: rgba(0, 0, 0, 0.247);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 25;
}
.summary-container {
 

  button {
    background-color: #0e6d83;
    height: max-content;
    color: white;
    width: 80px;
    // padding: 15px;
  }
  .bts-container {
    display: flex;
    justify-content: space-evenly;
    grid-row-start: 8;
    grid-column-start: 2;
    align-items: center;
  }

  .btn.continue {
    border: 1px solid white
  }
 

  .pudium-container {
    background: url("../assets/podium2.jpg") no-repeat center center;
    background-size: cover;
    max-width: 650px;
    min-width: 300px;
    height: calc(100vh - 110px);
    margin: 55px auto 0 auto;
    z-index: 20;
  }
  .winners-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 0.5fr 0.5fr 0.5fr 0.5fr 1fr 1fr;
    font-size: 2.5rem;
    height: 100%;
    text-align: center;
    color: #f4376d;
    font-weight: bold;
  }
  .second {
    grid-row-start: 5;
    margin-left: 20px;
  }
  .first {
    grid-row-start: 4;
    grid-column-start: 2;
  }
  .third {
    margin-right: 20px;
    grid-row-start: 5;
    grid-column-start: 3;
  }
}

h1 {
  color:white;
  font-weight: bold;
}
</style>
