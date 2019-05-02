<template>
    <section class="resume-countdown-container">
        <div class="resume-countdown">
            <div class="txt" v-if="counting">Next Party in 
                <span class="time-remaining">{{timeRemaining}}</span>
             s'</div> 
            <div class="txt" v-if="counting && !askedToContinue">Hit 'Continue' to Join!</div> 
            <div class="txt" v-if="!counting && !askedToContinue">You missed the party</div>
            <div class="txt" v-if="!counting && !askedToContinue">join the next one...</div> 
            <button class="btn countdown-btn continue" v-if="counting && !askedToContinue" @click="askToContinue" focus>Continue</button>
            <button class="btn countdown-btn goHome" v-if="!counting && !askedToContinue" @click="$emit('goHome')">Home</button>
        </div>
    </section>
</template>
<script>
import { COUNTDOWN_TO_RESUME_SECS } from '@/services/GameConsts'
export default {
    data() {
        return {
            countDownInterval: null,
            countDown: COUNTDOWN_TO_RESUME_SECS,
            wishToContinue: false
        }
    },
    created() {
    this.countDownInterval = 
        setInterval(() => {
            this.countDown--
            if (this.countDown === 0) {
                clearInterval(this.countDownInterval)
                this.countDownInterval = null
                //for demo only
                if (!this.wishToContinue) this.$emit('dontContinue')
            }
        },1000)
    },
    methods: {
        askToContinue() {
            this.wishToContinue = true;
            this.$emit('askToContinue')
        }
    },
    computed: {
        timeRemaining() {
            return this.countDown-1
        },
        counting() {
            if (this.countDown >= 1) return true
            return false
        },
        askedToContinue() {
            return this.wishToContinue
        }
    },
    destroyed() {
        clearInterval(this.countDownInterval)
        this.countDownInterval = null
    },
}
</script>
<style scoped lang="scss">
</style>
