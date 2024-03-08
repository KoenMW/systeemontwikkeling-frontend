<template>
  <banner
    title="Dance into the Night"
    description="Get ready to groove with Harwel, Martin Garrix, and Tiesto in the ultimate dance extravaganza! Join us for electrifying beats and non-stop fun from August 15th to August 18th in Amsterdam. This high-energy event promises to keep you on your feet all night long."
    :image="bannerPicture"
  />
  <h2>Performers</h2>
  <div class="cards-container">
    <Card
      v-for="performer in performers"
      :key="performer.id"
      :image="performer.image"
      :title="performer.title"
      :description="performer.description"
      event="dance"
    />
  </div>
  <div class="background-picture">
    <section class="body-text">
      <h3>Flexible Schedule</h3>
      <p>
        Choose from multiple departure times on each event day to suit your schedule. Dance the
        night away as we explore the vibrant nightlife of Amsterdam and immerse ourselves in the
        pulsating rhythm of the city.
      </p>
    </section>

    <section class="body-text">
      <h3>International Vibes</h3>
      <p>
        Experience the thrill of the dance scene with DJs from around the globe. Whether you're a
        fan of Harwel's energetic beats, Martin Garrix's chart-topping hits, or Tiesto's legendary
        mixes, this event promises a diverse and electrifying lineup.
      </p>
    </section>

    <section class="body-text">
      <h3>Party for Everyone</h3>
      <p>
        This event is for all dance enthusiasts, regardless of age. Join us for an unforgettable
        journey through the world of electronic music, where every beat resonates with boundless
        energy and excitement.
      </p>
    </section>
  </div>
  <h2>Book Your Tickets</h2>
  <AgendaComponent :agendaItems="events" />
</template>
<script setup>
import banner from '@/components/banner/bannerComponent.vue'
import bannerPicture from '@/assets/images/dance/dance-banner.png'
import Card from '@/components/card/CardComponent.vue'
import AgendaComponent from '@/components/agenda/AgendaComponent.vue'
import performers1Image from '@/assets/images/dance/performer1.png'
import performers2Image from '@/assets/images/dance/performer2.png'
import performers3Image from '@/assets/images/dance/performer3.png'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { Event } from '@/models/event'
const events = [
  new Event(0, 'Dance', 'Lichtfabriek', '2024-07-27', '2024-07-26', 17.5, 100, 'dance'),
  new Event(1, 'Dance', 'Club Stalker', '2024-07-28', '2024-07-27', 17.5, 100, 'dance'),
  new Event(2, 'Dance', 'Openluchttheater', '2024-07-29', '2024-07-28', 17.5, 0, 'dance')
]
const performers = [
  {
    id: 1,
    title: 'Hardwel',
    description:
      'Experience the electrifying energy of Harwel as he takes the stage with his signature beats.',
    image: performers1Image
  },
  {
    id: 2,
    title: 'Martin Garrix',
    description:
      'Join Martin Garrix for an unforgettable performance filled with chart-topping hits and infectious melodies.',
    image: performers2Image
  },
  {
    id: 3,
    title: 'Tiesto',
    description:
      'Get ready to dance till dawn with Tiesto as he delivers a legendary set that will keep you moving all night long.',
    image: performers3Image
  }
]

// for when the database is ready
onMounted(async () => {
  try {
    const response = await axios.get('/api/events')
    events.value = response.data.slice(0, 9)
  } catch (error) {
    console.error('Failed to fetch events', error)
  }
})
</script>
<style scoped>
@import './dance.scss';
</style>
