<template>
    <div class="login-container">
      <div class="login-form">
        <h2>Reset Password</h2>
        <form @submit.prevent="resetPassword">
          <div class="form-group">
            <label for="reset-email">Email address</label>
            <input type="email" id="reset-email" v-model="email" required placeholder="Enter your email">
          </div>
          <button type="submit" class="login-button">Send Reset Link</button>
        </form>
      </div>
    </div>
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

  