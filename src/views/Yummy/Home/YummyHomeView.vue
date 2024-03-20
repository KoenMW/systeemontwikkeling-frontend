<template>
    <main class="centered-container">
        
        <bannerComponent :description="pageData.intro"/>

        <section class="restaurant-icons-section">
            <img class="restaurant-icon-left" :src="RestaurantOne" alt="Restaurant One image">
            <img class="restaurant-icon-right" :src="RestaurantTwo" alt="Restaurant Two image">
        </section>

        <section class="restaurant-cards-section">
            <CardComponent v-for="card in pageData.cards" :key="card.name" :title="card.title" :description="card.text" :image="card.picture" event="yummy"/>
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

<script setup>
import Ingredients from '@/assets/images/Yummy/home/ingredients.svg';
import Pan from '@/assets/images/Yummy/home/pan.svg';
import Tatsu from '@/assets/images/Yummy/home/tatsu.png';
import Zeeuw from '@/assets/images/Yummy/home/zeeuw.png';
import RestaurantOne from '@/assets/images/Yummy/home/restaurantOne.svg';
import RestaurantTwo from '@/assets/images/Yummy/home/restaurantTwo.svg';
import RecipeSlider from '@/components/recipeSlider/RecipeSlider.vue';
import axios from 'axios';
import bannerComponent from '@/components/banner/bannerComponent.vue';
import CardComponent from '@/components/card/CardComponent.vue';

const recipes = [
  { image: Tatsu, text: 'Recipe 1 text...' },
  { image: Zeeuw, text: 'Recipe 2 text...' },
];

</script>

<script>

export default {
    components: {
        bannerComponent,
        CardComponent
    },
    data() {
        return {
            pageData: {},
        }
    },
    mounted() {
        axios.get(`${import.meta.env.VITE_API_URL}/pages/3`)
            .then(response => {
                this.pageData = response.data;
                console.log((response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>

<style scoped>
@import url(./yummyhome.scss);
</style>