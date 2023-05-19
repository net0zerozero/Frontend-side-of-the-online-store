<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store';

const router = useRouter();
const user = ref({ name: '', email: '', password: '' });
const userStore = useUserStore();
const errorMessage = ref('');

const register = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/register/', {
      name: user.value.name,
      email: user.value.email,
      password: user.value.password
    });
    
    // Store the access token in the local storage
    localStorage.setItem('access_token', response.data.access_token);
    

    // Fetch user data and update the navbar
    await userStore.fetchUserData();

    // Redirect to the homepage
    router.push({ path: '/' });
  } catch (error) {
  if (error.response && error.response.data) {
    if (typeof error.response.data === 'string') {
      errorMessage.value = error.response.data;
    } else if (typeof error.response.data === 'object') {
      // Join the error messages for all fields into a single string
      const errorMessages = Object.values(error.response.data).join(', ');
      errorMessage.value = errorMessages;
    }
  } else {
    errorMessage.value = 'An error occurred during registration.';
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
              <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registration</p>

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input class="form-control form-control-lg" type="text" v-model="user.name" placeholder="Username"/>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input class="form-control form-control-lg" type="email" v-model="user.email" placeholder="Email"/>
                </div>

                <div class="form-outline mb-4">
                  <input class="form-control form-control-lg" type="password" v-model="user.password" placeholder="Password"/>
                </div>

                

                <!-- Submit button -->
                <button class="btn btn-primary btn-lg btn-block" @click="register">Register</button>
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

