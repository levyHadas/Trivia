<template>
    <section>
        {{quests}}
    </section>
</template>

<script>
export default {
    props: {
        filter: Object
    },
    data() {
        return {
            quests: []
        }

    },
    created() {
        // this.quests = loadQuests(this.filter)
    }

}
</script>

<style>

</style>
