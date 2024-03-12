<template>
  <div>
    <input type="email" v-model="email" placeholder="Enter your email">
    <button @click="resetPassword">Reset Password</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from '../../axios-auth.js';

export default {
  data() {
    return {
      email: '',
      message: ''
    };
  },
  methods: {
    resetPassword() {
      axios.post('/password/reset', { email: this.email })
        .then(response => {
          this.message = response.data.message;
        })
        .catch(error => {
          this.message = error.response.data.message;
        });
    }
  },
};
</script>
