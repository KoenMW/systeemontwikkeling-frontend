<template>
    <section class="card">
        <img :src="image" :alt="title" />
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
    </section>
</template>

<script>
export default {
    props: {
        image: String,
        title: String,
        description: String
    }
}
</script>

<style scoped>
@import './card.scss';
</style>