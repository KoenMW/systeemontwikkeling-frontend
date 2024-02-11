<template>
  <form @submit.prevent="resetPassword" class="login-form">
    <h2>Reset Password</h2>
    <label for="reset-email" class="form-group">Email address</label>
      <input type="email" id="reset-email" v-model="email" required placeholder="Enter your email">
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

  