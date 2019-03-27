<template>
  <section class="summary-section">
    <div class="summary-container">
      <!-- <img class="podium" src="../assets/podium.png" alt=""> -->
      <div class="pudium-container">
        <div class="winners-container">
          <div class="second">Sarel</div>
          <div class="first">Ido</div>
          <div class="third">Hadads</div>

        </div>
      </div>
      <div class="bts-container">
        <button class="continue" @click="$emit('resumeParty')" focus>Continue</button>
        <button class="goHome" @click="$emit('goHome')">Home</button>
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
  width: 70vw;
  height: 80vw;
  max-height: 550px;
  max-width: 600px;
  min-width: 300px;
  margin: 100px 12vw;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(245, 245, 245, 0.9);
  z-index: 2;
  display: flex;
  flex-direction: column;
  border-radius: 3%;

  button {
    border-radius: 7%;
    position: block;
    background-color: #0d2c54;
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
    // background: url("../assets/");
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
