<template>
    <section class="count-down">

        <div class="resume-countdown">
            Party Continues in {{timeRemaining}} seconds. Join now!
        </div>


    </section>
</template>

<script>
export default {

    data() {
        return {
            countDownInterval: null,
            countDown: 11
        }
    },
    created() {
    this.countDownInterval = 
        setInterval(() => {
            this.countDown--
            if (this.countDown === 0) {
                clearInterval(this.countDownInterval)
                this.countDownInterval = null
            }
        },1000)
    },
    computed: {
        timeRemaining() {
            if (this.countDown > 2) return this.countDown-1
            return ('Go!')
        }
    },

    destroyed() {
        // clearInterval(this.countDownInterval)
        // this.countDownInterval = null
    },
 

}
</script>

<style scoped lang="scss">





.resume-countdown {
    color: black;
    padding: 20px;
    font-size: 25px;
    border-radius: 5%;
    border: 20px solid rgb(123, 172, 185);
    width: 200px;
    height: 100px;
    background-color: rgb(0, 99, 124);
    z-index: 50;
    margin: 50px auto;
    display: flex;
    align-items: center;
    justify-content: center
}


</style>
