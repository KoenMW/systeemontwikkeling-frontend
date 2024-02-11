<template>
      <h2 class="header">Login</h2>
      <form @submit.prevent="login" class="login-form">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required placeholder="Enter your email">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required placeholder="Enter your password">
          <router-link to="/forget-password" class="forgot-password">Forgot password?</router-link>
        <button type="submit" class="login-button">Login</button>
        <p class="signup-text">Don’t have an account? <router-link to="/signup" class="signup-link">Sign up</router-link></p>
      </form>
</template>
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      login() {
        console.log('Email:', this.email);
        console.log('Password:', this.password);
      },
    },
  };
  </script>
  
  <style>
  @import './login.scss';
  </style>
  