<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="header">Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
          <router-link to="/forget-password" class="forgot-password">Forgot password?</router-link>
        </div>
        <button type="submit" class="login-button">Login</button>
        <p class="signup-text">Don’t have an account? <router-link to="/signup" class="signup-link">Sign up</router-link></p>
      </form>
    </div>
  </div>
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
  