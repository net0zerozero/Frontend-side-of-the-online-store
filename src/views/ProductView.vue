<script setup>
  import {useRoute} from "vue-router";
  import axios from "axios";
  import {onMounted, ref} from "vue";

  const route = useRoute()
  const isLoaded = ref(false)
  const product = ref({})
  const fetchProduct = async () => {
      isLoaded.value = false
      const product_req = await axios.get(`http://localhost:8000/api/products/${route.params.id}`)
      product.value = product_req.data
      isLoaded.value = true
  }
  onMounted(async () => {
      await fetchProduct()
  })
</script>

<template>
    <div class="container">
      <div v-if="isLoaded" class="product-card">
        <div class="product-card-image-container">
          <img :src="product.image" class="product-card-image" :alt="product.title">
        </div>
        <div class="product-card-details">
          <h5 class="product-card-title">{{ product.title }}</h5>
          <p class="product-card-description">{{ product.description }}</p>
          <p class="product-card-price">{{ product.price }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  
    .product-card {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      width: 100%;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      overflow: hidden;
    }
  
    .product-card-image-container {
      position: relative;
      width: 50%;
      height: 700px;
      overflow: hidden;
      margin-top: 30px;
    }
  
    .product-card-image {
      display: block;
      object-fit: cover;
    }
  
    .product-card-details {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 40%;
      padding: 20px;
    }
  
    .product-card-title {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: 600;
    }
  
    .product-card-description {
      margin-bottom: 10px;
      font-size: 16px;
      line-height: 1.5;
    }
  
    .product-card-price {
      margin-top: auto;
      margin-bottom: 0;
      font-size: 24px;
      font-weight: 600;
      color: #f44336;
    }
  </style>
  