<template>
    <section>
        <h1>Find a Question:</h1>
        <button @click="toggleTagsCloud(false)">By Category</button>
        <button @click="toggleTagsCloud(true)">By Tags</button>
        <!-- <tag-cloud @tagsSelected="startListView()"></tag-cloud>  -->
        <tags-cloud
            v-if="tagsCloudShown"
            :tags="allTags"
            @startListView="startListView"/>
        <category-view 
             
            :categories="allCategories"
            @startListView="startListView"
            :filter="filterBy"/>

    </section>
</template>




<script>
//when category s clicked it emites event updateCurrView('list')
import CategoryView from '@/components/CategoryView.vue'
import TagsCloud from '@/components/TagsCloud.vue'
import QuestService from '../services/QuestService.js'



export default {

    data() {
        return {
            quests: [],
            tagsCloudShown: false,
            filterBy: {
                category: '',
                tags: []
            },
            // allTags: [],
            // allCategories: [] 
            // allTags: ['American history', 'pandas', 'JS', 'Anime', 'Funny', 'War', 'Space'], //should be loaded from DB
            // allCategories: ['Science & Nature', 'Science: Computers', 'Science: Mathematics',
            //     'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Entertainment', 'Art']
        }
    },
    components: {
        CategoryView,
        TagsCloud,
    },

    async created() {
        const filterOptions = await this.$store.dispatch('loadFilterOptions')
        

    },

 

    methods: {

        toggleTagsCloud(cloudState) {
            this.tagsCloudShown = cloudState
        },

        async startListView(filter) {
            this.filterBy = filter
            this.quests = await this.$store.dispatch({ type: 'loadQuests', filterBy: this.filterBy })
            this.updateCurrView('list')  
        }
    },

    computed: {
        allCategories() {
            return this.$store.getters.filterOptions.categories
        },
        viewToRender() {
            return this.currView
        },
     
        allTags(){
            return this.$store.getters.filterOptions.tags
        },
        
    },

}
</script>

<style>

</style>