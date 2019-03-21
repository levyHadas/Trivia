<template>
    <section>
        <router-link :to="'/play/'+quest._id">
            <li class="quest-item">
                <h1>{{quest.txt}}</h1>
            </li>
        </router-link>
    </section>
</template>

<script>
export default {
    props: {
        quest: Object
    },
}
</script>

<style scopped>
    .quest-item{
        width: 100px;
        height: 100px;
        /* background-image:  */
        background-color: silver;
        padding: 20px;
        margin: 20px;
    }
</style>