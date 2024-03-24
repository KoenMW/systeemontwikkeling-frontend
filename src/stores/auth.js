import { defineStore } from 'pinia'

/**
 * Auth store
 * @author @647825
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
    checkAuth() {
      this.isLoggedIn = localStorage.getItem('jwt') !== null;
    }
  }
})