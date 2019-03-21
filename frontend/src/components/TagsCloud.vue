<template>
    <section >
        <!-- should be modal!!! -->
        <div class="tags-container"> 
            <div class="tags"
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
.tags-container {
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.747);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 50px;
}
.tags {
    color: white;
    padding: 10px 70px 10px 10px;

}

</style>
