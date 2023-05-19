import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useUserStore } from './store';

// Import our custom CSS
import '@/scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const userStore = useUserStore();

// Проверяем, есть ли токен в localStorage при загрузке страницы
const token = localStorage.getItem('access_token');
if (token) {
  // Если есть токен, вызываем fetchUserData() для восстановления данных пользователя
  userStore.fetchUserData().then(() => {
    app.use(router);
    app.mount('#app');
  });
} else {
  app.use(router);
  app.mount('#app');
}
