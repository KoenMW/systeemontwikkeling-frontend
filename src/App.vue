<script>
import HeaderComponent from './components/header/HeaderComponent.vue';
export default {
  components: {
    HeaderComponent
}
}
</script>
<template>
   <header>
      <HeaderComponent />
   </header>
   <main>
      <RouterView />
  </main>
</template>

<style scoped>
@import './assets/app.scss';
</style>