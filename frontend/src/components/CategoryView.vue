<template>
    <section >
        <ul class="category-container">
            <category-preview v-for="(category,idx) in categories" 
                :key="idx"
                :category="category"
                @categorySelected="emitListView(category)"/>
        </ul>

    </section>
</template>

<script>
import CategoryPreview from '@/components/CategoryPreview.vue';

export default {

    props: {
        categories: Array
    },

    // data(){
    //     return {
    //         categories: ['Science & Nature', 'Science: Computers', 'Science: Mathematics',
    //             'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Entertainment', 'Art'] 
    //     }
    // },

    components: {
        CategoryPreview
    },

    methods: {
        emitListView(categoryName) {
            const filter = {
                category: categoryName,
                tags: null
            }
            this.$emit('startListView', filter)
        }
    },

}
</script>

<style scopped>
    .category-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        flex-wrap: wrap;
    }

</style>
