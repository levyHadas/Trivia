<template>
    <section class="count-down">

        <div class="resume-countdown">
            <p v-if="counting">Party Continues in {{timeRemaining}} seconds. Hit 'Continue' to Join!</p> 
            <p v-else>You missed the party (: <br/> Go home and join the next one...</p> 
        </div>


    </section>
</template>

<script>
export default {

    data() {
        return {
            countDownInterval: null,
            countDown: 16
        }
    },
    beforeCreate() {
        setTimout(() => {}, 1000)
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
    color: white;
    padding: 20px;
    font-size: 25px;
    border-radius: 27px;
    width: 300px;
    height: 190px;
    background-color: #2f1457;
    box-shadow: 1px 1px 7px 1px #2f1457;
    z-index: 50;
    margin: 50px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 8%;
    z-index: 37;
    position: absolute;
    left: 50%;
    margin-left: -150px;
}


</style>
