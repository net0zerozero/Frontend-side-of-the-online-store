<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const wishList = ref([])
const isLoaded = ref(false)

const getWishList = async () => {
  isLoaded.value = false
  const response = await axios.get('http://localhost:8000/api/wishlist/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  wishList.value = response.data
  isLoaded.value = true
}

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete('http://localhost:8000/api/wishlist/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      data: {
        product_id: productId
      }
    })
    console.log(response.data)
    wishList.value = wishList.value.filter((product) => product.id !== productId)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getWishList()
})
</script>

<template>
  <div>
    <div class="container">
      <div v-if="isLoaded">
        <div v-for="product in wishList" :key="product.id">
          <p>{{ product.title }}</p>
          <button @click="deleteProduct(product.id)">удалить</button>
        </div>
      </div>
      <div v-else>...loading</div>
    </div>
  </div>
</template>
