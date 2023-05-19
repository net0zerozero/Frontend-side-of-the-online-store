<template>
  <div class="container">
    <div v-if="isLoaded" class="product-card">
      <div class="product-card-image-container">
        <img :src="product.image" class="product-card-image" :alt="product.title">
      </div>
      <div class="product-card-details">
        <h5 class="product-card-title">{{ product.title }}</h5>
        <p class="product-card-price">{{ product.price }}</p>
        <p class="product-card-description">{{ product.description }}</p>
      </div>
    </div>
    <div v-else class="loading-message">Loading...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted, ref } from "vue";

const route = useRoute();
const isLoaded = ref(false);
const product = ref({});
const error = ref(null);

const fetchProduct = async () => {
  isLoaded.value = false;
  try {
    const product_req = await axios.get(`http://localhost:8000/api/products/${route.params.id}`);
    product.value = product_req.data;
    isLoaded.value = true;
  } catch (err) {
    error.value = "Failed to fetch product data.";
  }
};

onMounted(async () => {
  await fetchProduct();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
}

.product-card-image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.product-card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Изменено на "contain" */
}

.product-card-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.product-card-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.product-card-price {
  margin-top: auto;
  margin-bottom: 10px; /* Изменено на 10px */
  font-size: 24px;
  font-weight: 600;
  color: #f44336;
  text-align: center;
}

.product-card-description {
  margin-bottom: 0; /* Изменено на 0 */
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
}

.loading-message,
.error-message {
  margin-top: 20px;
  text-align: center;
}
</style>
