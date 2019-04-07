<template>
    <section class="count-down">
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
  height: calc(100vh - 110px);
  top: 55px;
  left: 0;
  z-index: 20;
  background-color: #97dcdf;
}

  .animation-container {
    background: url("https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/giphy.gif") no-repeat center center;
    background-size: cover;
    box-shadow: -1px 1px 11px 3px #5f6972;
    border-radius: 50%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70vw;
    height: 70vw;
    z-index: -20;
    // margin: 10vh auto;
    margin: 12vh auto 20px auto;
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





// .countdown-bg {

//   position: absolute;
//   z-index: 1;
//   background-color: rgba(245, 245, 245, 0.5);
//   width: 100vw;
//   height: 100vh;
//   top: 0;
//   left: 0;
//   z-index: 20;
// }

// .time-holder {
//     color: black;
//     padding: 20px;

//     border-radius: 50%;
//     font-size: 50px;
//     background-color: white;
//     border: 5px dashed #e4ff58;
//     width: 200px;
//     height: 200px;
//     z-index: 2;
//     margin: 20vh auto;
//     display: flex;
//     align-items: center;
//     justify-content: center
// }


</style>
