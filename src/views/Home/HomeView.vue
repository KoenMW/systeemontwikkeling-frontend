<script setup>
import Background from '@/components/background/BackgroundComponent.vue';
import HomeCard from '@/components/homeCard/HomeCard.vue';
import homeBanner from '@/components/icons/homeBanner.vue';
import backgroundImage from '@/assets/images/homebanner.png';
import jazzCard from '@/assets/images/jazzCard.png';
import historyCard from '@/assets/images/historyCard.png';
import foodCard from '@/assets/images/foodCard.png';
import AgendaItem from '@/components/agendaItem/AgendaItem.vue';
</script>

<template>
    <AgendaItem
        eventName="Haarlem Festival Jazz"
        location="Grote Markt, Haarlem"
        startDate="July 28th, 2022"
        endDate="July 31st, 2022"
        :price="25"
        :ticketsAvailable="100"
        event="jazz"
    />
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

    
</template>

<style scoped>
@import url(./home.scss);
</style>
