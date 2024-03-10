<template>
  <header id="header">
    <div class="header-dropdown" @mouseover="showDropdown('user')" @mouseleave="hideDropdown('user')">
      <div class="header-image user">User</div>
      <div v-if="dropdownVisible.user" class="dropdown-content">
        <div v-if="authStore.isLoggedIn">
          <RouterLink to="/account">Account Info</RouterLink>
          <RouterLink to="/" @click="logout">Logout</RouterLink>
        </div>
        <div v-else>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/signup">Register</RouterLink>
        </div>
      </div>
    </div>
    <RouterLink to="/dance" class="header-link header-image dance">Dance 
    </RouterLink>
    <RouterLink to="/jazz" class="header-link header-image jazz">Jazz
    </RouterLink>
    <RouterLink to="/yummy" class="header-link header-image yummy">Yummy
    </RouterLink>
    <RouterLink to="/" class="header-link header-image home">Home
    </RouterLink>
    <RouterLink to="/history" class="header-link header-image history">History
    </RouterLink>
    <RouterLink to="/shop" class="header-link header-image shop">Shop
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
import { RouterLink, useRouter} from 'vue-router'
import { useAuthStore } from '../../stores/auth.js';

const authStore = useAuthStore()
const router = useRouter()

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
const logout = () => {
  localStorage.removeItem('jwt');
  authStore.logout() 
  router.push('/login')
}

</script>

<style scoped>
@import './header.scss';
</style>
