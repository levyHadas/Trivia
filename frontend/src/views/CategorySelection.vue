<template>
    <section>
        <h1>Find a Question:</h1>
        <button @click="toggleTagsCloud(false)">By Category</button>
        <button @click="toggleTagsCloud(true)">By Tags</button>
        <!-- <tag-cloud @tagsSelected="startListView()"></tag-cloud>  -->
        <tags-cloud
            v-if="tagsCloudShown"
            :tags="allTags"
            @tagsSelected="startGame"/>
        <category-list 
            :categories="allCategories"
            @categorySelected="startGame"
            :filter="filterBy"/>
    </section>
</template>




<script>
//when category s clicked it emites event updateCurrView('list')
import CategoryList from '@/components/CategoryList.vue'
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
          
        }
    },
    components: {
        CategoryList,
        TagsCloud,
    },

    async created() {
        await this.$store.dispatch('loadFilterOptions')
    },

 

    methods: {

        toggleTagsCloud(cloudState) {
            this.tagsCloudShown = cloudState
        },

        async startGame(filter) {
            this.filterBy = filter
            await this.$store.dispatch({ type: 'loadQuests', filterBy: this.filterBy })
            this.randomQuestId = await  this.$store.dispatch({ type: 'getRandomQuest' })
            this.$router.push('/play/'+this.randomQuestId)
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