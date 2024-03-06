<script>
import { RouterLink, RouterView } from 'vue-router';

import CardComponent from './components/card/CardComponent.vue';
import HeaderComponent from './components/header/HeaderComponent.vue';
export default {
  components: {
    HeaderComponent,
    CardComponent
}
}
</script>
<template>
   <header>
      <HeaderComponent />
      <CardComponent />
   </header>
   <main>
      <RouterView />
  </main>
</template>

<style scoped>
@import './assets/app.scss';
</style>