<template>
        <h2 class="header">Sign Up</h2>
        <form @submit.prevent="signup" class="login-form">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required placeholder="Enter your name">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required placeholder="Enter your email">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required placeholder="Create a password">
          <button type="submit" class="login-button">Sign Up</button>
        </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      signup() {
        console.log('Signing up:', this.name, this.email, this.password);
      },
    },
  };
  </script>
    