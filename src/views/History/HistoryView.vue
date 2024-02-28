<template>
    <banner title="Stroll through history"
        description="Embark on a captivating journey through Haarlem's history with 'Haarlem Heritage Stroll: Unveiling the Past.' This 2.5-hour guided tour, available in English, Dutch, and Chinese, takes you from the iconic Church of St. Bavo to the lively Grote Markt. Join us from July 28th to July 31st for a truly immersive exploration of Haarlem's rich tapestry, where old-world charm meets modern delights."
        :image="bannerPicture" />
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
    <div class="cards-container">
        <Card v-for="event in sights" :key="event.id" :image="event.image" :title="event.title"
            :description="event.description" event="history" />
    </div>
    <h2>Book Your Journey</h2>
    <AgendaComponent
        :agendaItems="events"
    />    
</template>
<script setup>
import banner from '@/components/banner/bannerComponent.vue';
import bannerPicture from '@/assets/images/history/history-banner.png';
import Card from '@/components/card/CardComponent.vue';
import event1Image from '@/assets/images/history/card1.png';
import event2Image from '@/assets/images/history/card2.png';
import event3Image from '@/assets/images/history/card3.png';
import AgendaComponent from '@/components/agenda/AgendaComponent.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { Event } from '@/models/event';

const events = [
    new Event(0, 'History', 'Grote Markt', '2024-07-26', '2024-07-26', 17.5, 100, 'history'),
    new Event(1, 'History', 'Grote Markt', '2024-07-27', '2024-07-27', 17.5, 100, 'history'),
    new Event(2, 'History', 'Grote Markt', '2024-07-28', '2024-07-28', 17.5, 0, 'history')
];

const sights = [
{ id: 1, title: 'Event 1', description: 'Description for Event 1', image: event1Image },
  { id: 2, title: 'Event 2', description: 'Description for Event 2', image: event2Image },
  { id: 3, title: 'Event 3', description: 'Description for Event 3', image: event3Image },
];
// for when the database is ready
onMounted(async () => {
    try {
        const response = await axios.get('/api/events');
        events.value = response.data.slice(0, 9);
    } catch (error) {
        console.error("Failed to fetch events", error);
    }
});
</script>
<style scoped>
@import './history.scss';
</style>
