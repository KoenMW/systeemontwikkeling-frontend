<!--
    author: @647825
-->

<template>
  <h2 class="header">Password Reset</h2>
  <form @submit.prevent="resetPassword" class="login-form">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required placeholder="Enter your email">
          <button type="submit" class="login-button">Send Reset Link</button>
  </form>
</template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
      };
    },
    methods: {
      resetPassword() {
        console.log('Reset password for:', this.email);
      },
    },
  };
  </script>

  