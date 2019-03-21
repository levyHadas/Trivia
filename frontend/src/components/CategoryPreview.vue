
<template>
    <section @click="$emit('categorySelected')">
        <li class="category-item">
            <h1>{{category}}</h1>
        </li>
    </section>
</template>

<script>
export default {
    props: {
        category: String
    },
}
</script>

<style scopped>
    .category-item{
        width: 100px;
        height: 100px;
        /* background-image:  */
        background-color: silver;
        padding: 20px;
        margin: 20px;
    }
</style>


