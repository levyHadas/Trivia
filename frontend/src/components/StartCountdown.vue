<template>
    <section class="start-count-down">
        <div class="countdown-bg">
            <div class="animation-container">
                <p class="time-holder">{{timeRemaining}}</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {

    data() {
        return {
            countDownInterval: null,
            countDown: 3
        }
    },
    created() {
        // startCountDown
        this.countDownInterval = 
            setInterval(() => {
                this.countDown--
                if (this.countDown === 0) {
                    this.countDown = 'GO!'
                    clearInterval(this.countDownInterval)
                    this.countDownInterval = null
                }
            },1000)
    },
    computed: {
        timeRemaining() {
            return this.countDown
        }
    },

    destroyed() {
        clearInterval(this.countDownInterval)
        this.countDownInterval = null
    },
 

}
</script>

<style scoped lang="scss">


@import url('https://fonts.googleapis.com/css?family=Special+Elite');

.countdown-bg {
  position: absolute;
  width: 100vw;
  height: calc(100vh - 55px);
  top: 0;
  left: 0;
  z-index: 20;
  background-color: #97dcdf;
//   height: 98vh;
}

  .animation-container {
    background: url("https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/giphy.gif") no-repeat center center;
    background-size: cover;
    box-shadow: -1px 1px 11px 3px #5f6972;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55vw;
    height: 53vw;
    z-index: -20;
    margin: 10vh auto 0 auto;
    max-width: 500px;
    max-height: 500px;
  }

  .time-holder {
    font-size: 80px;
    text-align: center;
    margin-bottom: 220px;
    color: #1D1D2C;
    font-family: 'Special Elite', cursive;
    
  }

</style>
