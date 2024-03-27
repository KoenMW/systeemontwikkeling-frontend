<!--
    author: @LukoGi
-->
<template>
    <section class="slider">
      <button @click="prevSlide"><</button>
      <article v-for="(recipe, index) in recipes" :key="index" :class="{ active: index === currentSlide }" class="slide" :style="{ backgroundImage: `url(${recipe.image})` }">
        <p>{{ recipe.text }}</p>
      </article>
      <button @click="nextSlide">></button>
    </section>
</template>
  
<script>
  export default {
    props: {
      recipes: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        currentSlide: 0,
      };
    },
    methods: {
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.recipes.length;
      },
      prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.recipes.length) % this.recipes.length;
      },
    },
  };
</script>
  
<style scoped>
@import url(./recipeSlider.scss);
</style>