<script setup>
import Ingredients from '@/assets/images/Yummy/home/ingredients.png';
import Mano from '@/assets/images/Yummy/home/mano.png';
import Pan from '@/assets/images/Yummy/home/pan.png';
import Plate from '@/assets/images/Yummy/home/plate.png';
import RestaurantOne from '@/assets/images/Yummy/home/restaurantOne.png';
import RestaurantTwo from '@/assets/images/Yummy/home/restaurantTwo.png';
import Tatsu from '@/assets/images/Yummy/home/tatsu.png';
import Zeeuw from '@/assets/images/Yummy/home/zeeuw.png';
import Fork from '@/assets/images/Yummy/fork.png';
import Knife from '@/assets/images/Yummy/knife.png';
import Star from '@/assets/images/Yummy/star.png';
import RestaurantCard from '@/components/restaurantCard/RestaurantCard.vue';
import { Event } from '@/models/event';

const restaurants = [
  { image: Tatsu, title: 'Tatsu Haarlem', text: 'At Tatsu Haarlem, you can enjoy a delightful all-you-can-eat lunch and dinner seven days a week. Come by and get two hours of unlimited access to our delicious sushi and modern Japanese cuisine.', rating : 4},
  { image: Mano, title: 'Mano Restaurant', text: 'Meet Kevin Kion and Daniël Damen, the culinary force behind Mano. Our menu blends global street food influences with French finesse. Join our 15-year flavorful journey today! ', rating : 5},
  { image: Zeeuw, title: 'Restaurant De Zeeuw', text: 'Discover Restaurant De Zeeuws artisanal touch, offering a sustainable dining experience with locally sourced seasonal delights, curated by skilled chefs.', rating : 5},
];

</script>

<template>
    <main class="centered-container">
        <section class="top-section">
            <img class="fork" :src="Fork" alt="Fork image">
            <img class="plate" :src="Plate" alt="Plate image">
            <img class="knife" :src="Knife" alt="Knife image">
        </section>

        <section class="restaurant-icons-section">
            <img class="restaurant-icon-left" :src="RestaurantOne" alt="Restaurant One image">
            <img class="restaurant-icon-right" :src="RestaurantTwo" alt="Restaurant Two image">
        </section>

        <section class="restaurant-cards-section">
            <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.title" :image="restaurant.image" :title="restaurant.title" :text="restaurant.text" :rating="restaurant.rating"/>
        </section>

        <section class="homerecipes-icons-section">
            <img class="ingredients-icon" :src="Ingredients" alt="Ingredients image">
            <img class="pan-icon" :src="Pan" alt="Pan image">
        </section>
    </main>
</template>

<style scoped>
@import url(./yummy.scss);
</style>