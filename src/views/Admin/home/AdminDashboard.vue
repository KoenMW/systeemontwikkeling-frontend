<!--
    author: @647825
-->

<template>
  <div class="admin-panel">
    <aside class="sidebar">
      <ul>
        <li @click="navigateTo('adminUsers')">Users</li>
        <li @click="navigateTo('adminEvents')">Events</li>
        <li @click="navigateTo('adminOrders')">Orders</li>
        <li @click="navigateTo('adminWysiwyg')">WYSIWYG</li>
      </ul>
    </aside>
    <section class="view">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  }
};
</script>


<style>
@import 'admin.scss';
</style>