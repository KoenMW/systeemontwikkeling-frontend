<template>
    <section :class="['card', event ?? '']">
        <img :src="image" :alt="title" />
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <slot></slot>
    </section>
</template>

<script>

export default {
    props: {
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        event: {
            type: String,
            required: false
        },
    }

</script>

<style scoped>
@import './card.scss';
</style>../../models/eventValidator