<template>
    <section >
        <!-- should be modal!!! -->
        <div class="tags-container"> 
            <div class="tags-container" 
                v-for="(tag, idx) in tags" :key="idx"
                @click="toggleSelected(tag, $event.target)">
                    <div class="tag">{{tag}}</div>
            </div>
            <button class="save-tags" @click="emitListView()">Done</button>
        </div>

    </section>
</template>

<script>

export default {
    props: {
        tags: Array
    },
    data() {
        return {
            selectedTags: []
        }
    },
 
    methods: {
        emitListView(categoryName) {
            const filter = {
                category: '',
                tags: this.selectedTags
            }
            this.$emit('startListView', filter)
        },
        toggleSelected(selectedTag, elTag) {
            if (elTag.classList.contains('selected')) {
                this.selectedTags = this.selectedTags.filter(tag => tag !== selectedTag)
            }
            else this.selectedTags.push(selectedTag)

            elTag.classList.toggle('selected')
        }
    },

}
</script>

<style scopped>
 
.selected {
    color: red;
}
</style>
