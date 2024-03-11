<template>
        <bannerComponent :title="pageData.name" :description="pageData.intro" :image="pageData.picture" />
    <div class="background-picture">
        <section class="body-text">
            <h3>Flexible Departures</h3>
            <p>Available on Tuesdays, Fridays, and Saturdays, our tours provide multiple departure times each day for
                your convenience. Discover the magic of history ranging from the city's earliest Church to its most
                iconic landmarks that echo tales of the past.</p>
        </section>

        <section class="body-text">
            <h3>Multilingual Experience</h3>
            <p>Immerse yourself in the enriching tales of the city brought to life in English, Dutch, and Chinese to
                cater to diverse audiences.</p>
        </section>

        <section class="body-text">
            <h3>Adventure for All Ages</h3>
            <p>Join us and we'll weave you into an experience where past adventures resonate with shared vitality. It's
                a journey made to be relished by any age with our engaging narrative, rich in detail, channeled within
                the ebb and flow of a captivating town.</p>
        </section>
    </div>
    <h2>Sights</h2>
    <section id="cards">
        <CardComponent v-for="card in pageData.cards" :key="card.name" :title="card.title" :description="card.text" :image="card.picture" event="jazz"/>
    </section>
    <h2>Book Your Journey</h2>
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
        axios.get(`${import.meta.env.VITE_API_URL}/pages/2`)
            .then(response => {
                this.pageData = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(`${import.meta.env.VITE_API_URL}/events/2`)
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
@import './history.scss';
</style>
