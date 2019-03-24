<template>
    <section>
        <button @click="toggleTagsCloud(true)">Tags Filter</button>
        <tags-cloud
            v-if="tagsCloudShown"
            :tags="allTags"
            @tagsSelected="startGame"
            @closeTags="toggleTagsCloud(false)"/>
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
            this.$router.push('/play/single')
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