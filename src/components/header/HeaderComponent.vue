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
                <div class="header-image user"></div>
              </RouterLink>
              <div v-if="showUserDropdown" class="user-dropdown">
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/register">Register</RouterLink>
              </div>
            </div>
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
            <RouterLink to="/shop" class="header-link shop">
              <div class="header-image shop"></div>
            </RouterLink>
            <RouterLink to="/language" class="header-link">
              <div class="header-image language"></div>
            </RouterLink>
        </nav>
      </header>
  </body>
</template>

<style scoped>
@import './header.scss';
</style>
