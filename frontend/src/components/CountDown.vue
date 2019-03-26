<template>
    <section class="count-down">
        <div class="countdown-bg">
            <div class="time-holder">
                {{timeRemaining}}
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
                    this.countDown = 'Lets Party!'
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

<style scopped lang="scss">



.countdown-bg {
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.447);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
}

.time-holder {
    color: black;
    padding: 50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    font-size: 50px;
    background-color: aquamarine;
}


</style>
