<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import jazzHeader from '@/assets/images/Jazzheader.png';
import danceHeader from '@/assets/images/Danceheader.png';
import yummyHeader from '@/assets/images/Yummyheader.png';
import homeHeader from '@/assets/images/Homeheader.png';
import historyHeader from '@/assets/images/Historyheader.png';
import shopHeader from '@/assets/images/Shopheader.png';

import userHeader from '@/assets/images/Userheader.png';
import languageHeader from '@/assets/images/Languageheader.png';

const showUserDropdown = ref(false);
</script>

<template>
  <body>
    <div id="app">
      <header class="header">
        <nav>
          <div class="links-container">
            <div class="user-container">
              <RouterLink to="/user" class="header-link user" @click.prevent="showUserDropdown = !showUserDropdown">
                <img :src="userHeader" alt="User" class="header-image small" />
              </RouterLink>
              <div v-if="showUserDropdown" class="user-dropdown">
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/register">Register</RouterLink>
              </div>
            </div>
            <RouterLink to="/dance" class="header-link dance">
              <img :src="danceHeader" alt="Dance" class="header-image" />
            </RouterLink>
            <RouterLink to="/jazz" class="header-link jazz">
              <img :src="jazzHeader" alt="Jazz" class="header-image" />
            </RouterLink>
            <RouterLink to="/yummy" class="header-link yummy">
              <img :src="yummyHeader" alt="Yummy" class="header-image" />
            </RouterLink>
            <RouterLink to="/" class="header-link home">
              <img :src="homeHeader" alt="Home" class="header-image" />
            </RouterLink>
            <RouterLink to="/history" class="header-link history">
              <img :src="historyHeader" alt="History" class="header-image" />
            </RouterLink>
            <RouterLink to="/shop" class="header-link shop">
              <img :src="shopHeader" alt="Shop" class="header-image" />
            </RouterLink>
            <RouterLink to="/language" class="header-link language">
              <img :src="languageHeader" alt="Language" class="header-image small" />
            </RouterLink>
          </div>
        </nav>
      </header>
    </div>
  </body>
</template>

<style scoped>
@import './header.scss';
</style>