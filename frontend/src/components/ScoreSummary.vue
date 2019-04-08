<template>
  <section class="summary-section">
    <div class="summary-container">
      <div class="bts-container">
        <button class="summary-btn continue" @click="$emit('resumeGame')" focus>Continue</button>
        <button class="summary-btn new-topic" @click="$emit('selecteNewTopic')">New Topic</button>
      </div>
      <ul>
        <score-preview v-for="(score, idx) in myScores" :key="idx" :score="score"/>
      </ul>
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


.summary-container {
  top: 55px;
  position: absolute;
  width: 100vw;
  left: 0;
  z-index: 10;
  background-color: rgba(29, 29, 44, 0.6);;

  .summary-btn {
    position: block;
    background-color: #3CBCC3;
    color: #f9f8f6;
    font-size: 1.5rem;
    padding: 10px 15px;
    border: 2px solid #f9f8f6;
  }
  .bts-container {
    margin-top: 17px;
    display: flex;
    width: 100vw;
    justify-content: center
  }
  .continue {
    margin-right: 10px;
  }
  
  .new-topic {
    margin-left: 10px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 450px) {
  .summary-container .summary-btn {
    border: none;
    font-size: 1.1rem;
    padding: 7px 10px;
    border: 1px solid #f9f8f6;
  }
}

</style>
