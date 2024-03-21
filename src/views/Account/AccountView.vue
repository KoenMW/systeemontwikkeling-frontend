<template>
    <div class="account-view" v-if="user">
      <img :src="user.img" alt="Profile Picture">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Phone Number: {{ user.phoneNumber }}</p>
      <p>Address: {{ user.address }}</p>
      <p>Password: ********</p>
    </div>
    <div v-else>Loading...</div>
  </template>
  
  <script>
  import axios from 'axios';
  import { jwtDecode } from "jwt-decode";
  
  export default {
    name: 'AccountView',
    data() {
      return {
        user: null,
      };
    },
    async mounted() {
      const token = localStorage.getItem('jwt');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.data.id;
  
      try {
        const response = await axios.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Your CSS styles go here */
  </style>