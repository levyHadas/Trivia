<template>
  <section  class="waiting-for-others">
      <!-- <img class="podium" src="../assets/podium.png" alt=""> -->
      <div class="msg-container">
        <h1>You are quick! Waiting for others to finish</h1>
        <!-- <p>(max waiting time is 60 seconds</p> -->
        <button class="btn goHome" @click="$emit('goHome')">Home</button>

      </div>
      <div class="bts-container">
      </div>
  </section>
</template>

<script>
import ScorePreview from "@/components/ScorePreview";

export default {
beforeCreate() {
  setTimeout(() => {},1500)
}, 

}
</script>

<style scoped lang="scss">
.msg-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}


</style>
