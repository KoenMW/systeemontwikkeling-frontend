<template>
  <div class="user-management">
    <button @click="navigateTo('signup', { adminAdd: true })" class="button">Add User</button>
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
          <td>
            <button @click="editUser(user.id)" class="button">Edit</button>
            <button @click="deleteUser(user.id)" class="button">Delete</button>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../../../axios-auth';

export default {
  data() {
    return {
      users: [],
      searchQuery: '',
      filterRole: '',
      sortField: 'email',
      sortOrder: 'ASC',
      isAdminAdd: this.$route.query.adminAdd,
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
    deleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        axios
          .delete(`/users/delete/${userId}`)
          .then(() => {
            this.fetchUsers();
          })
          .catch(error => {
            console.error('There was an error deleting the user:', error);
          });
      }
    }, 
    navigateTo(routeName, queryParams = {}) {
      this.$router.push({ name: routeName, query: queryParams });
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
