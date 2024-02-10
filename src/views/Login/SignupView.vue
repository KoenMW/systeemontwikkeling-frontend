<template>
    <div class="login-container">
      <div class="login-form">
        <h2 class="header">Sign Up</h2>
        <form @submit.prevent="signup">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required placeholder="Enter your name">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required placeholder="Enter your email">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required placeholder="Create a password">
          </div>
          <button type="submit" class="login-button">Sign Up</button>
        </form>
      </div>
    </div>
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
        // Implement your signup logic here
        console.log('Signing up:', this.name, this.email, this.password);
        // Typically, here you would send a request to your backend to register the user
      },
    },
  };
  </script>
    