<template>
  <section class="summary-section">
    <div class="summary-container">
      <!-- <img class="podium" src="../assets/podium.png" alt=""> -->
      <div class="pudium-container">
        <div class="winners-container">
          <div class="second">{{first}}</div>
          <div class="first">{{second}} </div>
          <div class="third">{{third}}</div>

        </div>
      </div>
      <div class="bts-container">
        <button class="btn continue" @click="$emit('askToContinue')" focus>Continue</button>
        <button class="btn goHome" @click="$emit('goHome')">Home</button>
      </div>
    </div>
  </section>
</template>

<script>
import ScorePreview from "@/components/ScorePreview";

export default {
  props: {
    playersWithScores: Array
  },
  data() {
    return {
      playersScores: this.playersWithScores,
      first: '',
      second: '',
      third: ''
    }
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
      if (this.playersScores[0]) this.first = this.playersScores[0].username
      if (this.playersScores[1]) this.second = this.playersScores[1].username
      if (this.playersScores[2]) this.third = this.playersScores[2].username
    }
  },
}
</script>

<style scoped lang="scss">
.summary-section {
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.447);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 20;
}
.summary-container {
  margin: 10vh auto;
  width: 70vw;
  height: 80vw;
  max-height: 550px;
  max-width: 600px;
  min-width: 300px;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(245, 245, 245, 0.9);
  z-index: 2;
  display: flex;
  flex-direction: column;
  border-radius: 3%;

  button {
    position: block;
    background-color: #4704eb;
    border: none;
    padding: 15px;
    color: white;
    cursor: pointer;
  }
  .bts-container {
    display: flex;
    align-items: center;
    margin: 10px;
  }
  .continue {
    margin-right: 10px;
  }
  
  .goHome {
    margin-left: 10px;
  }

  .pudium-container {
    background: url("../assets/podium.png") no-repeat center center;
    width: 70vw;
    height: 80vw;
    max-height: 550px;
    max-width: 485px;
    min-width: 300px;
    background-size: contain;
  }
  .winners-container {
    height: 60%;
    display: grid;
    margin-top: 18%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 2fr 1fr 2.5fr;
    font-size: 1.2rem;
  }
  .second {
    grid-row-start: 3;
    margin-left: 20px;
  }
  .first {
    grid-row-start: 1;
    grid-column-start: 2;
  }
  .third {
    margin-right: 20px;
    grid-row-start: 3;
    grid-column-start: 3;
  }
}

h1 {
  color:white;
  font-weight: bold;
}
</style>
