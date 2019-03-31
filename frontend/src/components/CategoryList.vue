<template>
  <section>
    <ul class="category-container">
      <category-preview
        v-for="(category,idx) in categories"
        :key="idx"
        :category="category"
        @categorySelected="emitSelection"
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
    emitSelection(filter) {
      this.$emit("categorySelected", filter);
    }
  }
};
</script>

<style scoped>
.category-container {
  margin: 30px 0;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(220px, 220px));;
  grid-gap: 40px;
}
</style>
