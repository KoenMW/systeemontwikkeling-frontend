<template>
  <div class="management">
    <button @click="navigateTo('signup', { adminAdd: true })">Add User</button>
    <div class="filters">
      <input
        v-model="searchQuery"
        @input="fetchUsers"
        placeholder="Search users..."
        class="search-input"
      />
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

    <table>
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
          <td>{{ getRoleName(user.role) }}</td>
          <td>{{ user.createDate }}</td>
          <td>
            <button @click="editUser(user.id)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../../axios-auth.js'

export default {
  data() {
    return {
      users: [],
      searchQuery: '',
      filterRole: '',
      sortField: 'email',
      sortOrder: 'ASC',
      isAdminAdd: this.$route.query.adminAdd
    }
  },

  methods: {
    getRoleName(roleNumber) {
      const roleNames = {
        0: 'User',
        1: 'Employee',
        2: 'Admin'
      }
      return roleNames[roleNumber] || 'Unknown'
    },
    fetchUsers() {
      const params = {
        searchEmail: this.searchQuery,
        sortByCreateDate: this.sortOrder,
        sortField: this.sortField
      }
      if (this.filterRole !== '') {
        params.filterRole = this.filterRole
      }
      axios
        .get('/users', { params })
        .then((response) => {
          this.users = response.data
        })
        .catch((error) => {
          console.error('There was an error fetching the users:', error)
        })
    },
    deleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        axios
          .delete(`/users/delete/${userId}`)
          .then(() => {
            this.fetchUsers()
          })
          .catch((error) => {
            console.error('There was an error deleting the user:', error)
          })
      }
    },
    navigateTo(routeName, queryParams = {}) {
      this.$router.push({ name: routeName, query: queryParams })
    }
  },
  mounted() {
    this.fetchUsers()
  }
}
</script>
<style>
@import 'users.scss';
</style>
