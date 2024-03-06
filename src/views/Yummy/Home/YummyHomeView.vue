<script setup>
import Ingredients from '@/assets/images/Yummy/home/ingredients.svg';
import Mano from '@/assets/images/Yummy/home/mano.png';
import Pan from '@/assets/images/Yummy/home/pan.svg';
import Plate from '@/assets/images/Yummy/home/plate.png';
import RestaurantOne from '@/assets/images/Yummy/home/restaurantOne.svg';
import RestaurantTwo from '@/assets/images/Yummy/home/restaurantTwo.svg';
import Tatsu from '@/assets/images/Yummy/home/tatsu.png';
import Zeeuw from '@/assets/images/Yummy/home/zeeuw.png';
import Fork from '@/assets/images/Yummy/fork.svg';
import Knife from '@/assets/images/Yummy/knife.svg';
import RestaurantCard from '@/components/restaurantCard/RestaurantCard.vue';
import RecipeSlider from '@/components/recipeSlider/RecipeSlider.vue';

const restaurants = [
  { image: Tatsu, title: 'Tatsu Haarlem', description: 'At Tatsu Haarlem, you can enjoy a delightful all-you-can-eat lunch and dinner seven days a week. Come by and get two hours of unlimited access to our delicious sushi and modern Japanese cuisine.', rating : 4, route : 'yummydetail'},
  { image: Mano, title: 'Mano Restaurant', description: 'Meet Kevin Kion and Daniël Damen, the culinary force behind Mano. Our menu blends global street food influences with French finesse. Join our 15-year flavorful journey today! ', rating : 5, route : 'yummydetail'},
  { image: Zeeuw, title: 'Restaurant De Zeeuw', description: 'Discover Restaurant De Zeeuws artisanal touch, offering a sustainable dining experience with locally sourced seasonal delights, curated by skilled chefs.', rating : 5, route : 'yummydetail'},
];

const recipes = [
  { image: Tatsu, text: 'Recipe 1 text...' },
  { image: Zeeuw, text: 'Recipe 2 text...' },
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
            <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.title" :image="restaurant.image" :title="restaurant.title" :description="restaurant.description" :rating="restaurant.rating" :route="restaurant.route"/>
        </section>

        <section class="homerecipes-icons-section">
            <img class="ingredients-icon" :src="Ingredients" alt="Ingredients image">
            <img class="pan-icon" :src="Pan" alt="Pan image">
        </section>

        <section class="homerecipes-slider-section">
            <RecipeSlider :recipes="recipes" />
        </section>
    </main>
</template>

<style scoped>
@import url(./yummyhome.scss);
</style>