<template>
  <section class="main">
    <div class="quest">
      <transition name="fadeOne">
        <div v-show="show" class="container">
          <p class="One">{{this.question.title}}</p>
        </div>
      </transition>
      <transition name="fadeTwo">
        <div v-show="show" class="container">
          <p class="Two answer">{{this.question.answers.a}}</p>
          <p class="Two answer">{{this.question.answers.b}}</p>
          <p class="Two answer">{{this.question.answers.c}}</p>
          <p class="Two answer">{{this.question.answers.d}}</p>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: "Question",
  props: {
    question2: Array
  },
  data() {
    return {
      show: false,
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
  },
  created() {
    var questId=this.$route.params.questId;
    this.$store.dispatch({ type: "loadQuest" })
    var intervalShow = setInterval(() => {
      this.show = true;
    }, 300);
    //   this.show = true;
  },
  destroyed() {
    clearInterval(intervalShow);
  }
};
</script>

<style scoped lang="scss">
.main {
  //   height: 100%;
  width: 100%;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(148, 150, 37, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
}

.container {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

button {
  color: #435466;
  font-size: 15px;
  font-weight: 600;
  background-color: #4dba87;
  margin: auto;
  width: 100px;
  height: 50px;
  border: #3b3561;
}

p {
  text-align: center;
  font-size: 50px;
  //   font-smoothing: antialiased;
  overflow: hidden;
  color: black;
  margin: 1px;
}

.Two {
  font-size: 18px;
  font-family: Georgia, serif;
}

.fadeOne-enter-active,
.fadeOne-leave-active {
  transition: all 0.5s ease-out;
}
.fadeOne-enter,
.fadeOne-leave-to {
  clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  transform: translate(0%, 100%);
}

.fadeTwo-enter-active,
.fadeTwo-leave-active {
  transition: all 0.5s ease-out;
}
.fadeTwo-enter,
.fadeTwo-leave-to {
  clip-path: polygon(0% 100%, 100% 100%, 0% 100%, 0% 100%);
  transform: translate(0%, -100%);
}

.answer {
  display: inline-block;
  margin-right: 10px;
  background: #339dff;
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  line-height: 38px;
  border-radius: 50px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: 170px;
  text-align: center;
}

.answer:hover {
  cursor: pointer;
  background: #fff;
  color: #339dff;
  box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
}
</style>