<script setup>
import axios from 'axios'
import { ref } from 'vue'
const user = ref({
  email: '',
  password: ''
})

const loging = async () => {
  const response = await axios.post('http://localhost:8000/api/login/', {
    email: user.value.email,
    password: user.value.password
  })
  localStorage.setItem('access_token', response.data.access)
  localStorage.setItem('refresh_token', response.data.refresh)
  // this.$router.push('/')
}
</script>

<template>
  <div class="container">
    <div>
    <input type="email" v-model="user.email" placeholder="email"/>
    <input type="password" v-model="user.password" placeholder="password"/>
    <button @click="loging">Login</button>
  </div>
  </div>
</template>
