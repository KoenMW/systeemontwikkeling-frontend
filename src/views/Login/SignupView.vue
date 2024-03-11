<template>
        <h2 class="header">Sign Up</h2>
        <form @submit.prevent="signup" class="login-form">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required placeholder="Enter your email">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required placeholder="Create a password">
          <button type="submit" class="login-button">Sign Up</button>
        </form>
  </template>
  
  <script>
  import axios from '../../axios-auth.js';
  export default {
    data() {
      return {
        email: '',
        password: '',
        role: 0,
      };
    },
    methods: {
      signup() {
        if (this.email && this.password) {
          axios.post('users/signUp', {
            email: this.email,
            password: this.password,
            role: this.role,
          })
            .then((response) => {
              if (response.status === 200) { 
              this.$router.push('/login');
            } else {
              console.log("Signup was not successful. Please try again.");
            }
          })
          .catch((error) => {
            console.error("An error occurred during signup:", error);
          });
        }
      },
    },
  };
  </script>
    