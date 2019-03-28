<template>
  <section>
    <ul class="category-container">
      <category-preview
        v-for="(category,idx) in categories"
        :key="idx"
        :category="category"
        @categorySelected="emitSelection(category.name)"
      />
    </ul>
  </section>
</template>

<script>
import CategoryPreview from "@/components/CategoryPreview.vue";

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
    emitSelection(categoryName) {
      const filter = {
        category: categoryName,
        tags: []
      };
      this.$emit("categorySelected", filter);
    }
  }
};
</script>

<style scoped>
.category-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-wrap: wrap;
}
</style>
