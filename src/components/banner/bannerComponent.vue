<template>
    <section class="banner">
        <div class="text-content">
            <h2>{{ title }}</h2>
            <p>{{ description }}</p>
        </div>
            <img :src="image" :alt="title" v-if="image"/>
    </section>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }
}

</script>
<style scoped>
@import './banner.scss';
</style>
