
<template>
  <sequential-entrance>
    <section @click="$emit('categorySelected')">
      <li class="category-item">
        <h1></h1>
        <img class="category-img" :src="category.imgSrc" alt>
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
    category: Object
  }
};
</script>

<style scopped>
.category-item {
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 10px;
  cursor: pointer;
  border-radius: 40px;
}
.category-item:hover {
  animation: nudge 0.4s linear;
}

.category-img {
  width: 200px;
  height: 160px;
  margin: 10px 10px 0 10px;
  object-fit: cover;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
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


