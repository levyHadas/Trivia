<template>
    <section class="count-down">

        <div class="resume-countdown">
            <div class="txt" v-if="counting">Next Party in {{timeRemaining}} s' </div> 
            <div class="txt" v-if="counting">Hit 'Continue' to Join!</div> 
            <div class="txt" v-if="!counting">You missed the party</div>
            <div class="txt" v-if="!counting">join the next one...</div> 
            <button class="btn countdown-btn continue" v-if="counting" @click="$emit('askToContinue')" focus>Continue</button>
            <button class="btn countdown-btn goHome" v-if="!counting" @click="$emit('goHome')">Home</button>
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
        setTimeout(() => {}, 1000)
    },
    created() {
    this.countDownInterval = 
        setInterval(() => {
            this.countDown--
            if (this.countDown === 0) {
                clearInterval(this.countDownInterval)
                this.countDownInterval = null
                //for demo only
                this.$emit('dontContinue')
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
    color: #2f1457;
    // padding: 20px;
    font-size: 25px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 22%;
    z-index: 37;
    position: absolute;
    // padding: 25px;
    border: 3px solid #8d9ea6;
    border-radius: 7px;
    padding: 10px;
    width: 300px;
    // media query under 425
    // margin-left: -157px;

    .txt {
        margin: 5px 0;
    }

    .countdown-btn {
    background-color: #0e6d83;
    height: max-content;
    color: white;
    width: 80px;
    margin: 5px 0;
    align-self: flex-end
    }
}


</style>
