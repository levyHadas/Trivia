<template>
  <section class="summary-section">
    <div class="summary-container">
      <ul>
        <score-preview v-for="(score, idx) in myScores" :key="idx" :score="score"/>
      </ul>
      <div class="bts-container">
        <button class="btn continue" @click="$emit('resumeGame')" focus>Continue</button>
        <button class="btn new-topic" @click="$emit('selecteNewTopic')">New Topic</button>
      </div>
    </div>
  </section>
</template>

<script>
import ScorePreview from "@/components/ScorePreview";

export default {
  props: {
    myScores: Array
  },
  components: {
    ScorePreview
  }
};
</script>

<style scoped lang="scss">
.summary-section {
  position: absolute;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 20;
}
.summary-container {
  width: 70%;
  max-width: 800px;
  height: 70%;
  margin: 90px auto;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(129, 176, 187, 0.8);
  z-index: 2;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  button {
    position: block;
    background-color: #2f1457;
    color: white;
  }
  .bts-container {
    display: flex;
    align-items: center;
  }
  .continue {
    margin-right: 10px;
  }
  
  .new-topi {
    margin-left: 10px;
  }

  ul {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    width: 100%;
    text-align: left;
    width: 85%;
    margin: 0 auto;
  }
}

h1 {
  color:white;
}
</style>
