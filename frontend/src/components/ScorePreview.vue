<template>
    <section>
        <li class="quest-score-container">
            <div class="quest-score-item questPreview">{{questPreview}}</div>
            <div class="quest-score-item result" :class="isCorrect">{{result}}</div>
            <div class="quest-score-item time" :class="isCorrect">{{timeForDisplay}}</div>
            <div class="quest-score-item compare-to" v-if="score.isCurrect">Only {{randVal}}% faster</div>
            <div class="quest-score-item compare-to" v-if="!score.isCurrect">Only {{randVal}}% wins</div>
        </li>
    </section>
</template>

<script>
import UtilService from '@/services/UtilService.js'

export default {
    props: {
        score: Object
    },
       created() {
        console.log(this.score)
    },
    computed: {
        result() {
            if (this.score.isCurrect === true) return 'V'
            return 'X'
        },
        questPreview() {
            return this.score.quest.txt.substring(0, 15)+'...'
        },
        isCorrect() {
            if (this.score.isCurrect  === true) return 'correct'
            return 'incorrect'
        },
        timeForDisplay() {
            const secs = this.score.time/1000
            return secs+' Secs'
        },
        randVal() {
            return UtilService.getRandomIntInclusive(30, 70)

        }
    }
}
</script>

<style scopped>

    .quest-score-container {
        display: grid;
        grid-template-columns: 4fr 1fr 1fr 4fr; 
        width: 100%
    }
    .quest-score-item {
        color: white;
        font-size: 30px;
        
    }
</style>