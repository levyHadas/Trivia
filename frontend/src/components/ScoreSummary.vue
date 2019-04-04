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
  // height: calc(100vh - 110px);
  top: 55px;
  left: 0;
  z-index: 10;
  height: fit-content;
}

.summary-container {
  width: 85%;
  max-width: 950px;
  height: 75%;
  margin: 25px auto;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgb(213, 213, 213);
  z-index: 10;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  color: #0e6d83;

  button {
    position: block;
    background-color: #0e6d83;
    color: white;
  }
  .bts-container {
    display: flex;
    align-items: center;
  }
  .continue {
    margin-right: 10px;
  }
  
  .new-topic {
    margin-left: 10px;
  }

  ul {
    grid-gap: 30px;
    display: grid;
    padding: 20px 0;
  }
}

@media (max-width: 450px) {
  .summary-container {
    margin: 0 auto;
    height: inherit;
    // height: 79%;

    ul {
      grid-gap: 20px;
      width: 90%;
      padding: 10px 0;
    }
  }
}

</style>
