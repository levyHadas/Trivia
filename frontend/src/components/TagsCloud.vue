<template>
    <section class="tags-section">
        <div class="tags-container"> 
            <button class="close-tags" @click="$emit('closeTags')">X</button>
            <div class="tags"
                v-for="(tag, idx) in tags" :key="idx"
                @click="toggleSelected(tag, $event.target)">
                    <div class="tag">{{tag}}</div>
            </div>
        <button class="save-tags" @click="emitTagsSelection">PLAY</button>
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
        emitTagsSelection() {
            var filter = {}
            filter.tags = this.selectedTags
            this.$emit('tagsSelected', filter)
        },
        toggleSelected(selectedTag, elTag) {
            if (elTag.classList.contains('selected')) {
                this.selectedTags = this.selectedTags.filter(tag => tag !== selectedTag)
            }
            else this.selectedTags.push(selectedTag.toLowerCase())
            elTag.classList.toggle('selected')
        }
    },

}
</script>

<style scoped lang="scss">


 
.selected {
    color: red;
}
.tags-section {
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.447);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
}
.tags-container {
    width: 70%;
    height: 70%;
    margin: 100px 12vw;
    align-items: center;
    flex-wrap: wrap; 
    justify-content: space-evenly;
    position: absolute;
    background-color: rgba(72, 182, 149, 0.8);
    z-index: 2;
    display: flex;
    border-radius: 5%;
    
    button {
        border-radius: 7%;
        position: block;
        background-color: aqua;
        border: none;
        padding: 15px;
        color: teal;
        cursor: pointer;
    }
    .save-tags {
        width: 120px;
        height: 80px;
        border: none;
        font-size: 30px;
    }
    .close-tags { 
        width: 40px;
        height: 40px;
        border: none;
        font-size: 16px;
        
    }

}
.tags {
    // color: #F7F4E9;
    color: #f9f8f6;
    padding: 10px 70px 10px 10px;
    display: block;

}
.tag {
    padding: 20px;
    font-size: 30px;
    cursor: pointer;
}

</style>
