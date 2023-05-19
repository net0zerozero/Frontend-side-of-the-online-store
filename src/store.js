import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),

  actions: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.setLoggedInUser(response.data);
      } catch (error) {
        console.log(error);
      }
    },

    setLoggedInUser(userData) {
      this.isLoggedIn = true;
      this.user = userData;
    },

    logout() {
      this.isLoggedIn = false;
      this.user = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  },
});
