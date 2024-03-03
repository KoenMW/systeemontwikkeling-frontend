<template>
  <div class="header-container">
    <RouterLink to="/user" class="header-link">
      <div class="header-image user">User</div>
    </RouterLink>
    <RouterLink to="/dance" class="header-link">
      <div class="header-image dance">Dance</div>
    </RouterLink>
    <RouterLink to="/jazz" class="header-link">
      <div class="header-image jazz">Jazz</div>
    </RouterLink>
    <RouterLink to="/yummy" class="header-link">
      <div class="header-image yummy">Yummy</div>
    </RouterLink>
    <RouterLink to="/" class="header-link">
      <div class="header-image home">Home</div>
    </RouterLink>
    <RouterLink to="/history" class="header-link">
      <div class="header-image history">History</div>
    </RouterLink>
    <RouterLink to="/shop" class="header-link">
      <div class="header-image shop">Shop</div>
    </RouterLink>
    <RouterLink to="/language" class="header-link">
      <div class="header-image language">Language</div>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
@import './header.scss';
</style>
