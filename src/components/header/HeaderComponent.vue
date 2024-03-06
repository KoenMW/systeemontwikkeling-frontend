<template>
  <header>
    <div class="header-dropdown" @mouseover="showDropdown('user')" @mouseleave="hideDropdown('user')">
      <div class="header-image user">User</div>
      <div v-if="dropdownVisible.user" class="dropdown-content">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/signup">Register</RouterLink>
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
    <RouterLink to="/shop" class="header-link">
      <div class="header-image shop">Shop</div>
    </RouterLink>
    <div class="header-dropdown" @mouseover="showDropdown('language')" @mouseleave="hideDropdown('language')">
      <div class="header-image language">Language</div>
      <div v-if="dropdownVisible.language" class="dropdown-content">
        <div>SP</div>
        <div>EN</div>
        <div>FR</div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const dropdownVisible = ref({
  user: false,
  language: false
})

const showDropdown = (type) => {
  dropdownVisible.value[type] = true
}

const hideDropdown = (type) => {
  dropdownVisible.value[type] = false
}
</script>

<style scoped>
@import './header.scss';
</style>
