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

<style scopped>
.category-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-wrap: wrap;
}
</style>
