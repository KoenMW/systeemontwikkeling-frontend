<template>
    <article class="restaurant-card">
      <section class="image-section">
        <img :src="image" alt="Restaurant image">
      </section>
      <section class="text-section">
        <h2>{{ title }}</h2>
        <p>{{ text }}</p>
      </section>
      <button class="reservation-button">Reservation</button>
    </article>
  </template>
  
  <script>
  export default {
    props: ['image', 'title', 'text']
  }
  </script>
  
  <style scoped>
  @import url(./restaurantCard.scss);
  </style>