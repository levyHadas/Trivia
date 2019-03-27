<template>
  <section class="summary-section">
    <div class="summary-container">
      <h1>Game Summary</h1>
      <ul>
        <score-preview v-for="(score, idx) in scores" :key="idx" :score="score"/>
      </ul>
      <div class="bts-container">
        <button class="continue" @click="$emit('resumeParty')" focus>Continue</button>
        <button class="new-topic" @click="$emit('goHome')">Home</button>
      </div>
    </div>
  </section>
</template>

<script>
import ScorePreview from "@/components/ScorePreview";

export default {
  props: {
    scores: Array
  },
  components: {
    ScorePreview
  }
};
</script>

<style scopped lang="scss">
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
  width: 70%;
  height: 70%;
  margin: 100px 12vw;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(0, 0, 0, 0.747);
  z-index: 2;
  display: flex;
  flex-direction: column;
  border-radius: 3%;

  button {
    border-radius: 7%;
    position: block;
    background-color: #339dff;
    border: none;
    padding: 15px;
    color: white;
    cursor: pointer;
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
  font-weight: bold;
}
</style>
