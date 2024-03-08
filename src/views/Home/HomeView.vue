<script setup>
import Background from '@/components/background/BackgroundComponent.vue';
import HomeCard from '@/components/homeCard/HomeCard.vue';
import homeBanner from '@/components/icons/homeBanner.vue';
import backgroundImage from '@/assets/images/homebanner.png';
import jazzCard from '@/assets/images/jazzCard.png';
import historyCard from '@/assets/images/historyCard.png';
import foodCard from '@/assets/images/foodCard.png';
import danceCard from '@/assets/images/danceCard.png';
import AgendaComponent from '@/components/agenda/AgendaComponent.vue';
import { Event } from '@/models/event';


const events = [
    new Event(0, 'Jazz', 'Grote Markt', '2024-07-26', '2024-07-26', 25, 100, 'jazz'),
    new Event(1, 'History', 'Grote Markt', '2024-07-27', '2024-07-27', 25, 100, 'history'),
    new Event(2, 'Food', 'Grote Markt', '2024-07-28', '2024-07-28', 25, 0, 'music'),
    new Event(3, 'Dance', 'Grote Markt', '2024-07-27', '2024-07-27', 25, 100,'dance')
]
</script>

<template>
    <Background :image="backgroundImage"/>
    <section id="banner">
        <homeBanner />
        <p>Haarlem is buzzing with excitement for its upcoming Festival! Get ready for jazz sensations like Gare du Nord, Nordians, and Soul Six. Explore history through iconic landmarks: De Grote Kerk, De Hallen, De Grote Markt, Proveniershof, and more. Don't miss top restaurants like Tatsu Haarlem, Mano Restaurant, and the Zeeuw. Join the city's celebration—a fusion of jazz beats, historical tales, and culinary delights. Haarlem awaits your presence!</p>
    </section>

    <HomeCard
        :image="jazzCard"
        description="Discover the pulse of Haarlem Festival Jazz: an electric mix of Gumbo Kings' beats and Ntjam Rosie's entrancing neo-soul. Move to Wicked Jazz Sounds, bask in Jonna Frazer's vocals, and explore a vibrant spectrum of melodies. Join us in Haarlem for an unforgettable celebration of diverse jazz, where each note weaves into a symphony of musical brilliance, promising an experience that resonates long after the final chord."
    />
    <HomeCard
        :image="historyCard"
        description="Embark on a captivating journey through Haarlem's history with 'Haarlem Heritage Stroll: Unveiling the Past.' This 2.5-hour guided tour, available in English, Dutch, and Chinese, takes you from the iconic Church of St. Bavo to the lively Grote Markt. Join us from July 28th to July 31st for a truly immersive exploration of Haarlem's rich tapestry, where old-world charm meets modern delights."
        textBlack
        textRight
    />
    <HomeCard
        :image="foodCard"
        description="Delve into Haarlem's Yummie Event, an exquisite culinary celebration that tantalizes your taste buds! Experience an extensive array of flavorful adventures, ranging from exclusive restaurant menus crafted by top chefs to delightful home-cooked recipes. Immerse yourself in the vibrant and diverse food scene, capturing the true essence and spirit of our festival's culinary journey."
    />
    <HomeCard
      :image="danceCard"
      description="Experience the rhythm of Haarlem's dance festival, where the city's streets transform into a vibrant stage. Join us for a captivating celebration of dance, where the city's rich history and modern culture intertwine. From traditional folk dances to contemporary performances, Haarlem's dance festival promises an unforgettable experience for all."
      textRight
    />

    <AgendaComponent
        :agendaItems="events"
    />    
</template>

<style scoped>
@import './home.scss';
</style>