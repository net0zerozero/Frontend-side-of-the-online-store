<script setup>
import { ref } from 'vue'
import axios from 'axios'
// name, email, password
const user = ref(null)

const register = async () => {
  await axios.post('http://localhost:8000/api/register/', {
    name: user.value.name,
    email: user.value.email,
    password: user.value.password
  })

  // const response = await axios.post('http://localhost:8000/api/login/', {
  //   email: user.value.email,
  //   password: user.value.password
  // })
  // localStorage.setItem('access_token', response.data.access)
  // localStorage.setItem('refresh_token', response.data.refresh)
  // router.push('/')
}
</script>

<template>
  <div>
    <input type="text" v-model="user.name" />
    <input type="email" v-model="user.email" />
    <input type="password" v-model="user.password" />
    <button @click="register">Register</button>
  </div>
</template>
