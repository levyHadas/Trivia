
<template>
  <sequential-entrance>
    <section @click="emitCategorySelection(category)">
      <li class="category-item">
        <h1></h1>
        <img class="category-img" :src="category.imgSrc">
        <div class="card-container">
          <p>{{category.name}}</p>
        </div>
      </li>
    </section>
  </sequential-entrance>
</template>

<script>
export default {
  props: {
    category: Object,
  },
  methods: {
    emitCategorySelection(category) {
      var filter = {}
      filter.category = category
      this.$emit('categorySelected', filter)
    },
  },
}
</script>

<style scoped>
.category-item {
  background-color: #f9f8f6;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1), 0 4px 7px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border-radius: 20px;
}
.category-item:hover {
  animation: nudge 0.4s linear;
}

.category-img {
  width: 200px;
  height: 160px;
  margin: 10px 10px 0 10px;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.card-container {
  text-align: center;
  padding: 10px 20px;
}

@keyframes nudge {
  0% {
    transform: rotate(-7deg);
  }

  33% {
    transform: rotate(7deg);
  }

  66% {
    transform: rotate(-7deg);
  }
}
</style>


