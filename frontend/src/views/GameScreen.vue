<template>
  <section class="main">
      <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "Question",
  props: {
    question2: Array
  },
  created() {
      console.log('game was created')
  },
  data() {
    return {
      question: {
        title: "Who invented the telephone?",
        answers: {
          a: "Bell",
          b: "Einshtien",
          c: "Gahndi",
          d: "Turing"
        }
      }
    };
  }
};
</script>

<style scoped lang="scss">
.main {
// height: 100vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(148, 150, 37, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
}
</style>