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
          <th @click="setSortField('create_time')">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.create_time }}</td>
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
<style scoped>
.user-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.search-input, .role-select, .sort-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th, .users-table td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #000000;
}

.users-table th {
  background-color: #000000;
  cursor: pointer;
}

.users-table th:hover {
  background-color: #000000;
}

.users-table tr:nth-child(even) {
  background-color: #000000;
}
</style>