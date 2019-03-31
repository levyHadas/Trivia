<template>
    <section class="count-down">

        <div class="resume-countdown">
            <p v-if="counting">Party Continues in {{timeRemaining}} seconds. Join now!</p> 
            <p v-else>Start!</p> 
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
            return this.countDown-1
        },
        counting() {
            if (this.countDown >= 1) return true
            return false
        }
    },

    destroyed() {
        clearInterval(this.countDownInterval)
        this.countDownInterval = null
    },
 

}
</script>

<style scoped lang="scss">





.resume-countdown {
    color: black;
    padding: 20px;
    font-size: 25px;
    border-radius: 5px;
    width: 250px;
    height: 120px;
    background-color: white;
    border: 5px dashed #e4ff58;
    z-index: 50;
    margin: 50px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -15px;
    z-index: 37;
    position: absolute;
    left: 30px;
}


</style>
