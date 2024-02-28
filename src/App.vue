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
   <div id="app">
      <HeaderComponent />
      <CardComponent />
   </div>
   <main>
      <RouterView />
  </main>
</template>

<style scoped>
@import './assets/app.scss'
</style>
