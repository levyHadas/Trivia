<template>
  <section class="waiting-for-others">
      <div class="msg-container">
        <div class="wait-txt">
          <h1>You are quick!</h1>
          <h1>Waiting for others to finish</h1>
        </div>
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
}
</script>
<style scoped lang="scss">
</style>
