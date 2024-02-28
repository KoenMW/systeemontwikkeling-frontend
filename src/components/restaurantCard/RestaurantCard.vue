<template>
  <Card class="restaurant-card" :image="image" :title="title" :description="description">
    <span>{{ rating }}</span>
    <img class="star" :src="Star" alt="Star image">
    <button class="reservation-button">Reservation</button>
  </Card>
</template>

<script>
import Star from '@/assets/images/Yummy/star.png';
import Card from '@/components/card/CardComponent.vue';

export default {
  components: {
    Card
  },
  props: ['image', 'title', 'description', 'rating'],
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