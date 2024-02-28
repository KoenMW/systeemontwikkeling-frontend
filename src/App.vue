<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/yummy">Yummy</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/history">History</RouterLink>
      </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
@import './assets/app.scss';
</style>
