<template>
  <section class="category">
    <button @click="toggleTagsCloud(true)">Tags Filter</button>
    <tags-cloud
      v-if="tagsCloudShown"
      :tags="allTags"
      @tagsSelected="startGame"
      @closeTags="toggleTagsCloud(false)"
    />
    <br>
    <h1>Choose Crategory:</h1>
    <category-list :categories="allCategories" @categorySelected="startGame" :filter="filterBy"/>
  </section>
</template>

<script>
//when category s clicked it emites event updateCurrView('list')
import CategoryList from "@/components/CategoryList.vue";
import TagsCloud from "@/components/TagsCloud.vue";
import QuestService from "../services/QuestService.js";

export default {
  data() {
    return {
      quests: [],
      tagsCloudShown: false,
      filterBy: {
        category: "",
        tags: []
      }
    };
  },
  components: {
    CategoryList,
    TagsCloud
  },

  async created() {
    await this.$store.dispatch("loadFilterOptions");
  },

  methods: {
    toggleTagsCloud(cloudState) {
      this.tagsCloudShown = cloudState;
    },

    async startGame(filter) {
      this.filterBy = filter;
      await this.$store.dispatch({
        type: "loadQuests",
        filterBy: this.filterBy
      });
      this.randomQuestId = await this.$store.dispatch({
        type: "getRandomQuest"
      });
      this.$router.push("/play/" + this.randomQuestId);
    }
  },

  computed: {
    allCategories() {
      return this.$store.getters.filterOptions.categories;
    },

    allTags() {
      return this.$store.getters.filterOptions.tags;
    }
  },
  methods: {
    toggleTagsCloud(cloudState) {
      this.tagsCloudShown = cloudState;
    },

    async startGame(filter) {
      this.$router.push("/play/single");
    }
  }
};
</script>

<style scopped lang="scss">
.category {
  h1 {
    font-size: 30px;
    color:black;
  }
}
</style>