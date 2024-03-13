<template>
  <div>
    <h2 class="header">Reset Password</h2>
    <form @submit.prevent="resetPassword" class="reset-password-form">
      <label for="password">New Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
        placeholder="Enter your new password"
      />
      <label for="confirm-password">Confirm Password:</label>
      <input
        type="password"
        id="confirm-password"
        v-model="confirmPassword"
        required
        placeholder="Confirm your new password"
      />
      <button type="submit" class="reset-password-button">Reset Password</button>
    </form>
  </div>
</template>

<script>
import axios from '../../axios-auth'

export default {
  data() {
    return {
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    resetPassword() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match')
        return
      }

      const token = this.$route.query.token
      axios
        .put('/reset-password?token=' + token, {
          password: this.password
        })
        .then((response) => {
          alert('Password reset successful')
          this.$router.push('/login')
        })
        .catch((error) => {
          console.error('Password reset error:', error)
          alert('Failed to reset password')
        })
    }
  }
}
</script>

<style></style>
