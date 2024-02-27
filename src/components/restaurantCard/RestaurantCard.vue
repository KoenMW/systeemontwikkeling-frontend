<template>
    <article class="restaurant-card">
      <img :src="image" alt="Restaurant image">
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
      <span>{{ rating }}</span>
      <img class="star" :src="Star" alt="Star image">
      <button class="reservation-button">Reservation</button>
    </article>
  </template>
  
<script>
import Star from '@/assets/images/Yummy/star.png';

export default {
  props: ['image', 'title', 'text', 'rating'],
  data() {
    return {
      Star: Star
    }
  }
}
</script>
  
  <style scoped>
  @import url(./restaurantCard.scss);
  </style>