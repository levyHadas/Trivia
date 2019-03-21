<template>
    <section>
        <ul class="list-container">
            <quest-preview v-for="(quest,idx) in quests" 
                :key="idx"
                :quest="quest"/>
        </ul>

    </section>
</template>

<script>

import QuestPreview from '@/components/QuestPreview.vue';

export default {
    props: {
        quests: Array
    },
    components: {
        QuestPreview
    },

}
</script>

<style scopped>
    .list-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        flex-wrap: wrap;
    }

</style>
