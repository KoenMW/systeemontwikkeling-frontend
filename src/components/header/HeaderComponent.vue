<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const showUserDropdown = ref(false);
</script>

<template>
  <body>
      <header class="header">
        <nav>
            <div class="user-container">
              <RouterLink to="/user" class="header-link user" @click.prevent="showUserDropdown = !showUserDropdown">
                <div class="header-image"></div>
              </RouterLink>
              <div v-if="showUserDropdown" class="user-dropdown">
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/register">Register</RouterLink>
              </div>
            </div>
            <RouterLink to="/dance" class="header-link dance">
              <div class="header-image"></div>
            </RouterLink>
            <RouterLink to="/jazz" class="header-link jazz">
              <div class="header-image"></div>
            </RouterLink>
            <RouterLink to="/yummy" class="header-link yummy">
              <div class="header-image"></div>
            </RouterLink>
            <RouterLink to="/" class="header-link home">
              <div class="header-image"></div>
            </RouterLink>
            <RouterLink to="/history" class="header-link history">
              <div class="header-image"></div>
            </RouterLink>
            <RouterLink to="/shop" class="header-link shop">
              <div class="header-image"></div>
            </RouterLink>
            <RouterLink to="/language" class="header-link language">
              <div class="header-image"></div>
            </RouterLink>
        </nav>
      </header>
  </body>
</template>

<style scoped>
@import './header.scss';
</style>
