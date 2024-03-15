<template>
  <div class="user-management">
    <div class="filters">
      <input v-model="searchQuery" @input="fetchUsers" placeholder="Search users..." class="search-input">
      <select v-model="filterRole" @change="fetchUsers" class="role-select">
        <option value="">All Roles</option>
        <option value="0">User</option>
        <option value="1">Employee</option>
        <option value="2">Admin</option>
      </select>
      <select v-model="sortOrder" @change="fetchUsers" class="sort-select">
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>

    <table class="users-table">
      <thead>
        <tr>
          <th @click="setSortField('email')">Email</th>
          <th @click="setSortField('role')">Role</th>
          <th @click="setSortField('createDate')">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.createDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../../axios-auth.js';

export default {
  data() {
    return {
      users: [],
      searchQuery: '',
      filterRole: '',
      sortField: 'email',
      sortOrder: 'ASC',
    };
  },
  
  methods: {
    fetchUsers() {
      axios
        .get('/users', {
          params: {
            searchEmail: this.searchQuery, 
            filterRole: this.filterRole,
            sortByCreateDate: this.sortOrder,
            sortField: this.sortField,
          },
        })
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the users:', error);
        });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
<style>
@import 'users.scss';
</style>

