<template>
    <section>
        <h1>Find a Question:</h1>
        <button @click="updateCurrView('category')">By Category</button>
        <button @click="updateCurrView('tags')">By Tags</button>
        <!-- <tag-cloud @tagsSelected="startListView()"></tag-cloud>  -->
        <tags-cloud
            v-if="this.currView === 'tags'"
            :tags="allTags"
            @startListView="startListView"/>
        <category-view 
            v-if="this.currView !== 'list'" 
            :categories="allCategories"
            @startListView="startListView"
            :filter="filterBy"/>
        <list-view 
            v-if="this.currView === 'list'" 
            :filter="filterBy"
            :quests="quests"/>
    </section>
</template>




<script>
//when category s clicked it emites event updateCurrView('list')
import CategoryView from '@/components/CategoryView.vue'
import ListView from '@/components/ListView.vue'
import TagsCloud from '@/components/TagsCloud.vue'
import QuestService from '../services/QuestService.js'



export default {

    data() {
        return {
            quests: [],
            currView: 'category',
            filterBy: {
                category: '',
                tags: []
            },
            allTags: ['American history', 'pandas', 'JS', 'Anime', 'Funny', 'War', 'Space'], //should be loaded from DB
            allCategories: ['Science & Nature', 'Science: Computers', 'Science: Mathematics',
                'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Entertainment', 'Art']
        }
    },
    components: {
        CategoryView,
        ListView,
        TagsCloud,
    },

    async created() {
        await this.$store.dispatch('loadFilterOptions')
        this.allCategories = this.$store.getters.filterOptions.categories
        this.allTags = this.$store.getters.filterOptions.tags
    },

 

    methods: {
        updateCurrView(view) {
            this.currView = view
        },
        async startListView(filter) {
            this.filterBy = filter
            this.quests = await this.$store.dispatch({ type: 'loadQuests', filterBy: this.filterBy })
            this.updateCurrView('list')
            
        }
    },

    computed: {
        categoryView () { 
            if (!this.currView) return true
            return this.currView === 'category'
        },    
    },

}
</script>

<style>

</style>