<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store';

const router = useRouter();
const user = ref({
  email: '',
  password: ''
});
const errorMessage = ref(''); // Define errorMessage as a ref

const loging = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/login/', {
      email: user.value.email,
      password: user.value.password
    });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);

    // Redirect to the main page
    router.push({ path: '/' });

    // Fetch user data after successful authentication
    const userStore = useUserStore();
    await userStore.fetchUserData();
  } catch (error) {
  if (error.response && error.response.data && error.response.data.detail) {
    errorMessage.value = error.response.data.detail;
  } else {
    errorMessage.value = 'An error occurred during login.';
  }
  console.error(error);
}

};
</script>

<template>
  <div>
    <div class="container">
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image">
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
              <!-- Email input -->
              <div class="form-outline mb-4">
                <input class="form-control form-control-lg" type="email" v-model="user.email" placeholder="email" />
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <input class="form-control form-control-lg" type="password" v-model="user.password" placeholder="password" />
              </div>

              <!-- Submit button -->
              <button class="btn btn-primary btn-lg btn-block" @click="loging">Login</button>
              
              
              
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
