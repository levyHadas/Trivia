<template>
  <section class="summary-section">
    <div class="summary-container">
      <!-- <img class="podium" src="../assets/podium.png" alt=""> -->
      <h1>You are quick!</h1>
      <h1>Waiting for others to finish</h1>
      <p>(max waiting time is 60 seconds</p>
      <div class="bts-container">
        <button class="btn goHome" @click="$emit('goHome')">Home</button>
      </div>
    </div>
  </section>
</template>

<script>
import ScorePreview from "@/components/ScorePreview";

export default {
 

}
</script>

<style scoped lang="scss">
// .summary-section {
//   position: absolute;
//   z-index: 1;
//   background-color: rgba(0, 0, 0, 0.447);
//   width: 100vw;
//   height: 100vh;
//   top: 0;
//   left: 0;
//   z-index: 20;
// }
.summary-container {
  margin: 10vh auto;
  width: 70vw;
  height: 80vw;
  max-height: 550px;
  max-width: 600px;
  min-width: 300px;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(245, 245, 245, 0.6);
  z-index: 2;
  display: flex;
  flex-direction: column;
  border-radius: 3%;
  text-align: center;
  h1 {
    color: black;
    font-size: 30px;
  }

  button {
    position: block;
    background-color: #4704eb;
    border: none;
    padding: 15px;
    color: white;
    cursor: pointer;
  }

}

</style>
