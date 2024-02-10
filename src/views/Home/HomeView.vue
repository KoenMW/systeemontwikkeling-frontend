<script setup>
import Card from '@/components/card/CardComponent.vue';
import Background from '@/components/background/BackgroundComponent.vue';
import HomeCard from '@/components/homeCard/HomeCard.vue';
import homeBanner from '@/components/icons/homeBanner.vue';
import backgroundImage from '@/assets/images/homebanner.png';
import jazzCard from '@/assets/images/jazzCard.png';
</script>

<template>
    <Background :image="backgroundImage"/>
    <section id="header">
        <homeBanner />
        <p>Haarlem is buzzing with excitement for its upcoming Festival! Get ready for jazz sensations like Gare du Nord, Nordians, and Soul Six. Explore history through iconic landmarks: De Grote Kerk, De Hallen, De Grote Markt, Proveniershof, and more. Don't miss top restaurants like Tatsu Haarlem, Mano Restaurant, and the Zeeuw. Join the city's celebration—a fusion of jazz beats, historical tales, and culinary delights. Haarlem awaits your presence!</p>
    </section>

    <HomeCard
        :image="jazzCard"
        description="Discover the pulse of Haarlem Festival Jazz: an electric mix of Gumbo Kings' beats and Ntjam Rosie's entrancing neo-soul. Move to Wicked Jazz Sounds, bask in Jonna Frazer's vocals, and explore a vibrant spectrum of melodies. Join us in Haarlem for an unforgettable celebration of diverse jazz, where each note weaves into a symphony of musical brilliance, promising an experience that resonates long after the final chord."
    />
    <Card
      image="https://via.placeholder.com/300"
      title="Card Title"
      description="Card Description"
      event="history"
    />
    <Card
      image="https://via.placeholder.com/300"
      title="Card Title 2"
      description="Card Description 2"
      event="music"
    />
    <Card
      image="https://via.placeholder.com/300"
      title="Card Title 3"
      description="Card Description 3"
      event="jazz"
    />
</template>

<style scoped>
@import url(./home.scss);
</style>
