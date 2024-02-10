<template>
    <section :class="['card', event ?? '']">
        <img :src="image" :alt="title" />
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
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
            validator: (value) => {
                if (!['history', 'jazz', 'music'].includes(value)) {console.error('Invalid event type'); return false;}
                else return true;
            },            
        },
    }
}

</script>

<style scoped>
@import './card.scss';
</style>