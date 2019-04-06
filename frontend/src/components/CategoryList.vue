<template>
  <section>
    <ul class="category-container"
      :class="{'scale-down': isMenuOpen}">
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
  },
  computed: {
    isMenuOpen () {
      return this.$store.getters.isMenuOpen
    }
  }	  
};
</script>

<style scoped>
  h1 {
    font-size: 30px;
    color:black;
  }
.category-container {
  padding: 30px; 
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(220px, 220px));
  grid-gap: 40px;
}
</style>
