<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const cart = ref([])
const isLoaded = ref(false)

const getCart = async () => {
  isLoaded.value = false
  const response = await axios.get('http://localhost:8000/api/cart/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  response.data.map(async (product) => {
    const { data } = await axios.get('http://localhost:8000/api/products/' + product)
    cart.value.push(data)
  })
  console.log(cart.value);
  isLoaded.value = true
}

const removeFromCart = async (productId) => {
  await axios.delete(`http://localhost:8000/api/cart/${productId}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  cart.value = cart.value.filter(product => product.id !== productId)
}

onMounted(async () => {
  await getCart()
})
</script>



<template>
  <div>
      
      <div class="content-div">
        <div class="container">
          <div class="h1-tag">
            <h1><svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>Корзина</h1>
          </div>
      
            <div v-if="isLoaded" class="row">
              <div class="col-12 col-md-6 col-lg-4" v-for="product in cart" :key="product.id">
                <div class="card-prod">
                  <router-link :to="'products/' + product.id">
                    <img :src="product.image" class="card-img-top" :alt="product.title" />
                  </router-link>
                  <div class="card-body text-center"> <!-- Добавлен класс text-center -->
                    <h5 class="card-title">{{ product.title }}</h5>
                    <p class="price text-success">{{ product.price }} тг</p>
                    <button class="btn btn-danger" @click="removeFromCart(product.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                      </svg>
                      <i class="bi bi-cart">Remove</i>
                    </button>
        
                  </div>
                </div>
              </div> 
            </div> 

        <div v-if="cart.length === 0">
          <h3>Cart is empty</h3>
        </div>

      

    </div>
      </div>
  </div>
</template>



<style scoped>
.content-div{
  display: flex;
  justify-content: center;
  align-items: flex-start;
}


.h1-tag{
display: flex;
justify-content: center;
align-items: flex-start;
}

h1 {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 500px;
  max-width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.card-prod{
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  padding: 10px;
  margin-top: 20px;
  border-radius: 20px;
}
</style> 












