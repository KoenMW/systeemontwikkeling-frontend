<template>
    <bannerComponent :title="pageData.name" :description="pageData.intro" :image="pageData.picture" />

    <section id="cards">
        <CardComponent v-for="card in pageData.cards" :key="card.name" :title="card.title" :description="card.text" :image="card.picture" event="jazz"/>
    </section>
  
    <AgendaComponent :agendaItems="events" />
  
</template>

<script setup>
import bannerComponent from '@/components/banner/bannerComponent.vue';
import CardComponent from '@/components/card/CardComponent.vue';
import AgendaComponent from '@/components/agenda/AgendaComponent.vue';
import axios from 'axios';
import { Event } from '@/models/event';
</script>

<script>

export default {
    components: {
        bannerComponent,
        CardComponent,
        AgendaComponent
    },
    data() {
        return {
            pageData: {},
            events: []
        }
    },
    mounted() {
        axios.get(`${import.meta.env.VITE_API_URL}/pages/1`)
            .then(response => {
                this.pageData = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(`${import.meta.env.VITE_API_URL}/events/1`)
            .then(response => {
                response.data.forEach((event) => {
                    this.events.push(new Event(event.id, event.title, event.location, event.startTime, event.endTime, event.price, event.ticket_amount, event.eventType));
                });
            })
            .catch(error => {
                console.log(error);
            });
    },
}


</script>

<style scoped>
@import url(./jazz.scss);
</style>

